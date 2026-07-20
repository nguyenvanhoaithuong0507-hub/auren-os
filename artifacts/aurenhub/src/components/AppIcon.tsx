const iconPaths: Record<string, string[]> = {
  tool: ["M14 7l3 3-7 7-3-3 7-7Z", "M5 19l4-4"],
  git: ["M7 7h10v10H7z", "M9 12h6", "M12 9v6"],
  mail: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
  spider: ["M12 8a4 4 0 100 8 4 4 0 000-8Z", "M5 9l4 2M19 9l-4 2M5 15l4-2M19 15l-4-2M8 5l2 4M16 5l-2 4M8 19l2-4M16 19l-2-4"],
  calendar: ["M5 5h14v14H5z", "M8 3v4M16 3v4M5 10h14"],
  mic: ["M12 4v8", "M9 7v5a3 3 0 006 0V7a3 3 0 00-6 0Z", "M6 12a6 6 0 0012 0", "M12 18v3"],
  eye: ["M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z", "M12 9a3 3 0 100 6 3 3 0 000-6Z"],
  document: ["M7 3h7l3 3v15H7z", "M14 3v4h4", "M9 11h6M9 15h6"],
  shield: ["M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z", "M9 12l2 2 4-5"],
  chart: ["M5 19h14", "M7 16V9M12 16V5M17 16v-4"],
  database: ["M5 7c0-2 14-2 14 0s-14 2-14 0Z", "M5 7v10c0 2 14 2 14 0V7", "M5 12c0 2 14 2 14 0"],
  rocket: ["M13 5l6 6-5 7-7-7 6-6Z", "M7 11l-3 3 6 1", "M13 17l-1 6 3-3"],
  notion: ["M6 5h12v14H6z", "M9 16V8l6 8V8"],
  x: ["M6 6l12 12M18 6L6 18"],
  play: ["M8 5v14l11-7L8 5Z"],
  hash: ["M9 4L7 20M17 4l-2 16M5 9h16M3 15h16"],
  cloud: ["M7 17h10a4 4 0 00.8-7.9A6 6 0 006.4 10 3.5 3.5 0 007 17Z"],
  calculator: ["M7 3h10v18H7z", "M9 6h6v3H9z", "M9 13h.1M12 13h.1M15 13h.1M9 17h.1M12 17h.1M15 17h.1"],
  globe: ["M12 3a9 9 0 100 18 9 9 0 000-18Z", "M3 12h18", "M12 3c3 3 3 15 0 18", "M12 3c-3 3-3 15 0 18"],
  image: ["M5 5h14v14H5z", "M8 15l3-3 2 2 2-3 3 4", "M9 9h.1"],
  news: ["M5 5h14v14H5z", "M8 9h8M8 13h8M8 17h5"],
  map: ["M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z", "M9 4v14M15 6v14"],
  music: ["M10 17a3 3 0 11-2-2.83V5l10-2v11", "M18 14a3 3 0 11-2-2.83"],
  bitcoin: ["M10 5v14M14 5v14", "M8 7h6a2 2 0 010 4H8", "M8 11h7a2 2 0 010 4H8"],
  qr: ["M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5z", "M14 14h2v2h-2zM17 17h2v2h-2zM18 14h1"],
  food: ["M7 4v8M10 4v8M7 8h3", "M15 4v17", "M15 4c3 2 3 6 0 8"],
  flight: ["M3 11l18-7-7 17-3-7-6-3Z", "M11 14l-4 4"],
  home: ["M4 11l8-7 8 7", "M6 10v10h12V10"],
  portal: ["M12 3a9 9 0 100 18 9 9 0 000-18Z", "M8 12h8", "M12 8v8"],
  skills: ["M13 2L5 14h6l-1 8 8-12h-6l1-8Z"],
  plugins: ["M9 3v4M15 3v4", "M7 7h10v5a5 5 0 01-10 0V7Z", "M12 17v4"],
  users: ["M8 11a4 4 0 100-8 4 4 0 000 8Z", "M2 21a6 6 0 0112 0", "M17 11a3 3 0 100-6", "M15 18a5 5 0 017 3"],
  collection: ["M5 5h14v4H5zM5 10h14v4H5zM5 15h14v4H5z"],
  showcase: ["M5 4h14v11H5z", "M9 20h6M12 15v5"],
  edit: ["M4 17v3h3L18 9l-3-3L4 17Z", "M14 7l3 3"],
  changelog: ["M6 4h12v16H6z", "M9 8h6M9 12h6M9 16h4"],
  info: ["M12 3a9 9 0 100 18 9 9 0 000-18Z", "M12 10v7", "M12 7h.1"],
  docs: ["M6 4h9l3 3v13H6z", "M15 4v4h4", "M9 12h6M9 16h6"],
};

export function AppIcon({ name, color = "currentColor", size = 20 }: { name: string; color?: string; size?: number }) {
  const paths = iconPaths[name] ?? iconPaths.tool;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" />
      ))}
    </svg>
  );
}
