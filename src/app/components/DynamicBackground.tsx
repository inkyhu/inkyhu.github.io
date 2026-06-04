interface DynamicBackgroundProps {
  accentColor?: string;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16)
      }
    : { r: 139, g: 92, b: 246 };
}

export function DynamicBackground({ accentColor = "#8B5CF6" }: DynamicBackgroundProps) {
  const rgb = hexToRgb(accentColor);

  return (
    <div className="background-layer" aria-hidden="true">
      <div
        className="ambient-glow ambient-glow--one"
        style={{
          background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2) 0%, transparent 70%)`
        }}
      />
      <div
        className="ambient-glow ambient-glow--two"
        style={{
          background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18) 0%, transparent 70%)`
        }}
      />
      <div className="ambient-grid" />
    </div>
  );
}
