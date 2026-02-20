import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface SparklineProps {
  color?: string;
  data?: number[];
}

const defaultData = [30, 45, 38, 60, 52, 70, 65, 85, 78, 95];

function generatePath(data: number[], w: number, h: number): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
    const cp1y = points[i - 1].y;
    const cp2x = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
    const cp2y = points[i].y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
  }
  return d;
}

function generateAreaPath(data: number[], w: number, h: number): string {
  const linePath = generatePath(data, w, h);
  return `${linePath} L ${w} ${h} L 0 ${h} Z`;
}

export function Sparkline({ color = "hsl(220 100% 50%)", data = defaultData }: SparklineProps) {
  const W = 120;
  const H = 48;
  const linePath = generatePath(data, W, H);
  const areaPath = generateAreaPath(data, W, H);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <defs>
        <linearGradient id={`area-gradient-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill={`url(#area-gradient-${color.replace(/[^a-z0-9]/gi, "")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Line */}
      <motion.path
        d={linePath}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="sparkline-path"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Dot at end */}
      <motion.circle
        cx={generatePath(data, W, H).match(/M ([0-9.]+)/)?.[0] ? W : W}
        cy={(() => {
          const max = Math.max(...data);
          const min = Math.min(...data);
          const last = data[data.length - 1];
          return H - ((last - min) / (max - min || 1)) * H;
        })()}
        r="3.5"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
      />
    </svg>
  );
}

interface OverviewCardProps {
  title: string;
  value: string;
  badge: string;
  badgePositive?: boolean;
  subtitle: string;
  data?: number[];
  color?: string;
  delay?: number;
}

export function OverviewCard({
  title,
  value,
  badge,
  badgePositive = true,
  subtitle,
  data,
  color = "hsl(220 100% 50%)",
  delay = 0,
}: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex-1 min-w-0 bg-card rounded-2xl p-6 border border-border relative overflow-hidden group hover:shadow-blue transition-all duration-300"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-sm)" }}
      whileHover={{ y: -2 }}
    >
      {/* Background glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: color, filter: "blur(24px)" }}
      />

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <motion.h2
            className="text-3xl font-bold text-navy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.4 }}
          >
            {value}
          </motion.h2>
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            badgePositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          {badge}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <Sparkline color={color} data={data} />
      </div>
    </motion.div>
  );
}
