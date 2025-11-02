"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, FileText, TrendingUp, Users, CheckCircle2, Clock, Loader2, ChevronRight, Filter, Sparkles, AlertTriangle, ArrowUpRight, Zap } from "lucide-react";

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
  onGenerateReports,
}: EmployeeHomeDashboardProps) {
  const [filter, setFilter] = useState<"all" | "high-risk" | "missed" | "pain">("all");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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
    activePatients: { value: 42, trend: +5 },
    completionRate: { value: 87, average: 82 },
    appointmentsToday: { scheduled: 8, completed: 3, pending: 5 },
  };

  // AI Insights - Most important information at a glance
  const aiInsights = [
    {
      id: 1,
      type: "urgent",
      title: "Urgent Pain",
      count: 2,
      color: "red",
      patients: ["Sarah Chen", "David Kim"]
    },
    {
      id: 2,
      type: "success",
      title: "Improving",
      count: 3,
      color: "green"
    },
    {
      id: 3,
      type: "warning",
      title: "At Risk",
      count: 2,
      color: "amber",
      patients: ["Michael Johnson", "Jessica Martinez"]
    },
    {
      id: 4,
      type: "info",
      title: "Ready to Progress",
      count: 1,
      color: "blue",
      patients: ["Sarah Chen"]
    }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case "urgent": return "from-red-500 to-red-600";
      case "attention": return "from-amber-500 to-amber-600";
      default: return "from-gray-400 to-gray-500";
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

  const getInsightIcon = (color: string) => {
    switch (color) {
      case "red": return <AlertTriangle className="w-5 h-5" />;
      case "green": return <TrendingUp className="w-5 h-5" />;
      case "amber": return <AlertTriangle className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getInsightBgColor = (color: string) => {
    switch (color) {
      case "red": return "bg-white border-red-300";
      case "green": return "bg-white border-emerald-300";
      case "amber": return "bg-white border-amber-300";
      default: return "bg-white border-blue-300";
    }
  };

  const getInsightTextColor = (color: string) => {
    switch (color) {
      case "red": return "text-red-600";
      case "green": return "text-emerald-600";
      case "amber": return "text-amber-600";
      default: return "text-blue-600";
    }
  };

  const getInsightIconBg = (color: string) => {
    switch (color) {
      case "red": return "bg-red-100";
      case "green": return "bg-emerald-100";
      case "amber": return "bg-amber-100";
      default: return "bg-blue-100";
    }
  };

  const urgentCount = priorityPatients.filter(p => p.alertLevel === "urgent").length;
  const attentionCount = priorityPatients.filter(p => p.alertLevel === "attention").length;

  return (
    <div className="h-full overflow-y-auto pt-[72px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <p className="text-sm text-gray-500">AI-powered insights for better patient care</p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{metrics.activePatients.value}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
                <div className="text-xs text-gray-500">Urgent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Priority Patients */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Priority Patients</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                {showFilters ? "Hide" : "Filter"}
              </Button>
            </div>
            
            {/* Compact Filters */}
            {showFilters && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {(["all", "high-risk", "missed", "pain"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filter === f
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {f === "all" ? "All" : f === "high-risk" ? "High Risk" : f === "missed" ? "Missed" : "Pain"}
                  </button>
                ))}
              </div>
            )}

            {/* Patient Cards */}
            <div className="space-y-2">
              {priorityPatients
                .filter(p => filter === "all" || 
                  (filter === "high-risk" && p.alertLevel === "urgent") ||
                  (filter === "missed" && p.concern === "missed") ||
                  (filter === "pain" && p.concern === "pain"))
                .map((patient) => (
                  <Card
                    key={patient.id}
                    onClick={() => onPatientSelect(patient)}
                    className="group p-4 cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300 hover:shadow-lg hover:shadow-blue-100/50 hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      {/* Alert Indicator */}
                      <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${getAlertColor(patient.alertLevel)} opacity-80`} />
                      
                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAlertColor(patient.alertLevel)} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-base font-semibold text-white">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      
                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-base font-semibold text-gray-900 truncate">{patient.name}</h3>
                          <span className="text-lg">{getConcernIcon(patient.concern)}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-1">{patient.message}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {patient.lastActivity}
                        </div>
                      </div>
                      
                      {/* Arrow Indicator */}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Right Column - AI Insights & Quick Actions */}
          <div className="space-y-4">
            {/* AI Insights - Prominent on Right Side */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
              </div>
              
               <div className="grid grid-cols-2 gap-3">
                 {aiInsights.map((insight) => (
                   <Card
                     key={insight.id}
                     className={`p-4 ${getInsightBgColor(insight.color)} border-2 hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden`}
                     onClick={() => {
                       if (insight.patients && insight.patients.length > 0) {
                         const patient = priorityPatients.find(p => insight.patients.includes(p.name));
                         if (patient) onPatientSelect(patient);
                       }
                     }}
                   >
                     {/* Colored accent bar */}
                     <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                       insight.color === "red" ? "bg-red-500" :
                       insight.color === "green" ? "bg-emerald-500" :
                       insight.color === "amber" ? "bg-amber-500" :
                       "bg-blue-500"
                     }`} />
                     
                     {/* Main Content */}
                     <div className="flex flex-col items-center text-center pt-2">
                       {/* Large Icon */}
                       <div className={`${getInsightIconBg(insight.color)} p-3 rounded-xl mb-3`}>
                         <div className={getInsightTextColor(insight.color)}>
                           {getInsightIcon(insight.color)}
                         </div>
                       </div>
                       
                       {/* Count - Large and prominent */}
                       <div className={`text-3xl font-bold ${getInsightTextColor(insight.color)} mb-1`}>
                         {insight.count}
                       </div>
                       
                       {/* Title */}
                       <h4 className={`font-semibold text-xs leading-tight ${getInsightTextColor(insight.color)} mb-2 px-1`}>
                         {insight.title}
                       </h4>
                     </div>
                     
                     {/* Hover arrow indicator */}
                     <ArrowUpRight className={`absolute top-2 right-2 w-4 h-4 ${getInsightTextColor(insight.color)} opacity-0 group-hover:opacity-100 transition-opacity`} />
                   </Card>
                 ))}
               </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mt-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all border-gray-200/60" 
                  onClick={() => {
                    setLoadingAction("schedule");
                    setTimeout(() => {
                      onScheduleAppointment();
                      setLoadingAction(null);
                    }, 300);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2.5" />
                  {loadingAction === "schedule" ? "Opening..." : "Schedule"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-green-300 hover:text-green-600 transition-all border-gray-200/60" 
                  onClick={() => {
                    setLoadingAction("plan");
                    setTimeout(() => {
                      onCreatePlan();
                      setLoadingAction(null);
                    }, 300);
                  }}
                >
                  <FileText className="w-4 h-4 mr-2.5" />
                  {loadingAction === "plan" ? "Loading..." : "New Plan"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11 relative bg-white/80 backdrop-blur-sm hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all border-gray-200/60" 
                  onClick={() => {
                    setLoadingAction("videos");
                    setTimeout(() => {
                      onReviewVideos();
                      setLoadingAction(null);
                    }, 300);
                  }}
                >
                  <Video className="w-4 h-4 mr-2.5" />
                  Review Videos
                  <span className="absolute top-1.5 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    12
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-amber-300 hover:text-amber-600 transition-all border-gray-200/60" 
                  onClick={() => {
                    setLoadingAction("reports");
                    setTimeout(() => {
                      onGenerateReports();
                      setLoadingAction(null);
                    }, 300);
                  }}
                >
                  <FileText className="w-4 h-4 mr-2.5" />
                  {loadingAction === "reports" ? (
                    <><Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> Generating...</>
                  ) : (
                    "Reports"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
