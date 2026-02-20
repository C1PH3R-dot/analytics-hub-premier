import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import productNova from "@/assets/product-nova.jpg";
import productVibrant from "@/assets/product-vibrant.jpg";
import productSpeaker from "@/assets/product-speaker.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const products = [
  { id: 1, name: "Nova Pro",       price: "$340.00", sales: "1.2k sales", img: productNova,    color: "hsl(220 100% 96%)" },
  { id: 2, name: "Vibrant Watch",  price: "$720.00", sales: "890 sales",  img: productVibrant,  color: "hsl(192 100% 96%)" },
  { id: 3, name: "SonicMax Pro",   price: "$199.00", sales: "620 sales",  img: productSpeaker,  color: "hsl(220 40% 96%)"  },
];

const comments = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: avatar1,
    text: "The interface is super intuitive. Loving the new update! 🚀",
    time: "2h ago",
  },
  {
    id: 2,
    name: "Mark Thompson",
    avatar: avatar4,
    text: "Could you help me with the latest invoice export feature?",
    time: "5h ago",
  },
  {
    id: 3,
    name: "Li Wei",
    avatar: avatar2,
    text: "Revenue tracking is incredibly accurate. Best analytics tool!",
    time: "1d ago",
  },
];

export function RightSidebar() {
  return (
    <aside className="w-72 flex-shrink-0 flex flex-col gap-6">
      {/* Popular Products */}
      <motion.section
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-card rounded-2xl border border-border p-5"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-navy text-[15px]">Popular Products</h3>
          <motion.button
            className="flex items-center gap-1 text-xs font-semibold text-primary btn-squeeze"
            whileTap={{ scale: 0.94 }}
          >
            View All <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>

        <div className="space-y-3">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ x: 3 }}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-secondary cursor-pointer group"
            >
              <div
                className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: p.color }}
              >
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.sales}</p>
              </div>
              <span className="text-sm font-bold text-primary flex-shrink-0">{p.price}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-4 w-full py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-semibold
            hover:bg-primary hover:text-primary-foreground transition-all duration-200 btn-squeeze btn-glow"
          whileTap={{ scale: 0.97 }}
        >
          View Catalog
        </motion.button>
      </motion.section>

      {/* Customer Comments */}
      <motion.section
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-card rounded-2xl border border-border p-5 flex-1"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-navy text-[15px]">Customer Comments</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {comments.length} new
          </span>
        </div>

        <div className="space-y-4">
          {comments.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="relative p-4 rounded-xl bg-blue-light border border-blue-mid group hover:shadow-md transition-all duration-200"
            >
              {/* Quote icon */}
              <Quote className="absolute top-3 right-3 w-4 h-4 text-primary/20" />

              <div className="flex items-center gap-2.5 mb-2.5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="text-xs font-semibold text-navy">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.time}</p>
                </div>
              </div>

              <p className="text-xs text-foreground/80 leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </aside>
  );
}
