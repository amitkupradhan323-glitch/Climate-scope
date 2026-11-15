import React from 'react';

/**
 * High-performance, pixel-crisp SVG Sparkline for KPI StatCards in white theme.
 * Displays the 10-year historical trajectory with highlighted primary & comparison markers.
 */
export default function SparklineChart({ 
  data = [], 
  color = '#0284C7', 
  primaryYear, 
  comparisonYear,
  height = 44,
  width = 140 
}) {
  if (!data || data.length < 2) {
    return <div className="h-11 w-full bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">No data</div>;
  }

  // Filter valid numbers
  const validPoints = data.map((d, index) => ({
    year: d.year,
    val: typeof d.value === 'number' ? d.value : null,
    index
  })).filter(d => d.val !== null);

  if (validPoints.length < 2) {
    return <div className="h-11 w-full bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">No data</div>;
  }

  const values = validPoints.map(d => d.val);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const paddingY = 6;
  const paddingX = 6;
  const usableHeight = height - paddingY * 2;
  const usableWidth = width - paddingX * 2;

  // Calculate coordinates
  const points = validPoints.map((p, i) => {
    const x = paddingX + (i / (validPoints.length - 1)) * usableWidth;
    const y = paddingY + usableHeight - ((p.val - minVal) / range) * usableHeight;
    return { ...p, x, y };
  });

  // Construct path string
  const pathData = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}` : `${acc} L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }, '');

  // Construct area polygon
  const firstX = points[0].x.toFixed(1);
  const lastX = points[points.length - 1].x.toFixed(1);
  const bottomY = (height - 2).toFixed(1);
  const areaData = `${pathData} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

  // Find points for primary and comparison years
  const primaryPoint = points.find(p => p.year === primaryYear);
  const comparisonPoint = points.find(p => p.year === comparisonYear);

  const gradientId = `spark-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="relative inline-block w-full max-w-[145px]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-11 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path
          d={areaData}
          fill={`url(#${gradientId})`}
        />

        {/* Trend Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Comparison Year Marker */}
        {comparisonPoint && (
          <g>
            <circle
              cx={comparisonPoint.x}
              cy={comparisonPoint.y}
              r="4.5"
              fill="#FFFFFF"
              stroke="#0D9488"
              strokeWidth="2.2"
            />
          </g>
        )}

        {/* Primary Year Marker */}
        {primaryPoint && (
          <g>
            <circle
              cx={primaryPoint.x}
              cy={primaryPoint.y}
              r="5.5"
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
      <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono px-1">
        <span>{validPoints[0]?.year}</span>
        <span>{validPoints[validPoints.length - 1]?.year}</span>
      </div>
    </div>
  );
}
