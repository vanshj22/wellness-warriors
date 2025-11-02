"use client";
import { useState } from "react";
import { ArrowLeft, MoreVertical, CheckCircle, Calendar, MessageSquare, FileText, Dumbbell, BarChart3, TrendingUp, TrendingDown, AlertCircle, Clock, Loader2, Save, Plus, X, Edit, Trash2, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { motion, AnimatePresence } from "framer-motion";

interface PatientDetailViewProps {
  patient: any;
  onBack: () => void;
}

type TabType = "overview" | "review" | "exercises" | "progress" | "messages" | "notes";

export function PatientDetailView({ patient, onBack }: PatientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: BarChart3 },
    { id: "review" as TabType, label: "Review", icon: Video },
    { id: "exercises" as TabType, label: "Assign Exercises", icon: Dumbbell },
    { id: "progress" as TabType, label: "Progress", icon: BarChart3 },
    { id: "messages" as TabType, label: "Messages", icon: MessageSquare },
    { id: "notes" as TabType, label: "Notes", icon: FileText },
  ];

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2 sticky top-[72px] z-40 backdrop-blur-sm bg-white/95 flex-shrink-0">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold text-gray-900 mb-0.5">{patient?.name || "Patient Name"}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>Age: 45</span>
              <span className="text-gray-400">•</span>
              <span>Active Recovery</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span 
            className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-800 rounded-full text-sm font-semibold border border-green-200"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Active Recovery
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex items-center gap-1 px-6 overflow-x-auto sticky top-[130px] z-30 flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-4 flex items-center gap-2 font-medium transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <motion.div
                animate={{ rotate: activeTab === tab.id ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ 
        paddingTop: '5rem',
      }}>
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OverviewTab patient={patient} />
            </motion.div>
          )}
          {activeTab === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewTab patient={patient} />
            </motion.div>
          )}
                {activeTab === "exercises" && (
                  <motion.div
                    key="exercises"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AssignExercisesTab patient={patient} />
                  </motion.div>
                )}
          {activeTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressTab patient={patient} />
            </motion.div>
          )}
          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MessagesTab patient={patient} />
            </motion.div>
          )}
          {activeTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <NotesTab patient={patient} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OverviewTab({ patient }: { patient: any }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Treatment Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Treatment Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900">Phase 2 of 4: Strength Building</span>
                <span className="text-sm font-medium text-gray-600">45% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Start Date</p>
                <p className="font-semibold text-gray-900">Jan 15, 2024</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Expected Completion</p>
                <p className="font-semibold text-gray-900">Mar 30, 2024</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Days Remaining</p>
                <p className="font-semibold text-gray-900">12 days</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>8 active exercises • Last session: 2 days ago - Completed 6/8 exercises</span>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-xl transition-all cursor-pointer h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Adherence Rate</h3>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5 text-green-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              89%
            </motion.div>
            <p className="text-sm text-green-600 font-medium">↑ 5% this week</p>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-xl transition-all cursor-pointer h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Avg Form Score</h3>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              85%
            </motion.div>
            <p className="text-sm text-blue-600 font-medium">AI Confidence: High</p>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-xl transition-all cursor-pointer h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Pain Trend</h3>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingDown className="w-5 h-5 text-purple-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              3.2/10
            </motion.div>
            <p className="text-sm text-purple-600 font-medium">↓ From 7/10 baseline</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function AssignExercisesTab({ patient }: { patient: any }) {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [reps, setReps] = useState("10");
  const [sets, setSets] = useState("3");
  const [frequency, setFrequency] = useState("daily");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);

  const [assignedExercises, setAssignedExercises] = useState([
    {
      id: 1,
      name: "Squats",
      category: "Lower Body",
      reps: 10,
      sets: 3,
      frequency: "daily",
      assignedDate: "Jan 15, 2024",
      status: "active",
      instructions: "Perform with proper knee alignment and full depth",
      thumbnail: "https://images.unsplash.com/photo-1517836357483-6eb0e8bb5d94?w=800&q=80"
    },
    {
      id: 2,
      name: "Assisted Shoulder Flexion",
      category: "Upper Body",
      reps: 12,
      sets: 2,
      frequency: "daily",
      assignedDate: "Jan 15, 2024",
      status: "active",
      instructions: "Use wall for support, focus on controlled movement",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
    },
    {
      id: 3,
      name: "Scaption Strengthening",
      category: "Upper Body",
      reps: 10,
      sets: 2,
      frequency: "every-other-day",
      assignedDate: "Jan 20, 2024",
      status: "active",
      instructions: "Maintain neutral spine, avoid shrugging",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
    },
  ]);

  const exerciseLibrary = [
    {
      id: 101,
      name: "Squats",
      category: "Lower Body",
      description: "Lower body strengthening exercise focusing on quadriceps and glutes",
      thumbnail: "https://images.unsplash.com/photo-1517836357483-6eb0e8bb5d94?w=800&q=80",
      defaultReps: 10,
      defaultSets: 3
    },
    {
      id: 102,
      name: "Assisted Shoulder Flexion",
      category: "Upper Body",
      description: "Improves shoulder range of motion with wall support",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      defaultReps: 12,
      defaultSets: 2
    },
    {
      id: 103,
      name: "Scaption Strengthening",
      category: "Upper Body",
      description: "Strengthens shoulder stabilizers in functional position",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      defaultReps: 10,
      defaultSets: 2
    },
    {
      id: 104,
      name: "Knee Extensions",
      category: "Lower Body",
      description: "Isolated quadriceps strengthening exercise",
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
      defaultReps: 15,
      defaultSets: 3
    },
    {
      id: 105,
      name: "Hip Abductions",
      category: "Lower Body",
      description: "Strengthens hip abductors and improves pelvic stability",
      thumbnail: "https://images.unsplash.com/photo-1538805060514-97d9cbf8e7cd?w=800&q=80",
      defaultReps: 12,
      defaultSets: 2
    },
    {
      id: 106,
      name: "Wall Angels",
      category: "Upper Body",
      description: "Improves shoulder mobility and posture",
      thumbnail: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80",
      defaultReps: 10,
      defaultSets: 2
    },
  ];

  const handleAssignExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setReps(exercise.defaultReps.toString());
    setSets(exercise.defaultSets.toString());
    setFrequency("daily");
    setInstructions("");
    setShowAssignForm(true);
    setEditingExercise(null);
  };

  const handleEditExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setReps(exercise.reps.toString());
    setSets(exercise.sets.toString());
    setFrequency(exercise.frequency);
    setInstructions(exercise.instructions);
    setEditingExercise(exercise.id);
    setShowAssignForm(true);
  };

  const handleSaveExercise = () => {
    if (!selectedExercise || !reps || !sets) {
      alert("Please fill in all required fields");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      if (editingExercise) {
        // Update existing
        setAssignedExercises(prev =>
          prev.map(ex =>
            ex.id === editingExercise
              ? {
                  ...ex,
                  reps: parseInt(reps),
                  sets: parseInt(sets),
                  frequency,
                  instructions
                }
              : ex
          )
        );
        alert(`Exercise "${selectedExercise.name}" updated successfully!`);
      } else {
        // Add new
        const newExercise = {
          id: Date.now(),
          name: selectedExercise.name,
          category: selectedExercise.category,
          reps: parseInt(reps),
          sets: parseInt(sets),
          frequency,
          assignedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          status: "active",
          instructions,
          thumbnail: selectedExercise.thumbnail
        };
        setAssignedExercises([...assignedExercises, newExercise]);
        alert(`Exercise "${selectedExercise.name}" assigned successfully!`);
      }
      setSaving(false);
      setShowAssignForm(false);
      setSelectedExercise(null);
      setEditingExercise(null);
    }, 1000);
  };

  const handleRemoveExercise = (exerciseId: number) => {
    if (confirm("Are you sure you want to remove this exercise?")) {
      setAssignedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
      alert("Exercise removed successfully!");
    }
  };

  const availableExercises = exerciseLibrary.filter(
    libEx => !assignedExercises.some(assigned => assigned.name === libEx.name)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assigned Exercises</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage exercises for {patient?.name || "patient"}
          </p>
        </div>
        {!showAssignForm && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowAssignForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Assign Exercise
            </Button>
          </motion.div>
        )}
      </div>

      {showAssignForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingExercise ? "Edit Exercise" : "Assign New Exercise"}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => {
                setShowAssignForm(false);
                setSelectedExercise(null);
                setEditingExercise(null);
              }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {!selectedExercise ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Exercise from Library
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableExercises.map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="p-4 cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all"
                        onClick={() => handleAssignExercise(exercise)}
                      >
                        <img
                          src={exercise.thumbnail}
                          alt={exercise.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-semibold text-gray-900 mb-1">{exercise.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{exercise.category}</p>
                        <p className="text-sm text-gray-700">{exercise.description}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {availableExercises.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>All available exercises have been assigned.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <img
                    src={selectedExercise.thumbnail}
                    alt={selectedExercise.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{selectedExercise.name}</h4>
                    <p className="text-sm text-gray-600">{selectedExercise.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reps per Set *
                    </label>
                    <input
                      type="number"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      min="1"
                      max="50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Sets *
                    </label>
                    <input
                      type="number"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      min="1"
                      max="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Frequency *
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="every-other-day">Every Other Day</option>
                      <option value="3x-week">3x per Week</option>
                      <option value="2x-week">2x per Week</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add any specific instructions or modifications..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setShowAssignForm(false);
                        setSelectedExercise(null);
                        setEditingExercise(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      onClick={handleSaveExercise}
                      disabled={saving}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {editingExercise ? "Updating..." : "Assigning..."}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {editingExercise ? "Update Exercise" : "Assign Exercise"}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Currently Assigned Exercises */}
          <div className="space-y-4">
            <AnimatePresence>
              {assignedExercises.length === 0 ? (
                <Card className="p-12 text-center">
                  <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Exercises Assigned</h3>
                  <p className="text-gray-600 mb-4">Start by assigning exercises to this patient.</p>
                  <Button onClick={() => setShowAssignForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign First Exercise
                  </Button>
                </Card>
              ) : (
                assignedExercises.map((exercise, idx) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-all">
                      <div className="flex gap-6">
                        <img
                          src={exercise.thumbnail}
                          alt={exercise.name}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{exercise.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                                  {exercise.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Assigned: {exercise.assignedDate}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  exercise.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {exercise.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditExercise(exercise)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveExercise(exercise.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Reps</p>
                              <p className="text-lg font-bold text-gray-900">{exercise.reps}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Sets</p>
                              <p className="text-lg font-bold text-gray-900">{exercise.sets}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Frequency</p>
                              <p className="text-lg font-bold text-gray-900 capitalize">
                                {exercise.frequency.replace(/-/g, " ")}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Total Reps</p>
                              <p className="text-lg font-bold text-gray-900">
                                {exercise.reps * exercise.sets}
                              </p>
                            </div>
                          </div>

                          {exercise.instructions && (
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-xs font-semibold text-blue-900 mb-1">Instructions:</p>
                              <p className="text-sm text-blue-800">{exercise.instructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Exercises</p>
                <p className="text-2xl font-bold text-gray-900">{assignedExercises.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {assignedExercises.filter(e => e.status === "active").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Daily Reps</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignedExercises
                    .filter(e => e.frequency === "daily")
                    .reduce((sum, e) => sum + e.reps * e.sets, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(assignedExercises.map(e => e.category)).size}
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function VideosTab_OLD({ patient }: { patient: any }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [loadingVideo, setLoadingVideo] = useState<number | null>(null);
  const [reviewedVideos, setReviewedVideos] = useState<Set<number>>(new Set());

  const exerciseVideos = [
    {
      id: 1,
      name: "Squat Exercise - Session 1",
      date: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1517836357483-6eb0e8bb5d94?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 92,
      status: "good",
      tags: ["Good ROM", "Proper Depth"],
      reps: 8,
      repTarget: 10,
      reviewNeeded: false,
    },
    {
      id: 2,
      name: "Shoulder Flexion - Session 1",
      date: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 85,
      status: "good",
      tags: ["Slight Compensation"],
      reps: 12,
      repTarget: 12,
      reviewNeeded: false,
    },
    {
      id: 3,
      name: "Squat Exercise - Session 2",
      date: "5 days ago",
      thumbnail: "https://images.unsplash.com/photo-1538805060514-97d9cbf8e7cd?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 58,
      status: "warning",
      tags: ["Needs Improvement", "Poor Alignment"],
      reps: 6,
      repTarget: 10,
      reviewNeeded: true,
    },
    {
      id: 4,
      name: "Scaption Strengthening",
      date: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 78,
      status: "warning",
      tags: ["Favoring Right Side"],
      reps: 10,
      repTarget: 10,
      reviewNeeded: true,
    },
    {
      id: 5,
      name: "Squat Exercise - Session 3",
      date: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 95,
      status: "excellent",
      tags: ["Perfect Form", "Full ROM"],
      reps: 10,
      repTarget: 10,
      reviewNeeded: false,
    },
    {
      id: 6,
      name: "Shoulder Flexion - Session 2",
      date: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 88,
      status: "good",
      tags: ["Good Progress"],
      reps: 11,
      repTarget: 12,
      reviewNeeded: false,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      excellent: "bg-green-100 text-green-800 border-green-300",
      good: "bg-blue-100 text-blue-800 border-blue-300",
      warning: "bg-amber-100 text-amber-800 border-amber-300",
    };
    return styles[status as keyof typeof styles] || styles.good;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Exercise Videos</h2>
        <div className="flex flex-wrap gap-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Exercises</option>
            <option value="review">Needs Review</option>
            <option value="flagged">Flagged by AI</option>
            <option value="recent">Last 7 Days</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Recent First</option>
            <option value="concern">Highest Concern</option>
            <option value="score">Best Score</option>
            <option value="worst">Lowest Score</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseVideos
          .filter(v => {
            if (filter === "review") return v.reviewNeeded;
            if (filter === "flagged") return v.reviewNeeded;
            if (filter === "recent") return true; // Simplified
            return true;
          })
          .sort((a, b) => {
            if (sortBy === "recent") return 0;
            if (sortBy === "concern") return (b.reviewNeeded ? 1 : 0) - (a.reviewNeeded ? 1 : 0);
            if (sortBy === "score") return b.formScore - a.formScore;
            if (sortBy === "worst") return a.formScore - b.formScore;
            return 0;
          })
          .map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 bg-white">
            {/* Video Thumbnail with HeroVideoDialog */}
            <div className="relative">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc={video.videoUrl}
                thumbnailSrc={video.thumbnail}
                thumbnailAlt={video.name}
                className="w-full"
              />
              
              {/* Form Score Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1.5 ${getScoreColor(video.formScore)} text-white text-sm font-bold rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1`}>
                {video.formScore >= 90 && <CheckCircle className="w-4 h-4" />}
                {video.formScore < 70 && <AlertCircle className="w-4 h-4" />}
                {video.formScore}%
              </div>

              {/* Review Needed Badge */}
              {video.reviewNeeded && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-lg">
                  Review Needed
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{video.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {video.date}
                </div>
              </div>

              {/* Reps Info */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Reps Completed:</span>
                <span className={`font-semibold ${video.reps === video.repTarget ? 'text-green-600' : 'text-amber-600'}`}>
                  {video.reps}/{video.repTarget}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded border ${getStatusBadge(video.status)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      alert(`Opening notes for ${video.name}...`);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Notes
                  </Button>
                </motion.div>
                {video.reviewNeeded && !reviewedVideos.has(video.id) && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      size="sm" 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      onClick={() => {
                        setLoadingVideo(video.id);
                        setTimeout(() => {
                          setReviewedVideos(prev => new Set([...prev, video.id]));
                          setLoadingVideo(null);
                          alert(`Marked ${video.name} as reviewed!`);
                        }, 1000);
                      }}
                      disabled={loadingVideo === video.id}
                    >
                      {loadingVideo === video.id ? (
                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Reviewing...</>
                      ) : (
                        <>Review</>
                      )}
                    </Button>
                  </motion.div>
                )}
                {reviewedVideos.has(video.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-1"
                  >
                    <Button 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Reviewed
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">{exerciseVideos.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg Form Score</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(exerciseVideos.reduce((acc, v) => acc + v.formScore, 0) / exerciseVideos.length)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Need Review</p>
            <p className="text-2xl font-bold text-red-600">
              {exerciseVideos.filter(v => v.reviewNeeded).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round((exerciseVideos.filter(v => v.reps === v.repTarget).length / exerciseVideos.length) * 100)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProgressTab({ patient }: { patient: any }) {
  const [timeRange, setTimeRange] = useState("30");

  // Mock data for charts
  const adherenceData = [
    { date: "Week 1", value: 65 },
    { date: "Week 2", value: 72 },
    { date: "Week 3", value: 78 },
    { date: "Week 4", value: 85 },
    { date: "Week 5", value: 89 },
    { date: "Week 6", value: 92 },
  ];

  const painData = [
    { date: "Week 1", pain: 7, difficulty: 4 },
    { date: "Week 2", pain: 6, difficulty: 3 },
    { date: "Week 3", pain: 5, difficulty: 3 },
    { date: "Week 4", pain: 4, difficulty: 2 },
    { date: "Week 5", pain: 3, difficulty: 2 },
    { date: "Week 6", pain: 3, difficulty: 2 },
  ];

  const maxAdherence = Math.max(...adherenceData.map(d => d.value));
  const maxPain = 10;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Timeline Selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["7", "30", "90", "All"].map((range, idx) => (
          <motion.button
            key={range}
            onClick={() => setTimeRange(range)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === range
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
            }`}
          >
            {range === "All" ? "All Time" : `${range} Days`}
          </motion.button>
        ))}
      </div>

      {/* Adherence Trend Chart - Line Graph */}
      <Card className="p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Adherence Trend</h2>
            <p className="text-sm text-gray-600 mt-1">Completion percentage over time</p>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">+27% improvement</span>
          </div>
        </div>
        <div className="h-64 relative">
          <svg viewBox="0 0 600 200" className="w-full h-full">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val) => {
              const y = 200 - (val / 100) * 180;
              return (
                <g key={val}>
                  <line
                    x1="40"
                    y1={y}
                    x2="580"
                    y2={y}
                    stroke={val === 80 ? "#ef4444" : "#e5e7eb"}
                    strokeWidth={val === 80 ? 2 : 1}
                    strokeDasharray={val === 80 ? "4 4" : "0"}
                  />
                  <text x="35" y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                    {val}%
                  </text>
                </g>
              );
            })}
            
            {/* Area under line */}
            <defs>
              <linearGradient id="adherenceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 40,${200 - (adherenceData[0].value / 100) * 180} ${adherenceData.map((item, idx) => 
                `L ${60 + idx * 100},${200 - (item.value / 100) * 180}`
              ).join(' ')} L ${60 + (adherenceData.length - 1) * 100},200 L 40,200 Z`}
              fill="url(#adherenceGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Line */}
            <motion.path
              d={`M 40,${200 - (adherenceData[0].value / 100) * 180} ${adherenceData.slice(1).map((item, idx) => 
                `L ${60 + (idx + 1) * 100},${200 - (item.value / 100) * 180}`
              ).join(' ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Data points */}
            {adherenceData.map((item, idx) => {
              const x = 60 + idx * 100;
              const y = 200 - (item.value / 100) * 180;
              return (
                <motion.g key={idx}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-8"
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="#3b82f6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ delay: idx * 0.2 + 1.5, duration: 0.3 }}
                  />
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    className="text-xs fill-gray-700 font-semibold"
                  >
                    {item.value}%
                  </text>
                  <text
                    x={x}
                    y={195}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    {item.date}
                  </text>
                </motion.g>
              );
            })}
            
            {/* Target line label */}
            <text x="590" y={200 - (80 / 100) * 180 + 4} className="text-xs fill-red-600 font-medium">
              80% Target
            </text>
          </svg>
        </div>
      </Card>

      {/* Pain & Difficulty Tracking - Dual Line Graph */}
      <Card className="p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pain & Difficulty Tracking</h2>
            <p className="text-sm text-gray-600 mt-1">Patient-reported metrics over time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">Pain Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">Difficulty</span>
            </div>
          </div>
        </div>
        <div className="h-64 relative">
          <svg viewBox="0 0 600 200" className="w-full h-full">
            {/* Y-axis for Pain (0-10) */}
            <g>
              {[0, 2, 4, 6, 8, 10].map((val) => {
                const y = 200 - (val / 10) * 180;
                return (
                  <g key={`pain-${val}`}>
                    <line
                      x1="40"
                      y1={y}
                      x2="580"
                      y2={y}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                    <text x="35" y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                      {val}
                    </text>
                  </g>
                );
              })}
            </g>
            
            {/* Y-axis for Difficulty (0-5) on right */}
            <g>
              {[0, 1, 2, 3, 4, 5].map((val) => {
                const y = 200 - (val / 5) * 180;
                return (
                  <text key={`diff-${val}`} x="585" y={y + 4} textAnchor="start" className="text-xs fill-purple-600 font-medium">
                    {val}
                  </text>
                );
              })}
              <text x="585" y="15" textAnchor="start" className="text-xs fill-purple-600 font-semibold">
                Difficulty
              </text>
            </g>
            
            {/* Pain line gradient */}
            <defs>
              <linearGradient id="painGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="difficultyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Pain area */}
            <motion.path
              d={`M 40,${200 - (painData[0].pain / 10) * 180} ${painData.slice(1).map((item, idx) => 
                `L ${60 + (idx + 1) * 100},${200 - (item.pain / 10) * 180}`
              ).join(' ')} L ${60 + (painData.length - 1) * 100},200 L 40,200 Z`}
              fill="url(#painGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            />
            
            {/* Difficulty area */}
            <motion.path
              d={`M 40,${200 - (painData[0].difficulty / 5) * 180} ${painData.slice(1).map((item, idx) => 
                `L ${60 + (idx + 1) * 100},${200 - (item.difficulty / 5) * 180}`
              ).join(' ')} L ${60 + (painData.length - 1) * 100},200 L 40,200 Z`}
              fill="url(#difficultyGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            />
            
            {/* Pain line */}
            <motion.path
              d={`M 40,${200 - (painData[0].pain / 10) * 180} ${painData.slice(1).map((item, idx) => 
                `L ${60 + (idx + 1) * 100},${200 - (item.pain / 10) * 180}`
              ).join(' ')}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            />
            
            {/* Difficulty line */}
            <motion.path
              d={`M 40,${200 - (painData[0].difficulty / 5) * 180} ${painData.slice(1).map((item, idx) => 
                `L ${60 + (idx + 1) * 100},${200 - (item.difficulty / 5) * 180}`
              ).join(' ')}`}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            />
            
            {/* Pain data points */}
            {painData.map((item, idx) => {
              const x = 60 + idx * 100;
              const y = 200 - (item.pain / 10) * 180;
              return (
                <motion.g key={`pain-pt-${idx}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 1.7 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#ef4444"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 2, duration: 0.3 }}
                  />
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="text-xs fill-red-700 font-semibold"
                  >
                    {item.pain}
                  </text>
                </motion.g>
              );
            })}
            
            {/* Difficulty data points */}
            {painData.map((item, idx) => {
              const x = 60 + idx * 100;
              const y = 200 - (item.difficulty / 5) * 180;
              return (
                <motion.g key={`diff-pt-${idx}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#a855f7"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 1.9 }}
                  />
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="text-xs fill-purple-700 font-semibold"
                  >
                    {item.difficulty}
                  </text>
                </motion.g>
              );
            })}
            
            {/* X-axis labels */}
            {painData.map((item, idx) => {
              const x = 60 + idx * 100;
              return (
                <text
                  key={`x-${idx}`}
                  x={x}
                  y={195}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {item.date}
                </text>
              );
            })}
            
            {/* Y-axis label */}
            <text x="20" y="100" textAnchor="middle" transform="rotate(-90 20 100)" className="text-xs fill-gray-600 font-medium">
              Pain Level (0-10)
            </text>
          </svg>
        </div>
      </Card>

      {/* Exercise Performance Chart */}
      <Card className="p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Exercise Performance Matrix</h2>
          <p className="text-sm text-gray-600 mt-1">Individual exercise metrics and trends</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Exercise</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Reps Target</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Reps Completed</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Form Score</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Frequency (7d)</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Squats", target: 10, completed: 8, score: 92, freq: 6, trend: "up" },
                { name: "Shoulder Flexion", target: 12, completed: 12, score: 85, freq: 5, trend: "up" },
                { name: "Scaption Strengthening", target: 10, completed: 10, score: 78, freq: 4, trend: "stable" },
                { name: "Knee Extensions", target: 15, completed: 12, score: 88, freq: 7, trend: "up" },
                { name: "Hip Abductions", target: 12, completed: 10, score: 82, freq: 5, trend: "down" },
              ].map((exercise, idx) => (
                <motion.tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{exercise.name}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-600">{exercise.target}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-sm font-semibold ${
                      exercise.completed === exercise.target ? "text-green-600" : "text-amber-600"
                    }`}>
                      {exercise.completed}/{exercise.target}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      exercise.score >= 90 ? "bg-green-100 text-green-800" :
                      exercise.score >= 70 ? "bg-amber-100 text-amber-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {exercise.score}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{exercise.freq} days</td>
                  <td className="py-3 px-4 text-center">
                    {exercise.trend === "up" ? (
                      <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />
                    ) : exercise.trend === "down" ? (
                      <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />
                    ) : (
                      <div className="w-5 h-5 mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all cursor-pointer group h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Adherence Rate</h3>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5 text-green-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              89%
            </motion.div>
            <p className="text-sm text-green-700 font-medium">↑ 5% this week</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all cursor-pointer group h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Avg Form Score</h3>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              85%
            </motion.div>
            <p className="text-sm text-blue-700 font-medium">AI Confidence: High</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all cursor-pointer group h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Pain Trend</h3>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingDown className="w-5 h-5 text-purple-600" />
              </motion.div>
            </div>
            <motion.div 
              className="text-4xl font-bold text-gray-900 mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              3.2/10
            </motion.div>
            <p className="text-sm text-purple-700 font-medium">↓ From 7/10 baseline</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function MessagesTab({ patient }: { patient: any }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Great work this week! Keep it up.", time: "2 hours ago", from: "therapist", read: true }
  ]);

  const quickMessages = [
    "How is your pain today?",
    "Great progress on your exercises!",
    "I noticed you missed yesterday's session",
    "Keep up the excellent work!",
    "Are you experiencing any discomfort?"
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setMessages([...messages, { 
        id: messages.length + 1, 
        text: message, 
        time: "Just now", 
        from: "therapist", 
        read: false 
      }]);
      setMessage("");
      setSending(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Messages</h3>
        <div className="space-y-2">
          {quickMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-white hover:border-blue-300 transition-all"
                onClick={() => setMessage(msg)}
              >
                {msg}
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold text-sm">PT</span>
                </motion.div>
                <div className="flex-1">
                  <div className="bg-blue-100 rounded-lg p-3 rounded-tl-none">
                    <p className="text-sm text-gray-900">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{msg.time}</p>
                    {msg.read && <CheckCircle className="w-3 h-3 text-blue-600" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="border-t pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleSend}
                disabled={!message.trim() || sending}
                className="px-6"
              >
                {sending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  <>Send</>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ReviewTab({ patient }: { patient: any }) {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [generatingSummary, setGeneratingSummary] = useState<number | null>(null);

  const recordedVideos = [
    {
      id: 1,
      exerciseName: "Squats",
      date: "2 days ago",
      duration: "2:34",
      thumbnail: "https://images.unsplash.com/photo-1517836357483-6eb0e8bb5d94?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 92,
      repsCompleted: 10,
      repsTarget: 10,
      aiSummary: "Excellent form demonstrated throughout the session. Patient maintained proper knee alignment, achieved full depth on all squats, and showed consistent control during descent and ascent. Core engagement was evident. Minor observation: slight forward lean on last 2 reps, likely due to fatigue. Overall performance indicates strong progress in lower body strength.",
      keyFindings: [
        "Maintained proper form for 10/10 reps",
        "Full range of motion achieved",
        "Good core stability throughout",
        "Minor fatigue in final reps"
      ],
      recommendations: [
        "Consider increasing rep count to 12 next session",
        "Maintain current form quality",
        "Continue with current exercise progression"
      ],
      reviewed: false
    },
    {
      id: 2,
      exerciseName: "Assisted Shoulder Flexion",
      date: "3 days ago",
      duration: "1:45",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 85,
      repsCompleted: 12,
      repsTarget: 12,
      aiSummary: "Patient showed good range of motion with shoulder flexion exercise. Movement was controlled and patient demonstrated understanding of proper form. Slight compensation noted on the right side with minimal scapular elevation. Overall adherence to prescribed reps was excellent. Shoulder mobility appears to be improving compared to previous sessions.",
      keyFindings: [
        "12/12 reps completed successfully",
        "Slight right-side compensation observed",
        "Good range of motion maintained",
        "Improvement in mobility noted"
      ],
      recommendations: [
        "Focus on symmetrical movement pattern",
        "Add scapular stabilization cues",
        "Continue current progression"
      ],
      reviewed: false
    },
    {
      id: 3,
      exerciseName: "Scaption Strengthening",
      date: "5 days ago",
      duration: "2:10",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      formScore: 78,
      repsCompleted: 10,
      repsTarget: 10,
      aiSummary: "Patient completed all prescribed reps but showed some form deviations. Scapular plane positioning was inconsistent, with tendency to elevate shoulders rather than lift in the proper 45-degree angle. Patient appeared to rush through movements in the second half of the session. Despite form concerns, patient completed full rep count showing good adherence.",
      keyFindings: [
        "10/10 reps completed",
        "Form quality decreased in second half",
        "Scapular elevation noted instead of proper scaption",
        "Speed increased toward end of set"
      ],
      recommendations: [
        "Provide form cues emphasizing 45-degree angle",
        "Consider reducing speed and focusing on control",
        "Add proprioceptive feedback for scapular position"
      ],
      reviewed: true
    },
  ];

  const exerciseLibrary = [
    { id: 1, name: "Squats", category: "Lower Body" },
    { id: 2, name: "Assisted Shoulder Flexion", category: "Upper Body" },
    { id: 3, name: "Scaption Strengthening", category: "Upper Body" },
    { id: 4, name: "Knee Extensions", category: "Lower Body" },
    { id: 5, name: "Hip Abductions", category: "Lower Body" },
    { id: 6, name: "Wall Angels", category: "Upper Body" },
    { id: 7, name: "Bridge", category: "Core" },
    { id: 8, name: "Plank", category: "Core" },
  ];

  const handleGenerateSummary = (videoId: number) => {
    setGeneratingSummary(videoId);
    setTimeout(() => {
      setGeneratingSummary(null);
    }, 1500);
  };

  const handleAssignExercises = () => {
    if (selectedExercises.length === 0) {
      alert("Please select at least one exercise");
      return;
    }
    alert(`Successfully assigned ${selectedExercises.length} exercise(s) for next week!`);
    setShowAssignForm(false);
    setSelectedExercises([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Video Review & Exercise Assignment</h2>
          <p className="text-sm text-gray-600 mt-1">
            Review patient exercise videos with AI summaries and assign exercises for next week
          </p>
        </div>
        {!showAssignForm && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowAssignForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Assign Exercises for Next Week
            </Button>
          </motion.div>
        )}
      </div>

      {/* Exercise Assignment Form */}
      {showAssignForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Assign Exercises for Next Week</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAssignForm(false);
                  setSelectedExercises([]);
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Exercises
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {exerciseLibrary.map((exercise) => {
                    const isSelected = selectedExercises.includes(exercise.name);
                    return (
                      <motion.div
                        key={exercise.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className={`p-3 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white border-2 border-blue-700"
                              : "bg-white hover:border-blue-400"
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedExercises(prev => prev.filter(e => e !== exercise.name));
                            } else {
                              setSelectedExercises(prev => [...prev, exercise.name]);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected && <CheckCircle className="w-4 h-4" />}
                            <div>
                              <p className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-900"}`}>
                                {exercise.name}
                              </p>
                              <p className={`text-xs ${isSelected ? "text-blue-100" : "text-gray-600"}`}>
                                {exercise.category}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowAssignForm(false);
                      setSelectedExercises([]);
                    }}
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    onClick={handleAssignExercises}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Assign {selectedExercises.length} Exercise{selectedExercises.length !== 1 ? 's' : ''}
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Video Review Cards */}
      <div className="space-y-6">
        {recordedVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Video Section */}
                <div className="lg:col-span-1">
                  <div className="relative bg-black">
                    <HeroVideoDialog
                      animationStyle="from-center"
                      videoSrc={video.videoUrl}
                      thumbnailSrc={video.thumbnail}
                      thumbnailAlt={video.exerciseName}
                      className="w-full aspect-video"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1.5 ${getScoreColor(video.formScore)} text-white text-sm font-bold rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1`}>
                      {video.formScore >= 90 && <CheckCircle className="w-4 h-4" />}
                      {video.formScore < 70 && <AlertCircle className="w-4 h-4" />}
                      {video.formScore}%
                    </div>
                    {video.reviewed && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded shadow-lg">
                        Reviewed
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{video.exerciseName}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {video.date} • {video.duration}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Reps:</span>
                        <span className={`font-semibold ${video.repsCompleted === video.repsTarget ? 'text-green-600' : 'text-amber-600'}`}>
                          {video.repsCompleted}/{video.repsTarget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Summary Section */}
                <div className="lg:col-span-2 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-lg text-gray-900">AI Summary</h4>
                    {generatingSummary === video.id && (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    )}
                  </div>

                  {/* Summary Content */}
                  <div className="space-y-4 mb-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{video.aiSummary}</p>
                    </div>

                    {/* Key Findings */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Key Findings
                      </h5>
                      <ul className="space-y-1 ml-6">
                        {video.keyFindings.map((finding, fIdx) => (
                          <li key={fIdx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        Recommendations
                      </h5>
                      <ul className="space-y-1 ml-6">
                        {video.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedVideo(video);
                          setShowAssignForm(true);
                        }}
                      >
                        <Dumbbell className="w-4 h-4 mr-2" />
                        Assign Exercises
                      </Button>
                    </motion.div>
                    {!video.reviewed && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            video.reviewed = true;
                            alert(`Marked ${video.exerciseName} as reviewed!`);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Reviewed
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">{recordedVideos.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg Form Score</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(recordedVideos.reduce((acc, v) => acc + v.formScore, 0) / recordedVideos.length)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Reviewed</p>
            <p className="text-2xl font-bold text-green-600">
              {recordedVideos.filter(v => v.reviewed).length}/{recordedVideos.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((recordedVideos.filter(v => v.repsCompleted === v.repsTarget).length / recordedVideos.length) * 100)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function NotesTab({ patient }: { patient: any }) {
  const [sessionType, setSessionType] = useState("follow-up");
  const [subjective, setSubjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: 1,
      type: "Follow-up Session",
      date: "Jan 20, 2024",
      content: "Patient reports improvement in range of motion. Pain levels decreased from 5/10 to 3/10. Adherence to exercise program has been excellent at 95%."
    },
    {
      id: 2,
      type: "Progress Review",
      date: "Jan 15, 2024",
      content: "Initial assessment completed. Patient demonstrates good understanding of exercises. Form quality improving. Recommended progression to Phase 2."
    },
    {
      id: 3,
      type: "Follow-up Session",
      date: "Jan 10, 2024",
      content: "Patient experiencing some discomfort during shoulder flexion. Modified exercise intensity. Will monitor closely."
    },
  ]);

  const handleSave = () => {
    if (!subjective.trim() || !assessment.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setNotes([{
        id: notes.length + 1,
        type: sessionType.charAt(0).toUpperCase() + sessionType.slice(1),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        content: `${subjective}\n\nAssessment: ${assessment}`
      }, ...notes]);
      setSubjective("");
      setAssessment("");
      setSaving(false);
      alert("Note saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-br from-white to-blue-50/30">
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Note</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Session Type</label>
              <select 
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="follow-up">Follow-up</option>
                <option value="progress-review">Progress Review</option>
                <option value="initial-assessment">Initial Assessment</option>
                <option value="discharge">Discharge</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Subjective</label>
              <textarea 
                value={subjective}
                onChange={(e) => setSubjective(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Patient's reported concerns..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Assessment</label>
              <textarea 
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Clinical assessment..." 
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleSave}
                disabled={saving || !subjective.trim() || !assessment.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" /> Save Note</>
                )}
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Previous Notes</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {notes.map((note, idx) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{note.type}</span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {note.content}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="link" size="sm" className="mt-2 -ml-2">
                      Expand
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

