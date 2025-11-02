"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Video, FileText, TrendingUp, TrendingDown, Users, CheckCircle2, AlertTriangle, Clock, Search, Filter, Bell, Sparkles, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmployeeHomeDashboardProps {
  onPatientSelect: (patient: any) => void;
  onScheduleAppointment: () => void;
  onCreatePlan: () => void;
  onReviewVideos: () => void;
  onGenerateReports: () => void;
}

export function EmployeeHomeDashboard({ 
  onPatientSelect,
  onScheduleAppointment,
  onCreatePlan,
  onReviewVideos,
  onGenerateReports
}: EmployeeHomeDashboardProps) {
  const [filter, setFilter] = useState<"all" | "high-risk" | "missed" | "pain">("all");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Mock data - replace with real data from API
  const priorityPatients = [
    {
      id: 1,
      name: "Sarah Chen",
      photo: null,
      alertLevel: "urgent" as const,
      lastActivity: "2 hours ago",
      concern: "pain",
      message: "Pain increased to 7/10"
    },
    {
      id: 2,
      name: "Michael Johnson",
      photo: null,
      alertLevel: "attention" as const,
      lastActivity: "1 day ago",
      concern: "missed",
      message: "Missed 2 sessions"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      photo: null,
      alertLevel: "routine" as const,
      lastActivity: "3 hours ago",
      concern: "adherence",
      message: "Declining adherence"
    },
    {
      id: 4,
      name: "David Kim",
      photo: null,
      alertLevel: "urgent" as const,
      lastActivity: "30 minutes ago",
      concern: "pain",
      message: "Pain escalation"
    },
    {
      id: 5,
      name: "Jessica Martinez",
      photo: null,
      alertLevel: "attention" as const,
      lastActivity: "4 hours ago",
      concern: "missed",
      message: "Missed session"
    },
  ];

  const metrics = {
    activePatients: { value: 42, trend: +5, sparkline: [38, 40, 39, 41, 42, 41, 42] },
    completionRate: { value: 87, average: 82, donutData: { completed: 87, pending: 13 } },
    appointmentsToday: { scheduled: 8, completed: 3, pending: 5 },
    averagePainLevel: { value: 3.2, trend: "down" as const, change: -0.8 }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "urgent": return "bg-red-500";
      case "attention": return "bg-amber-500";
      default: return "bg-gray-400";
    }
  };

  const getConcernIcon = (concern: string) => {
    switch (concern) {
      case "pain": return "😣";
      case "missed": return "📅";
      case "adherence": return "📉";
      default: return "ℹ️";
    }
  };

  return (
    <div className="h-full overflow-y-auto pt-[72px] p-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_35%_25%] gap-6">
        {/* Left Column - Priority Patient List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Patients Needing Attention</h2>
          </div>
          
          {/* Filter Chips */}
          <div className="flex gap-2 mb-4 flex-wrap items-center">
            {(["all", "high-risk", "missed", "pain"] as const).map((f, idx) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {f === "all" ? "All" : f === "high-risk" ? "High Risk" : f === "missed" ? "Missed Sessions" : "Pain Escalation"}
              </motion.button>
            ))}
          </div>

          {/* Patient Cards */}
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {priorityPatients
                .filter(p => filter === "all" || 
                  (filter === "high-risk" && p.alertLevel === "urgent") ||
                  (filter === "missed" && p.concern === "missed") ||
                  (filter === "pain" && p.concern === "pain"))
                .map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Card
                      onClick={() => onPatientSelect(patient)}
                      className="p-4 cursor-pointer transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500 bg-white hover:shadow-xl hover:shadow-blue-100"
                    >
                      <div className="flex items-center gap-4">
                        {/* Alert Indicator */}
                        <motion.div 
                          className={`w-1.5 h-14 rounded-full ${getAlertColor(patient.alertLevel)}`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Patient Photo/Initials */}
                        <motion.div 
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-lg font-bold text-white">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </motion.div>
                        
                        {/* Patient Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 truncate">{patient.name}</h3>
                            <motion.span 
                              className="text-xl"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            >
                              {getConcernIcon(patient.concern)}
                            </motion.span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{patient.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{patient.lastActivity}</p>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPatientSelect(patient);
                            }}
                            className="flex-shrink-0"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Middle Column - Today's Snapshot */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Snapshot</h2>
          
          {/* Metrics Dashboard */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Active Patients */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-5 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Active Patients</span>
                  <motion.div 
                    className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-5 h-5 text-blue-600" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {metrics.activePatients.value}
                </motion.div>
                <div className="flex items-center gap-1.5 text-sm">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </motion.div>
                  <span className="text-green-600 font-medium">+{metrics.activePatients.trend} this week</span>
                </div>
              </Card>
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-5 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <motion.div 
                    className="p-2.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  {metrics.completionRate.value}%
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">
                  Avg: {metrics.completionRate.average}%
                </div>
              </Card>
            </motion.div>

            {/* Appointments Today */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-5 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Appointments</span>
                  <motion.div 
                    className="p-2.5 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {metrics.appointmentsToday.scheduled}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">
                  <span className="text-green-600">{metrics.appointmentsToday.completed}</span> completed, <span className="text-amber-600">{metrics.appointmentsToday.pending}</span> pending
                </div>
              </Card>
            </motion.div>

            {/* Average Pain Level */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-5 bg-gradient-to-br from-red-50 to-white border-red-200 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Avg Pain Level</span>
                  <motion.div 
                    className="p-2.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  {metrics.averagePainLevel.value}
                </motion.div>
                <div className="flex items-center gap-1.5 text-sm">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  </motion.div>
                  <span className="text-green-600 font-medium">{metrics.averagePainLevel.change > 0 ? "+" : ""}{metrics.averagePainLevel.change}</span>
                </div>
              </Card>
            </motion.div>
          </div>

                {/* Enhanced Calendar Widget */}
                <Card className="p-5 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">This Week</h3>
                    <span className="text-xs text-gray-500">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                  </div>
                  
                  {/* Calendar Data - Mock appointments per day */}
                  {(() => {
                    // Mock appointment data
                    const appointments = [
                      { day: 15, count: 2, urgent: 0 },
                      { day: 16, count: 5, urgent: 1 },
                      { day: 17, count: 3, urgent: 0 },
                      { day: 18, count: 4, urgent: 1 },
                      { day: 19, count: 1, urgent: 0 },
                      { day: 20, count: 6, urgent: 2 },
                      { day: 21, count: 2, urgent: 0 },
                    ];
                    
                    return (
                      <div className="grid grid-cols-7 gap-2 mb-3">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                          const dateNum = index + 15;
                          const today = new Date();
                          const isToday = dateNum === today.getDate() && today.getMonth() === new Date().getMonth();
                          const dayData = appointments.find(a => a.day === dateNum) || { count: 0, urgent: 0 };
                          
                          return (
                        <motion.div
                          key={day}
                          className="text-center cursor-pointer group"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="text-xs text-gray-600 mb-1 font-medium">{day}</div>
                          <div className={`relative w-10 h-10 mx-auto rounded-lg flex flex-col items-center justify-center text-sm font-semibold transition-all ${
                            isToday
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                              : dayData.count > 0
                              ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                              : "bg-gray-50 text-gray-600"
                          }`}>
                            <span>{dateNum}</span>
                            {dayData.count > 0 && (
                              <div className="absolute -bottom-1 flex gap-0.5">
                                {Array.from({ length: Math.min(dayData.count, 3) }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${
                                      i < dayData.urgent ? "bg-red-500" : "bg-blue-500"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          {dayData.count > 3 && (
                            <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                              +{dayData.count - 3}
                            </div>
                          )}
                        </motion.div>
                        );
                      })}
                      </div>
                    );
                  })()}
                  
                  {/* Legend & Summary */}
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    {(() => {
                      const appointments = [
                        { day: 15, count: 2, urgent: 0 },
                        { day: 16, count: 5, urgent: 1 },
                        { day: 17, count: 3, urgent: 0 },
                        { day: 18, count: 4, urgent: 1 },
                        { day: 19, count: 1, urgent: 0 },
                        { day: 20, count: 6, urgent: 2 },
                        { day: 21, count: 2, urgent: 0 },
                      ];
                      
                      return (
                        <>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-gray-600">Appointments</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-gray-600">Urgent</span>
                              </div>
                            </div>
                            <div className="text-gray-600 font-semibold">
                              {appointments.reduce((sum, a) => sum + a.count, 0)} total this week
                            </div>
                          </div>
                          
                          {/* Today's Appointments Preview */}
                          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-blue-900">Today's Schedule</span>
                              <span className="text-blue-700">{appointments[0]?.count || 0} appointments</span>
                            </div>
                            <div className="text-[10px] text-blue-700 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span>09:00 - Sarah Chen</span>
                                <span className="text-blue-500">Follow-up</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>14:30 - Michael J.</span>
                                <span className="text-red-500">Urgent</span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </Card>
        </div>

        {/* Right Column - Quick Actions & Insights */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          
          {/* AI Insights Panel */}
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              AI Insights
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">3 patients showing improvement</p>
                <p className="text-xs text-gray-600">This week</p>
              </div>
              <motion.div 
                className="bg-white p-3 rounded-lg border-2 border-amber-200"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">2 patients at risk</p>
                <p className="text-xs text-gray-600">Of disengagement</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full border-amber-300 hover:bg-amber-50"
                    onClick={() => {
                      setLoadingAction("risk-action");
                      setTimeout(() => {
                        alert("Loading at-risk patients...");
                        setLoadingAction(null);
                      }, 1000);
                    }}
                  >
                    {loadingAction === "risk-action" ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      <>Take Action</>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="bg-white p-3 rounded-lg border-2 border-blue-200"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">Sarah Chen ready</p>
                <p className="text-xs text-gray-600">For Phase 2 progression</p>
                <div className="flex gap-2 mt-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setLoadingAction("approve");
                        setTimeout(() => {
                          alert("Phase 2 progression approved for Sarah Chen!");
                          setLoadingAction(null);
                        }, 1000);
                      }}
                    >
                      {loadingAction === "approve" ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Approving...</>
                      ) : (
                        <>Approve</>
                      )}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        alert("Opening modification panel...");
                      }}
                    >
                      Modify
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Card>

          {/* Quick Action Buttons */}
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-300 transition-all group" 
                onClick={() => {
                  setLoadingAction("schedule");
                  setTimeout(() => {
                    onScheduleAppointment();
                    setLoadingAction(null);
                  }, 500);
                }}
              >
                <motion.div
                  animate={{ rotate: loadingAction === "schedule" ? 360 : 0 }}
                  transition={{ duration: 1, repeat: loadingAction === "schedule" ? Infinity : 0 }}
                >
                  <Calendar className="w-5 h-5 mr-3 group-hover:text-blue-600" />
                </motion.div>
                {loadingAction === "schedule" ? "Opening..." : "Schedule Appointment"}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-green-50 hover:border-green-300 transition-all group" 
                onClick={() => {
                  setLoadingAction("plan");
                  setTimeout(() => {
                    onCreatePlan();
                    setLoadingAction(null);
                  }, 500);
                }}
              >
                <FileText className="w-5 h-5 mr-3 group-hover:text-green-600" />
                {loadingAction === "plan" ? "Loading..." : "Create Exercise Plan"}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 relative hover:bg-purple-50 hover:border-purple-300 transition-all group" 
                onClick={() => {
                  setLoadingAction("videos");
                  setTimeout(() => {
                    onReviewVideos();
                    setLoadingAction(null);
                  }, 500);
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Video className="w-5 h-5 mr-3 group-hover:text-purple-600" />
                </motion.div>
                Review Pending Videos
                <motion.span 
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  12
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-amber-50 hover:border-amber-300 transition-all group" 
                onClick={() => {
                  setLoadingAction("reports");
                  setTimeout(() => {
                    onGenerateReports();
                    setLoadingAction(null);
                  }, 500);
                }}
              >
                <FileText className="w-5 h-5 mr-3 group-hover:text-amber-600" />
                {loadingAction === "reports" ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  "Generate Reports"
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

