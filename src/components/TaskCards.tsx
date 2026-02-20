import { motion } from "framer-motion";
import { Circle, CheckCircle2 } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Optimize Protocol",
    desc: "Run performance analysis on server stack",
    date: "Today",
    done: false,
  },
  {
    id: 2,
    title: "Fix DB Protocol",
    desc: "Resolve query timeout in production database",
    date: "Today",
    done: true,
  },
  {
    id: 3,
    title: "Optimize Queries",
    desc: "Refactor slow analytics aggregation queries",
    date: "Tomorrow",
    done: false,
  },
  {
    id: 4,
    title: "Deploy Hotfix v2.4",
    desc: "Push critical security patch to production",
    date: "Today",
    done: false,
  },
  {
    id: 5,
    title: "Review Metrics",
    desc: "Weekly KPI dashboard review with team",
    date: "Fri 24",
    done: false,
  },
];

export function TaskCards() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-navy text-[15px]">Tasks to be Done</h3>
        <motion.button
          className="text-xs font-semibold text-primary bg-secondary px-3 py-1.5 rounded-lg btn-squeeze transition-colors hover:bg-primary hover:text-primary-foreground"
          whileTap={{ scale: 0.94 }}
        >
          + Add Task
        </motion.button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.015, x: 3 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden cursor-pointer group"
            style={{
              background: task.done
                ? "linear-gradient(90deg, hsl(220 100% 50% / 0.6), hsl(210 100% 82% / 0.25))"
                : "linear-gradient(90deg, hsl(220 100% 45%), hsl(210 100% 70% / 0.55))",
              boxShadow: "0 4px 20px hsl(220 100% 50% / 0.25)",
            }}
          >
            {/* Subtle shine on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.08), transparent)",
              }}
            />

            {/* Status icon */}
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="flex-shrink-0"
            >
              {task.done ? (
                <CheckCircle2 className="w-6 h-6 text-cyan drop-shadow-sm" style={{ filter: "drop-shadow(0 0 6px hsl(var(--cyan) / 0.8))" }} />
              ) : (
                <Circle className="w-6 h-6 text-primary-foreground/80" />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-tight ${task.done ? "text-primary-foreground/70 line-through" : "text-primary-foreground"}`}>
                {task.title}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-0.5 truncate">{task.desc}</p>
            </div>

            {/* Date badge */}
            <span className="flex-shrink-0 text-xs font-semibold bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">
              {task.date}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
