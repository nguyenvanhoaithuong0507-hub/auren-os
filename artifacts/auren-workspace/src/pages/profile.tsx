import { useState } from "react";
import { ViewTransition } from "react";
import { useLocation } from "wouter";
import { ViewTransition } from "react";
import { useUser, useClerk, useAuth } from "@clerk/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const BG = "#090a10";
const CARD = "#111521";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const TEXT = "#dce2f0";
const MUTED = "#8892a4";
const DIMMED = "#3a4155";

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
  if (!res.ok) throw new Error("Failed to update profile");
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
  const avatarUrl = user?.imageUrl ?? me?.avatarUrl ?? null;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <ViewTransition default="none" enter="fade-in">
    <div style={{ display: "flex", backgroundColor: BG, minHeight: "100dvh", color: TEXT, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`*{box-sizing:border-box}input{outline:none}@keyframes shimmer{0%{opacity:0.4}50%{opacity:0.7}100%{opacity:0.4}}@media(max-width:767px){.desktop-sidebar{display:none!important}}`}</style>
      <Sidebar active="profile" />
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 24px 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {/* Header */}
          <button onClick={() => navigate("/build")}
            style={{ background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0, marginBottom: 22 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Workspace
          </button>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 4 }}>My Profile</h1>
          <p style={{ color: MUTED, fontSize: 13, marginBottom: 28 }}>Manage your account and preferences</p>

          {/* Profile card */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "28px 24px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              {/* Avatar */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: `${ACCENT}18`, border: `2px solid ${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: 24, fontWeight: 800, color: ACCENT }}>{initials}</span>
                )}
              </div>

              {/* Name + info */}
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
                        style={{ padding: "6px 14px", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 7, color: MUTED, fontSize: 12, cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      {isLoading ? (
                        <div style={{ height: 22, width: 130, backgroundColor: BORDER, borderRadius: 6, animation: "shimmer 1.5s ease-in-out infinite" }} />
                      ) : (
                        <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{displayName}</span>
                      )}
                      <button onClick={startEdit}
                        style={{ padding: "3px 10px", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 6, color: MUTED, fontSize: 11, cursor: "pointer" }}>
                        Edit name
                      </button>
                    </div>
                    <div style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>{email}</div>
                    {joinDate && <div style={{ fontSize: 12, color: DIMMED }}>Member since {joinDate}</div>}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Account details */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 24px", marginBottom: 14 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: DIMMED, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Account Details</h2>
            {([
              { label: "Email", value: email || "—" },
              { label: "User ID", value: me?.id ?? "—", mono: true },
              { label: "Member Since", value: joinDate ?? "—" },
            ] as { label: string; value: string; mono?: boolean }[]).map(({ label, value, mono }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 13, color: MUTED, flexShrink: 0, marginRight: 16 }}>{label}</span>
                <span style={{ fontSize: 13, color: isLoading && label !== "Email" ? DIMMED : TEXT, fontFamily: mono ? "monospace" : "inherit", maxWidth: "58%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {isLoading && label !== "Email" ? "—" : value}
                </span>
              </div>
            ))}
          </div>

          {/* Session / Sign out */}
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 24px" }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: DIMMED, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Session</h2>
            <button onClick={handleSignOut}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.18)", borderRadius: 9, color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign out
            </button>
          </div>

        </div>
      </main>
      <MobileNav active="profile" />
    </div>
  );
}
