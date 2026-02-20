import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Filter } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { OverviewCard } from "@/components/OverviewCards";
import { CustomerGallery } from "@/components/CustomerGallery";
import { TaskCards } from "@/components/TaskCards";
import { RightSidebar } from "@/components/RightSidebar";

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
          className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center gap-4"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {/* Title */}
          <div className="flex-1">
            <h1 className="font-bold text-navy text-xl leading-tight">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Time filter */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
            {(["monthly", "weekly"] as const).map((f) => (
              <motion.button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all btn-squeeze ${
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

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 w-52 group focus-within:ring-2 focus-within:ring-primary/30 transition-all">
            <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search analytics..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1 min-w-0"
            />
          </div>

          {/* Filter */}
          <motion.button
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors btn-squeeze btn-glow"
            whileTap={{ scale: 0.93 }}
          >
            <Filter className="w-4 h-4" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="relative w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors btn-squeeze"
            whileTap={{ scale: 0.93 }}
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-card pulse-dot"
              style={{ background: "hsl(var(--accent))" }}
            />
          </motion.button>
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
