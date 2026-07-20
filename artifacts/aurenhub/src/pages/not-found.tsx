import { useLocation } from "wouter";
import { AuRenMascot } from "@/components/AuRenMascot";
const ACCENT = "#0f62fe";
export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, backgroundColor: "#0f0f0f", color: "#f4f4f4", textAlign: "center", padding: 24 }}>
      <AuRenMascot size={72} />
      <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>404 — Not Found</h1>
      <p style={{ color: "#a8a8a8", maxWidth: 300 }}>This page doesn't exist in AuRenHub.</p>
      <button onClick={() => navigate("/")} style={{ padding: "11px 24px", borderRadius: 9, border: "none", backgroundColor: ACCENT, color: "#0f0f0f", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Go Home</button>
    </div>
  );
}
