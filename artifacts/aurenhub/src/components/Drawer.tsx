import { useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { AuRenMark } from "@/components/AuRenMascot";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0c0c0e";
const BORDER = "rgba(255,255,255,0.07)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM = "#6f6f6f";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <AuRenMark size={30} />
      <span style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
        AuRen<span style={{ color: ACCENT }}>Hub</span>
      </span>
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home",        href: "/",           icon: "home" },
  { label: "Portal",      href: "/portal",      icon: "portal" },
  { label: "Skills",      href: "/skills",      icon: "skills" },
  { label: "Plugins",     href: "/plugins",     icon: "plugins" },
  { label: "Publishers",  href: "/publishers",  icon: "users" },
  { label: "Collections", href: "/collections", icon: "collection" },
  { label: "Showcase",    href: "/showcase",    icon: "showcase" },
  { label: "Blog",        href: "/blog",        icon: "edit" },
  { label: "Changelog",   href: "/changelog",   icon: "changelog" },
  { label: "About",       href: "/about",       icon: "info" },
  { label: "Docs",        href: "/docs",        icon: "docs" },
];

export default function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, navigate] = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  function go(href: string) { navigate(href); onClose(); }

  async function handleLogout() {
    await signOut();
    onClose();
    navigate("/");
  }

  const displayName = user?.firstName ?? user?.username ?? "User";

  return (
    <>
      {open && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 300, backdropFilter: "blur(2px)" }} />
      )}

      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
        backgroundColor: BG, borderRight: `1px solid ${BORDER}`,
        zIndex: 400,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column", padding: "20px 0",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 18px" }}>
          <Logo />
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 2, border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.05)", color: MUTED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>✕</button>
        </div>

        {/* User section */}
        {isSignedIn && user ? (
          <div style={{ margin: "0 20px 16px", padding: "12px", backgroundColor: `${ACCENT}0a`, border: `1px solid ${ACCENT}20`, borderRadius: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 2, backgroundColor: `${ACCENT}20`, border: `1px solid ${ACCENT}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>{displayName[0]?.toUpperCase()}</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</div>
                <div style={{ fontSize: 10, color: MUTED }}>{user.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ margin: "0 20px 16px", padding: "10px", backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 2 }}>
            <p style={{ fontSize: 11, color: MUTED, marginBottom: 10, lineHeight: 1.5 }}>Đăng nhập để cài đặt skills và plugins.</p>
            <button onClick={() => go("/sign-in")}
              style={{ width: "100%", padding: "9px", borderRadius: 2, border: "none", backgroundColor: ACCENT, color: "#0f0f0f", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Đăng nhập
            </button>
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: 8 }} />

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {NAV_LINKS.map(link => (
            <button key={link.label} onClick={() => go(link.href)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "11px 20px", border: "none", background: "transparent", color: TEXT, fontSize: 14, cursor: "pointer", transition: "background 0.12s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <span style={{ width: 22, display: "flex", justifyContent: "center", color: ACCENT }}><AppIcon name={link.icon} size={16} /></span>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${BORDER}`, margin: "8px 20px 14px" }} />

        {/* Theme */}
        <div style={{ padding: "0 20px", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>THEME</div>
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 2, border: `1px solid ${BORDER}`, backgroundColor: "rgba(255,255,255,0.03)", color: MUTED, fontSize: 13, cursor: "pointer", width: "100%" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            Dark (System)
          </button>
        </div>

        {/* Logout if authed */}
        {isSignedIn && (
          <div style={{ padding: "0 20px" }}>
            <button onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 2, border: `1px solid rgba(248,113,113,0.2)`, backgroundColor: "rgba(248,113,113,0.06)", color: "#f87171", fontSize: 13, cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </>
  );
}
