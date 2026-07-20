import { useState } from "react";
import { useLocation } from "wouter";
import { useUser, useClerk, useAuth } from "@clerk/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { SKILLS, PLUGINS } from "@/data/catalog";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#262626";
const BORDER = "rgba(255,255,255,0.06)";
const BORDER2 = "rgba(255,255,255,0.10)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM = "#6f6f6f";

const LS_SKILLS_KEY = "aurenhub_installed_skills";
const LS_PLUGINS_KEY = "aurenhub_installed_plugins";

function getInstalledIds(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

interface MeData {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

async function fetchMe(token: string | null): Promise<MeData> {
  const res = await fetch("/api/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json() as Promise<MeData>;
}

async function patchMe(token: string | null, name: string): Promise<MeData> {
  const res = await fetch("/api/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json() as Promise<MeData>;
}

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const qc = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [saveError, setSaveError] = useState("");

  const installedSkillIds = getInstalledIds(LS_SKILLS_KEY);
  const installedPluginIds = getInstalledIds(LS_PLUGINS_KEY);
  const installedSkills = SKILLS.filter(s => installedSkillIds.includes(s.id));
  const installedPlugins = PLUGINS.filter(p => installedPluginIds.includes(p.id));

  const { data: me, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = await getToken();
      return fetchMe(token);
    },
  });

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const token = await getToken();
      return patchMe(token, name);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["me"] });
      setEditing(false);
      setSaveError("");
    },
    onError: () => {
      setSaveError("Failed to save. Please try again.");
    },
  });

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  function startEdit() {
    setNameInput(me?.name ?? user?.firstName ?? "");
    setEditing(true);
    setSaveError("");
  }

  function handleSave() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    mutation.mutate(trimmed);
  }

  const displayName = me?.name ?? user?.firstName ?? user?.username ?? "User";
  const email = me?.email ?? user?.primaryEmailAddress?.emailAddress ?? "";
  const joinDate = me?.createdAt
    ? new Date(me.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;
  const joinYear = me?.createdAt ? new Date(me.createdAt).getFullYear() : "—";
  const avatarUrl = user?.imageUrl ?? me?.avatarUrl ?? null;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT, fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif" }}>
      <style>{`*{box-sizing:border-box}input{outline:none}@keyframes shimmer{0%{opacity:0.4}50%{opacity:0.7}100%{opacity:0.4}}`}</style>
      <Navbar />
      <main style={{ padding: "28px 20px 60px", maxWidth: 680, margin: "0 auto" }}>

        {/* Back link */}
        <button onClick={() => navigate("/portal")}
          style={{ background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0, marginBottom: 22 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Portal
        </button>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 4 }}>My Profile</h1>
        <p style={{ color: MUTED, fontSize: 13, marginBottom: 24 }}>Your AuRenHub account and installed items</p>

        {/* Profile card */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER2}`, borderRadius: 14, padding: "22px 20px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: 68, height: 68, borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: `${ACCENT}18`, border: `2px solid ${ACCENT}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{initials}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {editing ? (
                <div>
                  <input
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); }}
                    autoFocus
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${ACCENT}40`, borderRadius: 8, color: TEXT, fontSize: 16, fontWeight: 700 }}
                  />
                  {saveError && <p style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{saveError}</p>}
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={handleSave} disabled={mutation.isPending}
                      style={{ padding: "6px 14px", backgroundColor: ACCENT, border: "none", borderRadius: 7, color: BG, fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: mutation.isPending ? 0.7 : 1 }}>
                      {mutation.isPending ? "Saving…" : "Save"}
                    </button>
                    <button onClick={() => setEditing(false)}
                      style={{ padding: "6px 14px", backgroundColor: "transparent", border: `1px solid ${BORDER2}`, borderRadius: 7, color: MUTED, fontSize: 12, cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                    {isLoading ? (
                      <div style={{ height: 20, width: 120, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 6, animation: "shimmer 1.5s ease-in-out infinite" }} />
                    ) : (
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{displayName}</span>
                    )}
                    <button onClick={startEdit}
                      style={{ padding: "3px 10px", backgroundColor: "transparent", border: `1px solid ${BORDER2}`, borderRadius: 6, color: MUTED, fontSize: 11, cursor: "pointer" }}>
                      Edit name
                    </button>
                  </div>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 3 }}>{email}</div>
                  {joinDate && <div style={{ fontSize: 12, color: DIM }}>Member since {joinDate}</div>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
          {[
            { label: "Skills", value: installedSkills.length },
            { label: "Plugins", value: installedPlugins.length },
            { label: "Since", value: joinYear },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{label}</div>
            </div>
          ))}
        </div>

        {/* My Skills */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 18px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>My Skills</h2>
            <button onClick={() => navigate("/skills")}
              style={{ fontSize: 12, color: ACCENT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Browse →</button>
          </div>
          {installedSkills.length === 0 ? (
            <div style={{ textAlign: "center", padding: "22px 0", color: MUTED, fontSize: 13 }}>
              <div style={{ marginBottom: 8, fontSize: 26 }}>📦</div>
              <span>No skills installed yet. </span>
              <button onClick={() => navigate("/skills")}
                style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 0 }}>
                Browse skills →
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {installedSkills.map(skill => (
                <div key={skill.id} className="profile-item"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 10, cursor: "pointer" }}
                  onClick={() => navigate(`/skills/${skill.id}`)}>
                  <AppIcon name={skill.iconName ?? "tool"} color={skill.color} size={20} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{skill.name}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{skill.publisher}</div>
                  </div>
                  {skill.version && (
                    <span style={{ fontSize: 10, color: DIM, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 5, padding: "2px 7px", flexShrink: 0 }}>
                      v{skill.version}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Plugins */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 18px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>My Plugins</h2>
            <button onClick={() => navigate("/plugins")}
              style={{ fontSize: 12, color: ACCENT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Browse →</button>
          </div>
          {installedPlugins.length === 0 ? (
            <div style={{ textAlign: "center", padding: "22px 0", color: MUTED, fontSize: 13 }}>
              <div style={{ marginBottom: 8, fontSize: 26 }}>🔌</div>
              <span>No plugins installed yet. </span>
              <button onClick={() => navigate("/plugins")}
                style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 0 }}>
                Browse plugins →
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {installedPlugins.map(plugin => (
                <div key={plugin.id}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <AppIcon name={plugin.iconName ?? "plugins"} color={plugin.color} size={20} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{plugin.name}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{plugin.publisher}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign out */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 18px" }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: DIM, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Session</h2>
          <button onClick={handleSignOut}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.18)", borderRadius: 9, color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </div>

      </main>
    </div>
  );
}
