"use client";
import { motion } from "framer-motion";
import { Users, MessageCircle, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CommunityScreenProps {
  onBack: () => void;
}

export function CommunityScreen({ onBack }: CommunityScreenProps) {
  const communityGroups = [
    { name: "Beginners Club", members: 125, color: "bg-blue-500" },
    { name: "Walkers & Talkers", members: 89, color: "bg-green-500" },
    { name: "Yoga Friends", members: 67, color: "bg-purple-500" },
  ];

  const recentPosts = [
    { author: "Mary", message: "Just finished my morning stretches! 🌅", time: "2 hours ago" },
    { author: "Bob", message: "Keep going everyone! 💪", time: "5 hours ago" },
    { author: "Alice", message: "Great workout today!", time: "1 day ago" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Community</h1>
        <p className="text-lg text-gray-600">Connect with others</p>
      </div>

      {/* Groups */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Groups</h2>
        <div className="space-y-3">
          {communityGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 bg-white border-2 border-gray-200 hover:border-green-400 cursor-pointer transition-all">
                <div className="flex items-center gap-4">
                  <div className={`${group.color} p-4 rounded-2xl`}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {group.name}
                    </h3>
                    <p className="text-base text-gray-600">
                      {group.members} members
                    </p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Join
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + communityGroups.length) * 0.1 }}
            >
              <Card className="p-5 bg-white border-2 border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {post.author}
                    </h4>
                    <p className="text-base text-gray-700 mb-1">
                      {post.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {post.time}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-6 mb-4">
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🏆</div>
            <h3 className="text-2xl font-bold text-gray-900">Weekly Leaderboard</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">1. Mary</span>
              <span className="text-xl font-bold text-yellow-700">⭐ 15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">2. Bob</span>
              <span className="text-xl font-bold text-gray-600">⭐ 12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">3. You</span>
              <span className="text-xl font-bold text-orange-700">⭐ 8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

