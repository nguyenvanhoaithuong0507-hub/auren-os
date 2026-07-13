import { useState } from "react";
import { useLocation } from "wouter";
import Drawer from "./Drawer";
import { useUser, useClerk } from "@clerk/react";

const BG = "#0f0f0f";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM = "#262626";

export default function Navbar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  async function handleLogout() {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  }

  const displayName = user?.firstName ?? user?.username ?? "User";
  const avatarInitial = displayName[0]?.toUpperCase() ?? "U";

  return (
    <>
      <style>{`@keyframes fade-down{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        backgroundColor: "rgba(8,8,9,0.92)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${BORDER}`,
        height: 52, display: "flex", alignItems: "center",
        padding: "0 14px", gap: 10,
      }}>
        {/* Hamburger */}
        <button onClick={() => setDrawerOpen(true)}
          style={{ width: 38, height: 38, borderRadius: 2, border: `1px solid ${BORDER}`, backgroundColor: "#161616", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, flexDirection: "column", gap: 0 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 14, height: 1.5, backgroundColor: TEXT, marginBlock: 1.5 }} />)}
        </button>

        {/* Search */}
        <div style={{ flex: 1, position: "relative" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="search"
            placeholder="Search skills and plugins"
            onChange={e => onSearch?.(e.target.value)}
            style={{ width: "100%", padding: "9px 14px 9px 36px", backgroundColor: "#161616", border: `1px solid ${BORDER}`, borderRadius: 2, color: TEXT, fontSize: 13, outline: "none" }}
          />
        </div>

        {/* Right side */}
        {isSignedIn && user ? (
          <div style={{ position: "relative" }}>
            <button onClick={() => setUserMenuOpen(v => !v)}
              style={{ width: 38, height: 38, borderRadius: 2, border: `1px solid ${ACCENT}40`, backgroundColor: `${ACCENT}18`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, overflow: "hidden" }}>
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>{avatarInitial}</span>
              )}
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <div style={{ position: "absolute", top: 44, right: 0, width: 200, backgroundColor: "#161616", border: `1px solid ${BORDER}`, borderRadius: 2, padding: "6px", zIndex: 999, animation: "fade-down 0.18s ease" }}>
                <div style={{ padding: "8px 10px 10px", borderBottom: `1px solid ${BORDER}`, marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{displayName}</div>
                  <div style={{ fontSize: 10, color: MUTED }}>{user.primaryEmailAddress?.emailAddress}</div>
                </div>
                {[
                  { label: "Trang của tôi", action: () => { navigate("/profile"); setUserMenuOpen(false); } },
                  { label: "Skills đã cài", action: () => { navigate("/profile"); setUserMenuOpen(false); } },
                  { label: "Cài đặt", action: () => { navigate("/profile"); setUserMenuOpen(false); } },
                ].map(item => (
                  <button key={item.label} onClick={item.action}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", background: "transparent", border: "none", color: MUTED, fontSize: 12, cursor: "pointer", borderRadius: 2 }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = TEXT; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = MUTED; }}>
                    {item.label}
                  </button>
                ))}
                <button onClick={handleLogout}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", background: "transparent", border: "none", color: "#f87171", fontSize: 12, cursor: "pointer", borderRadius: 2, marginTop: 2, borderTop: `1px solid ${BORDER}` }}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("/sign-in")}
            style={{ height: 34, padding: "0 14px", borderRadius: 2, border: "none", backgroundColor: ACCENT, color: "#0f0f0f", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
            Đăng nhập
          </button>
        )}
      </nav>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
