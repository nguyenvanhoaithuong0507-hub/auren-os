import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const workflowsDir = join(import.meta.dirname, "..", "..", ".github", "workflows");

function loadWorkflow(fileName: string): string {
  return readFileSync(join(workflowsDir, fileName), "utf8");
}

// Extracts step names in document order, e.g. "- name: Checkout".
function stepNames(workflow: string): string[] {
  return [...workflow.matchAll(/^\s*-\s*name:\s*(.+)$/gm)].map((m) => m[1].trim());
}

describe(".github/workflows/build.yml", () => {
  const workflow = loadWorkflow("build.yml");

  it("declares the expected workflow name", () => {
    assert.match(workflow, /^name: Build AuRen$/m);
  });

  it("can be triggered manually and on pushes to master and main", () => {
    assert.match(workflow, /workflow_dispatch:/);
    assert.match(
      workflow,
      /push:\s*\n\s*branches:\s*\n\s*-\s*master\s*\n\s*-\s*main/,
    );
  });

  it("runs the build job on ubuntu-latest", () => {
    assert.match(workflow, /runs-on:\s*ubuntu-latest/);
  });

  it("gives every step a descriptive name, in the expected order", () => {
    assert.deepEqual(stepNames(workflow), [
      "Checkout",
      "Setup pnpm",
      "Setup Node.js",
      "Install dependencies",
      "Build AI Platform Dashboard",
      "Upload Artifact",
    ]);
  });

  it("checks out the repository using actions/checkout@v4", () => {
    assert.match(
      workflow,
      /-\s*name:\s*Checkout\s*\n\s*uses:\s*actions\/checkout@v4/,
    );
  });

  it("sets up pnpm v10 via pnpm/action-setup@v4", () => {
    assert.match(
      workflow,
      /-\s*name:\s*Setup pnpm\s*\n\s*uses:\s*pnpm\/action-setup@v4\s*\n\s*with:\s*\n\s*version:\s*10/,
    );
  });

  it("sets up Node.js 22 with pnpm caching via actions/setup-node@v4", () => {
    assert.match(
      workflow,
      /-\s*name:\s*Setup Node\.js\s*\n\s*uses:\s*actions\/setup-node@v4\s*\n\s*with:\s*\n\s*node-version:\s*22\s*\n\s*cache:\s*pnpm/,
    );
  });

  it("installs dependencies with pnpm install", () => {
    assert.match(
      workflow,
      /-\s*name:\s*Install dependencies\s*\n\s*run:\s*pnpm install/,
    );
  });

  it("builds the AI Platform Dashboard from its own directory", () => {
    assert.match(
      workflow,
      /cd artifacts\/ai-platform-dashboard\s*\n\s*pnpm build/,
    );
  });

  it("uploads the dashboard build output as an artifact", () => {
    assert.match(
      workflow,
      /-\s*name:\s*Upload Artifact\s*\n\s*uses:\s*actions\/upload-artifact@v4\s*\n\s*with:\s*\n\s*name:\s*ai-platform-dashboard\s*\n\s*path:\s*artifacts\/ai-platform-dashboard\/dist/,
    );
  });
});

describe(".github/workflows/datadog-synthetics.yml", () => {
  const workflow = loadWorkflow("datadog-synthetics.yml");

  it("declares the expected workflow name", () => {
    assert.match(workflow, /^name: Run Datadog Synthetic tests$/m);
  });

  it("runs on pushes and pull requests targeting master only", () => {
    assert.match(workflow, /push:\s*\n\s*branches:\s*\[\s*"master"\s*\]/);
    assert.match(workflow, /pull_request:\s*\n\s*branches:\s*\[\s*"master"\s*\]/);
  });

  it("runs the build job on ubuntu-latest and checks out the repo first", () => {
    assert.match(workflow, /runs-on:\s*ubuntu-latest/);
    assert.match(workflow, /steps:\s*\n\s*-\s*uses:\s*actions\/checkout@v4/);
  });

  it("pins the third-party Datadog action to a full 40-character commit SHA", () => {
    const match = workflow.match(
      /uses:\s*DataDog\/synthetics-ci-github-action@([0-9a-f]+)\s*#\s*(v[\d.]+)/,
    );
    assert.ok(match, "expected a pinned DataDog action reference with a version comment");
    assert.equal(match[1].length, 40);
    assert.equal(match[2], "v1.4.0");
  });

  it("wires up API/app keys from secrets and a tag-based test query", () => {
    assert.match(workflow, /api_key:\s*\$\{\{\s*secrets\.DD_API_KEY\s*\}\}/);
    assert.match(workflow, /app_key:\s*\$\{\{\s*secrets\.DD_APP_KEY\s*\}\}/);
    assert.match(workflow, /test_search_query:\s*'tag:e2e-tests'/);
  });
});

