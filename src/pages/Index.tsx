import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Filter, Plus, MessageCircle } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { OverviewCard } from "@/components/OverviewCards";
import { CustomerGallery } from "@/components/CustomerGallery";
import { TaskCards } from "@/components/TaskCards";
import { RightSidebar } from "@/components/RightSidebar";
import avatar3 from "@/assets/avatar-3.jpg";

const customerData = [28, 42, 35, 58, 50, 72, 65, 88, 80, 96];
const balanceData  = [40, 52, 48, 65, 70, 82, 75, 90, 88, 100];

export default function Index() {
  const [activeNav, setActiveNav] = useState<string>(() =>
    localStorage.getItem("ah-active-nav") || "dashboard"
  );
  const [collapsed, setCollapsed] = useState<boolean>(() =>
    localStorage.getItem("ah-sidebar-collapsed") === "true"
  );
  const [timeFilter, setTimeFilter] = useState<"monthly" | "weekly">("monthly");

  useEffect(() => {
    localStorage.setItem("ah-active-nav", activeNav);
  }, [activeNav]);

  useEffect(() => {
    localStorage.setItem("ah-sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main layout offset */}
      <motion.div
        className="flex-1 flex flex-col"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center gap-3"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {/* Left group: Title + Search + Actions */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Title */}
            <div className="flex-shrink-0">
              <h1 className="font-bold text-navy text-lg leading-tight">Dashboard</h1>
              <p className="text-[11px] text-muted-foreground">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5 group focus-within:ring-2 focus-within:ring-primary/30 transition-all max-w-lg">
              <svg className="w-4 h-4 text-muted-foreground group-focus-within:text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search customers, products, analytics..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1 min-w-0"
              />
              <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Time filter */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-xl flex-shrink-0">
              {(["monthly", "weekly"] as const).map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all btn-squeeze ${
                    timeFilter === f
                      ? "bg-primary text-primary-foreground shadow-blue"
                      : "text-muted-foreground hover:text-navy"
                  }`}
                  whileTap={{ scale: 0.94 }}
                >
                  {f}
                </motion.button>
              ))}
            </div>

            {/* Create button */}
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-squeeze btn-glow flex-shrink-0"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:block">Create</span>
            </motion.button>

            {/* Chat icon */}
            <motion.button
              className="relative w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors btn-squeeze flex-shrink-0"
              whileTap={{ scale: 0.93 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-card pulse-dot"
                style={{ background: "hsl(var(--accent))" }}
              />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors btn-squeeze flex-shrink-0"
              whileTap={{ scale: 0.93 }}
            >
              <Bell className="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-card"
                style={{ background: "hsl(var(--destructive))" }}
              />
            </motion.button>

            {/* Filter */}
            <motion.button
              className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors btn-squeeze btn-glow flex-shrink-0"
              whileTap={{ scale: 0.93 }}
            >
              <Filter className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Far-right: User Profile Avatar */}
          <motion.div
            className="relative cursor-pointer flex-shrink-0 ml-auto pr-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <img
              src={avatar3}
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/40"
              style={{ boxShadow: "0 0 0 3px hsl(var(--primary) / 0.18), 0 4px 16px hsl(var(--primary) / 0.2)" }}
            />
            {/* Live-status indicator */}
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card pulse-dot"
              style={{ background: "hsl(var(--success))" }}
            />
          </motion.div>
        </motion.header>

        {/* Body */}
        <div className="flex-1 flex gap-6 p-6 overflow-auto">
          {/* Center content */}
          <main className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Overview Section */}
            <section>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between mb-4"
              >
                <h2 className="text-lg font-bold text-navy">Overview</h2>
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full font-medium capitalize">
                  {timeFilter}
                </span>
              </motion.div>

              <div className="flex gap-4">
                <OverviewCard
                  title="Total Customers"
                  value="2,485"
                  badge="+10%"
                  subtitle="from yesterday"
                  data={customerData}
                  color="hsl(220 100% 50%)"
                  delay={0.15}
                />
                <OverviewCard
                  title="Balance"
                  value="$412K"
                  badge="+15%"
                  subtitle="from last month"
                  data={balanceData}
                  color="hsl(192 100% 45%)"
                  delay={0.25}
                  showWallet
                />
              </div>
            </section>

            {/* New Customers Gallery */}
            <CustomerGallery />

            {/* Tasks */}
            <TaskCards />
          </main>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </motion.div>
    </div>
  );
}
