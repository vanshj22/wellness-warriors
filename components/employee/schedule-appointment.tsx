"use client";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ScheduleAppointmentProps {
  onBack: () => void;
  onScheduleComplete: () => void;
}

export function ScheduleAppointment({ onBack, onScheduleComplete }: ScheduleAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [appointmentType, setAppointmentType] = useState<string>("follow-up");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPatientSelector, setShowPatientSelector] = useState(false);

  const patients = [
    { id: 1, name: "Sarah Chen", phone: "+1 234-567-8900" },
    { id: 2, name: "Michael Johnson", phone: "+1 234-567-8901" },
    { id: 3, name: "Emily Rodriguez", phone: "+1 234-567-8902" },
    { id: 4, name: "David Kim", phone: "+1 234-567-8903" },
    { id: 5, name: "Jessica Martinez", phone: "+1 234-567-8904" },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const appointmentTypes = [
    { id: "initial", label: "Initial Assessment" },
    { id: "follow-up", label: "Follow-up Session" },
    { id: "progress", label: "Progress Review" },
    { id: "discharge", label: "Discharge Session" },
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !selectedPatient) {
      alert("Please fill in all required fields");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      alert(`Appointment scheduled successfully!\n\nPatient: ${selectedPatient.name}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTime}`);
      onScheduleComplete();
      setSaving(false);
    }, 1000);
  };

  const dates = generateDates();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4 sticky top-[72px] z-30">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>
        <h1 className="text-2xl font-bold">Schedule Appointment</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Patient Selection */}
          <Card className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Patient *</label>
            {selectedPatient ? (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedPatient.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPatient.name}</p>
                    <p className="text-sm text-gray-600">{selectedPatient.phone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-14 justify-start"
                onClick={() => setShowPatientSelector(!showPatientSelector)}
              >
                <Plus className="w-5 h-5 mr-3" />
                Select Patient
              </Button>
            )}

            <AnimatePresence>
              {showPatientSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 space-y-2"
                >
                  {patients.map((patient) => (
                    <motion.div
                      key={patient.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowPatientSelector(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold">
                              {patient.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.phone}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Appointment Type */}
          <Card className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Appointment Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {appointmentTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAppointmentType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    appointmentType === type.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-sm text-gray-900">{type.label}</p>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Date Selection */}
          <Card className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date *</label>
            <div className="grid grid-cols-7 gap-2">
              {dates.map((date, idx) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : isToday
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-xs text-center mb-1">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-lg font-bold">
                      {date.getDate()}
                    </div>
                    <div className="text-xs text-center">
                      {date.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Card>

          {/* Time Selection */}
          <Card className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time *</label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedTime === time
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  {time}
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or instructions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={onBack}
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={handleSchedule}
                disabled={saving || !selectedDate || !selectedTime || !selectedPatient}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Appointment
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