describe(".github/workflows/ibm.yml", () => {
  const workflow = loadWorkflow("ibm.yml");

  it("declares the expected workflow name", () => {
    assert.match(workflow, /^name: Build and Deploy to IKS$/m);
  });

  it("only triggers on pushes to master", () => {
    assert.match(workflow, /^on:\s*\n\s*push:\s*\n\s*branches:\s*\[\s*"master"\s*\]/m);
  });

  it("exposes the expected environment variables", () => {
    assert.match(workflow, /GITHUB_SHA:\s*\$\{\{\s*github\.sha\s*\}\}/);
    assert.match(workflow, /IBM_CLOUD_API_KEY:\s*\$\{\{\s*secrets\.IBM_CLOUD_API_KEY\s*\}\}/);
    assert.match(workflow, /IBM_CLOUD_REGION:\s*us-south/);
    assert.match(workflow, /ICR_NAMESPACE:\s*\$\{\{\s*secrets\.ICR_NAMESPACE\s*\}\}/);
    assert.match(workflow, /REGISTRY_HOSTNAME:\s*us\.icr\.io/);
    assert.match(workflow, /IMAGE_NAME:\s*iks-test/);
    assert.match(workflow, /DEPLOYMENT_NAME:\s*iks-test/);
    assert.match(workflow, /PORT:\s*5001/);
  });

  it("runs the deploy job against the production environment", () => {
    assert.match(
      workflow,
      /setup-build-publish-deploy:\s*\n\s*name:\s*Setup, Build, Publish, and Deploy\s*\n\s*runs-on:\s*ubuntu-latest\s*\n\s*environment:\s*production/,
    );
  });

  it("performs checkout, IBM Cloud CLI setup, build, push and deploy in order", () => {
    assert.deepEqual(stepNames(workflow), [
      "Checkout",
      "Install IBM Cloud CLI",
      "Authenticate with IBM Cloud CLI",
      "Build with Docker",
      "Push the image to ICR",
      "Deploy to IKS",
    ]);
  });

  it("installs the kubernetes-service and container-registry CLI plugins", () => {
    assert.match(workflow, /ibmcloud plugin install -f kubernetes-service/);
    assert.match(workflow, /ibmcloud plugin install -f container-registry/);
  });

  it("builds and pushes the Docker image tagged with the commit SHA", () => {
    assert.match(
      workflow,
      /docker build -t "\$REGISTRY_HOSTNAME"\/"\$ICR_NAMESPACE"\/"\$IMAGE_NAME":"\$GITHUB_SHA"/,
    );
    assert.match(
      workflow,
      /docker push \$REGISTRY_HOSTNAME\/\$ICR_NAMESPACE\/\$IMAGE_NAME:\$GITHUB_SHA/,
    );
  });

  it("deploys and exposes the deployment through a load balancer service", () => {
    assert.match(workflow, /kubectl create deployment \$DEPLOYMENT_NAME/);
    assert.match(
      workflow,
      /kubectl create service loadbalancer \$DEPLOYMENT_NAME --tcp=80:\$PORT/,
    );
  });
});

describe(".github/workflows/jekyll-gh-pages.yml", () => {
  const workflow = loadWorkflow("jekyll-gh-pages.yml");

  it("declares the expected workflow name", () => {
    assert.match(
      workflow,
      /^name: Deploy Jekyll with GitHub Pages dependencies preinstalled$/m,
    );
  });

  it("triggers on pushes to master and manual dispatch", () => {
    assert.match(workflow, /push:\s*\n(?:\s*#.*\n)*\s*branches:\s*\[\s*"master"\s*\]/);
    assert.match(workflow, /workflow_dispatch:/);
  });

  it("grants the minimum permissions required to deploy to Pages", () => {
    assert.match(
      workflow,
      /permissions:\s*\n\s*contents:\s*read\s*\n\s*pages:\s*write\s*\n\s*id-token:\s*write/,
    );
  });

  it("serializes deployments without cancelling in-progress runs", () => {
    assert.match(
      workflow,
      /concurrency:\s*\n\s*group:\s*"pages"\s*\n\s*cancel-in-progress:\s*false/,
    );
  });

  it("builds the Jekyll site and uploads it as a Pages artifact, in order", () => {
    assert.deepEqual(stepNames(workflow), [
      "Checkout",
      "Setup Pages",
      "Build with Jekyll",
      "Upload artifact",
      "Deploy to GitHub Pages",
    ]);

    assert.match(
      workflow,
      /-\s*name:\s*Build with Jekyll\s*\n\s*uses:\s*actions\/jekyll-build-pages@v1\s*\n\s*with:\s*\n\s*source:\s*\.\/\s*\n\s*destination:\s*\.\/_site/,
    );
    assert.match(workflow, /-\s*name:\s*Upload artifact\s*\n\s*uses:\s*actions\/upload-pages-artifact@v3/);
  });

  it("deploys to GitHub Pages after the build job completes", () => {
    assert.match(
      workflow,
      /deploy:\s*\n\s*environment:\s*\n\s*name:\s*github-pages\s*\n\s*url:\s*\$\{\{\s*steps\.deployment\.outputs\.page_url\s*\}\}\s*\n\s*runs-on:\s*ubuntu-latest\s*\n\s*needs:\s*build/,
    );
    assert.match(
      workflow,
      /-\s*name:\s*Deploy to GitHub Pages\s*\n\s*id:\s*deployment\s*\n\s*uses:\s*actions\/deploy-pages@v5/,
    );
  });
});