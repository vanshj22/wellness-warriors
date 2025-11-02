"use client";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface DayData {
  date: string;
  pain: number; // 0-10 scale
  reps: number;
}

interface ProgressGraphProps {
  onClick?: () => void;
  showDetail?: boolean;
}

export function ProgressGraph({ onClick, showDetail = false }: ProgressGraphProps) {
  const [weekData, setWeekData] = useState<DayData[]>([]);

  useEffect(() => {
    // Get or initialize week data
    const savedData = localStorage.getItem('progressData');
    let data: DayData[];
    
    if (savedData) {
      data = JSON.parse(savedData);
    } else {
      // Initialize with sample data for the past 7 days
      data = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          pain: Math.floor(Math.random() * 6) + 2, // 2-7 pain level
          reps: Math.floor(Math.random() * 30) + 10, // 10-40 reps
        });
      }
      localStorage.setItem('progressData', JSON.stringify(data));
    }
    
    setWeekData(data);
  }, []);

  // Get data for current week
  const getWeekData = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6); // Last 7 days
    
    return weekData.filter(d => {
      const date = new Date(d.date);
      return date >= weekStart && date <= today;
    }).sort((a, b) => a.date.localeCompare(b.date));
  };

  const week = getWeekData();
  const maxReps = Math.max(...week.map(d => d.reps), 1);
  const maxPain = 10;

  // Get day labels
  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Calculate averages
  const avgPain = week.length > 0 ? (week.reduce((sum, d) => sum + d.pain, 0) / week.length).toFixed(1) : '0';
  const avgReps = week.length > 0 ? Math.round(week.reduce((sum, d) => sum + d.reps, 0) / week.length) : 0;
  const totalReps = week.reduce((sum, d) => sum + d.reps, 0);

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        p: showDetail ? 3 : 2.5,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        '&:hover': onClick ? {
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          borderColor: '#d0d0d0',
        } : {
          // No hover effect when not clickable
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: showDetail ? 3 : 2 }}>
        <Typography
          variant={showDetail ? 'h6' : 'subtitle1'}
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
          }}
        >
          Your Progress
        </Typography>
      </Box>

      {/* Stats - Only show on detail view */}
      {showDetail && (
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem' }}>
              Avg Pain
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              {avgPain}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem' }}>
              Total Reps
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              {totalReps}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem' }}>
              Avg Reps
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              {avgReps}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Graph */}
      <Box sx={{ position: 'relative', height: showDetail ? 200 : 120 }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
            <line
              key={`grid-${i}`}
              x1="0%"
              y1={`${y * 100}%`}
              x2="100%"
              y2={`${y * 100}%`}
              stroke="#f0f0f0"
              strokeWidth={1}
            />
          ))}

          {/* Pain line (red) */}
          {week.map((day, index) => {
            const x = (index / Math.max(week.length - 1, 1)) * 100;
            const painY = (1 - day.pain / maxPain) * 100;
            const nextDay = week[index + 1];
            
            if (nextDay) {
              const nextX = ((index + 1) / Math.max(week.length - 1, 1)) * 100;
              const nextPainY = (1 - nextDay.pain / maxPain) * 100;
              return (
                <line
                  key={`pain-line-${index}`}
                  x1={`${x}%`}
                  y1={`${painY}%`}
                  x2={`${nextX}%`}
                  y2={`${nextPainY}%`}
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="none"
                />
              );
            }
            return null;
          })}

          {/* Reps line (blue) */}
          {week.map((day, index) => {
            const x = (index / Math.max(week.length - 1, 1)) * 100;
            const repsY = (1 - day.reps / maxReps) * 100;
            const nextDay = week[index + 1];
            
            if (nextDay) {
              const nextX = ((index + 1) / Math.max(week.length - 1, 1)) * 100;
              const nextRepsY = (1 - nextDay.reps / maxReps) * 100;
              return (
                <line
                  key={`reps-line-${index}`}
                  x1={`${x}%`}
                  y1={`${repsY}%`}
                  x2={`${nextX}%`}
                  y2={`${nextRepsY}%`}
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="none"
                />
              );
            }
            return null;
          })}

          {/* Data points */}
          {week.map((day, index) => {
            const x = (index / Math.max(week.length - 1, 1)) * 100;
            const painY = (1 - day.pain / maxPain) * 100;
            const repsY = (1 - day.reps / maxReps) * 100;
            
            return (
              <g key={`points-${index}`}>
                <circle
                  cx={`${x}%`}
                  cy={`${painY}%`}
                  r={4}
                  fill="#ef4444"
                />
                <circle
                  cx={`${x}%`}
                  cy={`${repsY}%`}
                  r={4}
                  fill="#2563eb"
                />
              </g>
            );
          })}
        </svg>

        {/* Y-axis labels (left) */}
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pr: 1 }}>
          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#999999' }}>
            {maxPain}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#999999' }}>
            0
          </Typography>
        </Box>
      </Box>

      {/* X-axis labels */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, px: 0.5 }}>
        {week.map((day, index) => (
          <Typography
            key={`label-${index}`}
            variant="caption"
            sx={{ fontSize: '0.7rem', color: '#666666' }}
          >
            {getDayLabel(day.date)}
          </Typography>
        ))}
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 2, backgroundColor: '#ef4444' }} />
          <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666666' }}>
            Pain (0-10)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 2, backgroundColor: '#2563eb' }} />
          <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666666' }}>
            Reps
          </Typography>
        </Box>
      </Box>

      {showDetail && (
        <>
          {/* Trends Analysis */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
              Week Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem' }}>
                  Pain Trend
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                  {parseFloat(week[week.length - 1]?.pain || '0') < parseFloat(week[0]?.pain || '0') 
                    ? '↓ Decreasing' 
                    : parseFloat(week[week.length - 1]?.pain || '0') > parseFloat(week[0]?.pain || '0')
                    ? '↑ Increasing'
                    : '→ Stable'}
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem' }}>
                  Reps Trend
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 0.5 }}>
                  {week[week.length - 1]?.reps > week[0]?.reps 
                    ? '↑ Improving' 
                    : week[week.length - 1]?.reps < week[0]?.reps
                    ? '↓ Decreasing'
                    : '→ Stable'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Daily Breakdown */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
              Daily Breakdown
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {week.map((day, index) => {
                const dayDate = new Date(day.date);
                const isToday = dayDate.toDateString() === new Date().toDateString();
                return (
                  <Box
                    key={`detail-${index}`}
                    sx={{
                      p: 2,
                      backgroundColor: isToday ? '#f0f7ff' : '#ffffff',
                      border: isToday ? '1px solid #2563eb' : '1px solid #e0e0e0',
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                        {dayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </Typography>
                      {isToday && (
                        <Typography variant="caption" sx={{ color: '#2563eb', fontSize: '0.65rem' }}>
                          Today
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem', display: 'block' }}>
                            Pain
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {day.pain}/10
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#2563eb' }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.7rem', display: 'block' }}>
                            Reps
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {day.reps}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Additional Insights */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
              Insights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ p: 2, backgroundColor: '#fff7ed', borderRadius: 2, border: '1px solid #fed7aa' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#9a3412', mb: 0.5 }}>
                  Best Day
                </Typography>
                <Typography variant="body2" sx={{ color: '#7c2d12' }}>
                  {week.reduce((best, day) => day.reps > best.reps ? day : best, week[0]) && 
                    `${new Date(week.reduce((best, day) => day.reps > best.reps ? day : best, week[0]).date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${week.reduce((best, day) => day.reps > best.reps ? day : best, week[0]).reps} reps`}
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#166534', mb: 0.5 }}>
                  Lowest Pain Day
                </Typography>
                <Typography variant="body2" sx={{ color: '#14532d' }}>
                  {week.reduce((best, day) => day.pain < best.pain ? day : best, week[0]) && 
                    `${new Date(week.reduce((best, day) => day.pain < best.pain ? day : best, week[0]).date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - Pain level ${week.reduce((best, day) => day.pain < best.pain ? day : best, week[0]).pain}/10`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
