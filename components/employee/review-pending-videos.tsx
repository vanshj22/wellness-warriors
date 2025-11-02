"use client";
import { useState } from "react";
import { ArrowLeft, Video, Filter, Search, CheckCircle, AlertCircle, Clock, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface ReviewPendingVideosProps {
  onBack: () => void;
  onPatientSelect: (patient: any) => void;
}

export function ReviewPendingVideos({ onBack, onPatientSelect }: ReviewPendingVideosProps) {
  const [filter, setFilter] = useState<"all" | "urgent" | "recent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewedVideos, setReviewedVideos] = useState<Set<number>>(new Set());
  const [loadingReview, setLoadingReview] = useState<number | null>(null);

  const pendingVideos = [
    {
      id: 1,
      patient: { id: 1, name: "Sarah Chen" },
      exercise: "Squat Exercise",
      date: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1517836357483-6eb0e8bb5d94?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 58,
      concern: "Poor alignment detected",
      priority: "urgent",
      reps: 6,
      repTarget: 10,
      notes: "Patient struggling with knee alignment. Needs immediate attention."
    },
    {
      id: 2,
      patient: { id: 3, name: "Emily Rodriguez" },
      exercise: "Scaption Strengthening",
      date: "5 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 65,
      concern: "Favoring right side",
      priority: "high",
      reps: 8,
      repTarget: 12,
      notes: "Noticeable compensation pattern on left side."
    },
    {
      id: 3,
      patient: { id: 4, name: "David Kim" },
      exercise: "Shoulder Flexion",
      date: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 72,
      concern: "Limited ROM",
      priority: "medium",
      reps: 10,
      repTarget: 12,
      notes: "Range of motion appears restricted."
    },
    {
      id: 4,
      patient: { id: 2, name: "Michael Johnson" },
      exercise: "Squat Exercise",
      date: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1538805060514-97d9cbf8e7cd?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 55,
      concern: "Multiple form issues",
      priority: "urgent",
      reps: 4,
      repTarget: 10,
      notes: "Significant form deterioration. Recommend modification."
    },
    {
      id: 5,
      patient: { id: 5, name: "Jessica Martinez" },
      exercise: "Knee Extensions",
      date: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 78,
      concern: "Speed too fast",
      priority: "low",
      reps: 12,
      repTarget: 15,
      notes: "Exercise performed too quickly. Form compromised."
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 border-red-600";
      case "high": return "bg-amber-500 border-amber-600";
      case "medium": return "bg-yellow-500 border-yellow-600";
      default: return "bg-gray-500 border-gray-600";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  const handleReview = (videoId: number) => {
    setLoadingReview(videoId);
    setTimeout(() => {
      setReviewedVideos(prev => new Set([...prev, videoId]));
      setLoadingReview(null);
    }, 1000);
  };

  const filteredVideos = pendingVideos.filter(video => {
    if (filter === "urgent" && video.priority !== "urgent") return false;
    if (filter === "recent" && !video.date.includes("hour")) return false;
    if (searchQuery && !video.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !video.exercise.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return !reviewedVideos.has(video.id);
  });

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-[72px] z-30">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">Review Pending Videos</h1>
            <p className="text-sm text-gray-600 mt-1">{filteredVideos.length} videos need review</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients or exercises..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b px-6 py-3 flex items-center gap-3 sticky top-[140px] z-20">
        <Filter className="w-4 h-4 text-gray-500" />
        {(["all", "urgent", "recent"] as const).map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All Videos" : f === "urgent" ? "Urgent Only" : "Recent"}
          </motion.button>
        ))}
      </div>

      {/* Video List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <AnimatePresence>
            {filteredVideos.length === 0 ? (
              <Card className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
                <p className="text-gray-600">No pending videos to review.</p>
              </Card>
            ) : (
              filteredVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Video Thumbnail */}
                      <div className="relative">
                        <HeroVideoDialog
                          animationStyle="from-center"
                          videoSrc={video.videoUrl}
                          thumbnailSrc={video.thumbnail}
                          thumbnailAlt={video.exercise}
                          className="w-full"
                        />
                        <div className={`absolute top-2 left-2 px-2 py-1 ${getPriorityColor(video.priority)} text-white text-xs font-bold rounded shadow-lg`}>
                          {video.priority.toUpperCase()}
                        </div>
                        <div className={`absolute top-2 right-2 px-2 py-1 ${getScoreColor(video.formScore)} text-white text-xs font-bold rounded shadow-lg`}>
                          {video.formScore}%
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{video.exercise}</h3>
                            {reviewedVideos.has(video.id) && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Reviewed
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <button
                                onClick={() => onPatientSelect(video.patient)}
                                className="font-semibold text-blue-600 hover:underline"
                              >
                                {video.patient.name}
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {video.date}
                            </div>
                          </div>
                          
                          {/* Concern Alert */}
                          <div className="flex items-start gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-lg mb-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-red-900 mb-1">{video.concern}</p>
                              <p className="text-sm text-red-700">{video.notes}</p>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Reps Completed</p>
                              <p className="text-lg font-bold text-gray-900">
                                {video.reps}/{video.repTarget}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Form Score</p>
                              <p className={`text-lg font-bold ${video.formScore < 70 ? "text-red-600" : "text-amber-600"}`}>
                                {video.formScore}%
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            {!reviewedVideos.has(video.id) ? (
                              <>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1"
                                >
                                  <Button
                                    onClick={() => handleReview(video.id)}
                                    disabled={loadingReview === video.id}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                  >
                                    {loadingReview === video.id ? (
                                      <>Processing...</>
                                    ) : (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Mark as Reviewed
                                      </>
                                    )}
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    onClick={() => onPatientSelect(video.patient)}
                                  >
                                    View Patient
                                  </Button>
                                </motion.div>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => onPatientSelect(video.patient)}
                              >
                                View Patient Profile
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

