---
title: Events that trigger workflows
intro: You can configure your workflows to run when specific activity on {% data variables.product.github %} happens, at a scheduled time, or when an event outside of {% data variables.product.github %} occurs.
redirect_from:
  - /articles/events-that-trigger-workflows
  - /github/automating-your-workflow-with-github-actions/events-that-trigger-workflows
  - /actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows
  - /actions/learn-github-actions/events-that-trigger-workflows
  - /actions/using-workflows/events-that-trigger-workflows
  - /actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows
  - /actions/reference/events-that-trigger-workflows
versions:
  fpt: '*'
  ghes: '*'
  ghec: '*'
category:
  - Write workflows
contentType: reference
---

## About events that trigger workflows

Workflow triggers are events that cause a workflow to run. For more information about how to use workflow triggers, see [AUTOTITLE](/actions/using-workflows/triggering-a-workflow).

Some events have multiple activity types. For these events, you can specify which activity types will trigger a workflow run. For more information about what each activity type means, see [AUTOTITLE](/webhooks-and-events/webhooks/webhook-events-and-payloads).

> [!NOTE]
> Not all webhook events trigger workflows.

## `branch_protection_rule`

| Webhook event payload | Activity types | `GITHUB_SHA` | `GITHUB_REF` |
| --------------------- | -------------- | ------------ | -------------|
| [`branch_protection_rule`](/webhooks-and-events/webhooks/webhook-events-and-payloads#branch_protection_rule) | - `created`<br/>- `edited`<br/>- `deleted` | Last commit on default branch | Default branch |

> [!NOTE]
> * {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see [AUTOTITLE](/webhooks-and-events/webhooks/webhook-events-and-payloads#branch_protection_rule). {% data reusables.developer-site.limit_workflow_to_activity_types %}
> * {% data reusables.actions.branch-requirement %}

Runs your workflow when branch protection rules in the workflow repository are changed. For more information about branch protection rules, see [AUTOTITLE](/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches). For information about the branch protection rule APIs, see [AUTOTITLE](/graphql/reference/branches#object-branchprotectionrule) in the GraphQL API documentation or [AUTOTITLE](/rest/branches).

For example, you can run a workflow when a branch protection rule has been `created` or `deleted`:

```yaml
on:
  branch_protection_rule:
    types: [created, deleted]
```

## `check_run`

| Webhook event payload | Activity types | `GITHUB_SHA` | `GITHUB_REF` |
| --------------------- | -------------- | ------------ | -------------|
| [`check_run`](/webhooks-and-events/webhooks/webhook-events-and-payloads#check_run) | - `created`<br/>- `rerequested`<br/>- `completed`<br/>- `requested_action` | Last commit on default branch | Default branch |

> [!NOTE]
> * {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see [AUTOTITLE](/webhooks-and-events/webhooks/webhook-events-and-payloads#check_run). {% data reusables.developer-site.limit_workflow_to_activity_types %}
> * {% data reusables.actions.branch-requirement %}
> * To prevent recursive workflows, this event does not trigger workflows if the check run's check suite was created by {% data variables.product.prodname_actions %} or if the check suite's head SHA is associated with {% data variables.product.prodname_actions %}.
