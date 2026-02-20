import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  Megaphone,
  ChevronRight,
  BarChart3,
  Search,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
  { label: "Products",  icon: Package,         path: "products"  },
  { label: "Customers", icon: Users,           path: "customers" },
  { label: "Shop",      icon: ShoppingBag,     path: "shop"      },
  { label: "Income",    icon: TrendingUp,      path: "income"    },
  { label: "Promote",   icon: Megaphone,       path: "promote"   },
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export function Sidebar({ activeNav, setActiveNav, collapsed, setCollapsed }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-30 flex flex-col overflow-hidden"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 btn-squeeze btn-glow"
          style={{ background: "var(--gradient-task)" }}
          whileTap={{ scale: 0.92 }}
        >
          <BarChart3 className="w-5 h-5 text-primary-foreground" />
        </motion.div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="overflow-hidden"
          >
            <p className="font-bold text-navy text-[15px] leading-tight">Analytics</p>
            <p className="text-xs text-muted-foreground">Hub</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive = activeNav === item.path;
          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveNav(item.path)}
              className={`
                nav-lift w-full flex items-center gap-3 px-3 py-3 rounded-lg relative
                transition-all duration-200 group
                ${isActive
                  ? "bg-primary text-primary-foreground shadow-blue"
                  : "text-muted-foreground hover:text-navy hover:bg-secondary"
                }
              `}
              whileTap={{ scale: 0.96 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-lg bg-primary"
                  style={{ zIndex: -1 }}
                />
              )}
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary-foreground" : ""}`} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-primary-foreground/70" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Utility Group */}
      <div className="px-3 py-3 border-t border-border space-y-1">
        {[
          { label: "Search", icon: Search, path: "search" },
          { label: "Settings", icon: Settings, path: "settings" },
        ].map((item) => {
          const isActive = activeNav === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => setActiveNav(item.path)}
              className={`
                nav-lift w-full flex items-center gap-3 px-3 py-2.5 rounded-lg relative
                transition-all duration-200 group
                ${isActive
                  ? "bg-primary text-primary-foreground shadow-blue"
                  : "text-muted-foreground hover:text-navy hover:bg-secondary"
                }
              `}
              whileTap={{ scale: 0.96 }}
            >
              <motion.div
                animate={{ rotate: item.path === "settings" ? (isActive ? 90 : 0) : 0 }}
                whileHover={{ rotate: item.path === "settings" ? 90 : 0 }}
                transition={{ duration: 0.35 }}
                className="flex-shrink-0"
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : ""}`} />
              </motion.div>
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-border">
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg
            text-muted-foreground hover:text-primary hover:bg-secondary transition-colors text-xs font-medium btn-squeeze"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }}>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
          {!collapsed && <span>Collapse</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
