import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";

const customers = [
  { id: 1, name: "Sofia Martinez",  src: avatar1, time: "2 min ago"  },
  { id: 2, name: "James Wilson",    src: avatar2, time: "8 min ago"  },
  { id: 3, name: "Emma Clarke",     src: avatar3, time: "15 min ago" },
  { id: 4, name: "Daniel Ross",     src: avatar4, time: "22 min ago" },
  { id: 5, name: "Li Wei",          src: avatar5, time: "34 min ago" },
  { id: 6, name: "Marcus Johnson",  src: avatar6, time: "47 min ago" },
];

export function CustomerGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-navy text-[15px]">New Customers</h3>
          <p className="text-xs text-muted-foreground mt-0.5">287 new customers today!</p>
        </div>
        <motion.button
          className="text-xs font-semibold text-primary hover:text-primary/80 px-3 py-1.5 rounded-lg bg-secondary transition-colors btn-squeeze"
          whileTap={{ scale: 0.95 }}
        >
          View All
        </motion.button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {customers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.4, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
            onHoverStart={() => setHovered(c.id)}
            onHoverEnd={() => setHovered(null)}
          >
            {/* Avatar */}
            <motion.div
              className="relative"
              animate={{
                scale: hovered === c.id ? 1.15 : 1,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <img
                src={c.src}
                alt={c.name}
                className="w-14 h-14 rounded-full object-cover avatar-glow"
                style={{
                  boxShadow: hovered === c.id
                    ? "0 0 0 3px hsl(var(--accent)), 0 8px 24px hsl(var(--accent) / 0.35)"
                    : "0 0 0 2px hsl(var(--primary) / 0.25), 0 4px 16px hsl(var(--primary) / 0.15)",
                }}
              />
              {/* Online dot */}
              <span
                className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-card pulse-dot"
                style={{ background: "hsl(var(--accent))" }}
              />
            </motion.div>

            {/* Name tooltip on hover */}
            <AnimatePresence>
              {hovered === c.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="text-center"
                >
                  <p className="text-[11px] font-semibold text-navy leading-tight">{c.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground">Just Joined</p>
                  <p className="text-[9px] text-accent font-medium">{c.time}</p>
                </motion.div>
              )}
              {hovered !== c.id && (
                <motion.p
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-muted-foreground truncate max-w-[56px] text-center"
                >
                  {c.name.split(" ")[0]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
