function BrandGlyph({ size, animate = false }: { size: number; animate?: boolean }) {
  const style = animate ? { animation: "auren-float 3.6s ease-in-out infinite, auren-glow 3s ease-in-out infinite" } : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={style} aria-hidden="true">
      <defs>
        <linearGradient id="auren-blue" x1="18" y1="18" x2="102" y2="102" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78a9ff" />
          <stop offset="0.46" stopColor="#0f62fe" />
          <stop offset="1" stopColor="#001d6c" />
        </linearGradient>
        <linearGradient id="auren-core" x1="38" y1="28" x2="82" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#a6c8ff" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="100" height="100" rx="10" fill="#161616" stroke="#393939" strokeWidth="2" />
      <path d="M60 18L100 42V78L60 102L20 78V42L60 18Z" fill="url(#auren-blue)" />
      <path d="M60 31L88 47V73L60 89L32 73V47L60 31Z" fill="#0b0f1a" opacity="0.92" />
      <path d="M60 33L82 86H70L66 75H45L41 86H29L52 33H60Z" fill="url(#auren-core)" />
      <path d="M49 64H62L56 47L49 64Z" fill="#0f62fe" />
      <path d="M86 32h16v6H86zM18 82h18v6H18zM78 94h22v6H78z" fill="#78a9ff" opacity="0.9" />
      <path d="M24 26h22v4H24zM84 82h14v4H84z" fill="#ffffff" opacity="0.38" />
    </svg>
  );
}

export function AuRenMascot({ size = 80, animate = false }: { size?: number; animate?: boolean }) {
  return <BrandGlyph size={size} animate={animate} />;
}

export function AuRenMark({ size = 26 }: { size?: number }) {
  return <BrandGlyph size={size} />;
}
