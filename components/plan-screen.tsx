"use client";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PlanScreenProps {
  onBack: () => void;
}

export function PlanScreen({ onBack }: PlanScreenProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Sample calendar data
  const calendarDays = [
    { day: "Mon", date: "1", hasExercise: true, exercise: "Morning Stretch" },
    { day: "Tue", date: "2", hasExercise: true, exercise: "Arm Circles" },
    { day: "Wed", date: "3", hasExercise: true, exercise: "Leg Raises" },
    { day: "Thu", date: "4", hasExercise: false },
    { day: "Fri", date: "5", hasExercise: true, exercise: "Deep Breathing" },
    { day: "Sat", date: "6", hasExercise: true, exercise: "Full Body Warm-up" },
    { day: "Sun", date: "7", hasExercise: false }
  ];

  const exercises = selectedDay 
    ? calendarDays.find(d => d.date === selectedDay)?.exercise
      ? [
          { name: "Warm-up", duration: "2 min", video: true },
          { name: calendarDays.find(d => d.date === selectedDay)?.exercise || "Main Exercise", duration: "5 min", video: true },
          { name: "Cool-down", duration: "2 min", video: true }
        ]
      : []
    : [];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Plan</h1>
        <p className="text-lg text-gray-600">Your exercise schedule</p>
      </div>

      {/* Calendar View */}
      <div className="px-6 mb-6">
        <Card className="p-4 bg-white border-2 border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">This Week</h2>
            <CalendarIcon className="w-8 h-8 text-purple-600" />
          </div>
          
          {/* Day tiles */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((item) => {
              const isSelected = selectedDay === item.date;
              return (
                <motion.button
                  key={item.date}
                  onClick={() => setSelectedDay(item.date)}
                  className={`
                    aspect-square rounded-xl border-2 transition-all
                    ${isSelected 
                      ? 'bg-purple-600 border-purple-600 text-white scale-110' 
                      : item.hasExercise
                        ? 'bg-purple-100 border-purple-300 text-purple-900 hover:scale-105'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-xs font-medium">{item.day}</span>
                    <span className="text-lg font-bold">{item.date}</span>
                    {item.hasExercise && (
                      <div className={`w-2 h-2 rounded-full mt-1 ${
                        isSelected ? 'bg-white' : 'bg-purple-600'
                      }`} />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Today's Exercises */}
      {selectedDay && exercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Exercises</h2>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <Card key={index} className="p-4 bg-white border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    {exercise.video && <Play className="w-6 h-6 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {exercise.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-base">{exercise.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* No exercises selected */}
      {selectedDay && exercises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center px-6"
        >
          <Card className="p-8 bg-gray-50 border-2 border-gray-200 text-center">
            <div className="text-6xl mb-4">😌</div>
            <p className="text-xl text-gray-600 font-medium">
              Rest day! No exercises scheduled.
            </p>
          </Card>
        </motion.div>
      )}

      {/* No day selected */}
      {!selectedDay && (
        <div className="flex-1 flex items-center justify-center px-6">
          <Card className="p-8 bg-purple-50 border-2 border-purple-200 text-center">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-xl text-gray-700 font-medium">
              Tap a day to see your exercises
            </p>
          </Card>
        </div>
      )}

      {/* Reminder Banner */}
      <div className="px-6 mb-4">
        <Card className="p-4 bg-orange-50 border-2 border-orange-300">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔔</div>
            <div>
              <p className="text-base text-orange-900 font-medium">
                You have 3 exercises scheduled this week
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

