import { useLocation } from "wouter";
import { AuRenMark } from "./AuRenMascot";
import { useClerk, useUser } from "@clerk/react";

const NAV_ITEMS = [
  {
    id: "home", href: "/build", label: "Build",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: "projects", href: "/projects", label: "Projects",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    id: "tools", href: "/tools", label: "Tools",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    id: "library", href: "/library", label: "Library",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    id: "extensions", href: "/extensions", label: "Extensions",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7S4.99 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.4 0 2.5-1.1 2.5-2.5S21.9 11 20.5 11z"/></svg>,
  },
];

const BOTTOM_ITEMS = [
  {
    id: "settings", label: "Settings",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
];

export default function Sidebar({ active }: { active: string }) {
  const [, navigate] = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  return (
    <aside className="w-14 flex-shrink-0 border-r border-border sticky top-0 h-screen z-60 bg-background flex flex-col items-center py-3">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="mb-4 cursor-pointer p-1 hover:opacity-75 transition-smooth" title="AuRen">
        <AuRenMark size={30} />
      </div>
      <div className="w-7 h-px bg-border mb-2" />

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 w-full items-center">
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              title={item.label}
              className={`relative w-10 h-10 rounded-lg border-none cursor-pointer flex items-center justify-center transition-smooth group ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.icon}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 items-center">
        {BOTTOM_ITEMS.map(item => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => navigate("/profile")}
            className={`w-10 h-10 rounded-lg border-none cursor-pointer flex items-center justify-center transition-smooth ${
              active === "profile"
                ? "bg-accent/10 text-accent"
                : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {item.icon}
          </button>
        ))}
        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="w-10 h-10 rounded-lg border-none bg-transparent text-muted-foreground cursor-pointer flex items-center justify-center transition-smooth hover:text-red-500 hover:bg-red-500/10 mt-1"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
        {/* Avatar */}
        <div
          onClick={() => navigate("/profile")}
          className={`w-8 h-8 rounded-full overflow-hidden mt-3 cursor-pointer transition-smooth border-2 ${
            active === "profile" ? "border-accent" : "border-transparent hover:border-accent/50"
          }`}
          title={user?.firstName ?? "My Profile"}
        >
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <AuRenMark size={32} />
          )}
        </div>
      </div>
    </aside>
  );
}
