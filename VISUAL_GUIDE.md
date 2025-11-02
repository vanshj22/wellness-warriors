# Visual Guide

> **Visual walkthrough of Wellness Warriors interface and features**

---

## Table of Contents

- [Terminal Output](#terminal-output)
- [Application Screens](#application-screens)
- [Feedback Types](#feedback-types)
- [Connection States](#connection-states)
- [Exercise Sequences](#exercise-sequences)
- [Setup Visualization](#setup-visualization)
- [Troubleshooting Visuals](#troubleshooting-visuals)

---

## Terminal Output

### Backend Server (Terminal 1)

**Successful Startup:**
```
$ python main.py
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**✅ Look for:** "Uvicorn running on http://0.0.0.0:8000"

**Connection Established:**
```
WebSocket connection established: 140234567890
```

### Frontend Server (Terminal 2)

**Successful Startup:**
```
$ npm run dev
  ▲ Next.js 16.0.1 (Turbopack)
  - Local:        http://localhost:3000
  - Network:      http://10.x.x.x:3000

✓ Starting...
✓ Ready in 2.1s
```

**✅ Look for:** "Ready in X.Xs"

---

## Application Screens

### Welcome Screen

```
┌─────────────────────────────────────────┐
│  📱 Wellness Warriors                   │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Welcome to Wellness Warriors!    │ │
│  │                                   │ │
│  │  This app helps you track your    │ │
│  │  exercises with AI-powered form   │ │
│  │  feedback.                        │ │
│  │                                   │ │
│  │  [Text Size: ●───────────○]      │ │
│  │                                   │ │
│  │           [Next →]                │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Key Elements:**
- Welcome message
- Text size slider
- Navigation buttons

### Home Screen

```
┌─────────────────────────────────────────┐
│  📱 Phone Frame                          │
│  ┌─────────────────────────────────────┐│
│  │ Wellness Warriors                    ││
│  │ Stay active, healthy!                ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 🆘 Need Help?                   │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 🔊 Narrate                      │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 📹 My Exercises                 │ ││
│  │ │ Record & review                 │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 📅 My Plan                      │ ││
│  │ │ See schedule                    │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 👥 My Community                 │ ││
│  │ │ Meet others                     │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ [Home] [Help] [Profile]             ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Navigation Options:**
- **📹 My Exercises**: Exercise recording
- **📅 My Plan**: Exercise schedule
- **👥 My Community**: Community features
- **🔊 Narrate**: Voice narration

### Recording Screen - Before Recording

```
┌─────────────────────────────────────────┐
│  📱 Phone Frame                          │
│  ┌─────────────────────────────────────┐│
│  │ ← Back    🔵💪  🔊                 ││
│  │                                      ││
│  │  ┌───────────────────────────────┐  ││
│  │  │                               │  ││
│  │  │      📷 Camera Feed           │  ││
│  │  │                               │  ││
│  │  │      (Your Live Video)        │  ││
│  │  │                               │  ││
│  │  │                               │  ││
│  │  └───────────────────────────────┘  ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 📹 Start Recording              │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Controls:**
- `← Back`: Return to exercises
- `🔵💪`: Activity button (blue = pose detection ON)
- `🔊`: Narrate button
- `📹 Start Recording`: Begin recording session

### Get Ready Popup

```
┌─────────────────────────────────────────┐
│  📱 Phone Frame                          │
│  ┌─────────────────────────────────────┐│
│  │    [Dimmed Background]              ││
│  │                                      ││
│  │  ┌───────────────────────────────┐  ││
│  │  │      📋                       │  ││
│  │  │   Get Ready!                  │  ││
│  │  │                               │  ││
│  │  │ Stand in the frame. Make sure │  ││
│  │  │ your whole body is visible.    │  ││
│  │  │ When ready, tap Start         │  ││
│  │  │ Recording.                    │  ││
│  │  │                               │  ││
│  │  │ ┌───────────────────────────┐ │  ││
│  │  │ │ 💪 AI Pose Detection      │ │  ││
│  │  │ │ Real-time feedback will    │ │  ││
│  │  │ │ appear on screen           │ │  ││
│  │  │ └───────────────────────────┘ │  ││
│  │  │                               │  ││
│  │  │ ┌───────────────────────────┐ │  ││
│  │  │ │      Got It!              │ │  ││
│  │  │ └───────────────────────────┘ │  ││
│  │  └───────────────────────────────┘  ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Recording Screen - With Pose Detection

```
┌─────────────────────────────────────────┐
│  📱 Phone Frame                          │
│  ┌─────────────────────────────────────┐│
│  │ ← Back    🔵💪  🔊                 ││
│  │                                      ││
│  │          🔴 Recording...            ││
│  │          📊 REPS: 3                 ││
│  │                                      ││
│  │  ┌───────────────────────────────┐  ││
│  │  │     ●  ●                     │  ││
│  │  │      \│/                     │  ││
│  │  │       ●                      │  ││
│  │  │      /│\                     │  ││
│  │  │     ● ● ●                    │  ││
│  │  │     │   │                     │  ││
│  │  │     ●   ●                    │  ││
│  │  │     │   │                     │  ││
│  │  │     ●   ●                    │  ││
│  │  └───────────────────────────────┘  ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 💪 Live Feedback                │ ││
│  │ │                                 │ ││
│  │ │ ✅ Perfect depth!               │ ││
│  │ │ ✅ Good alignment               │ ││
│  │ │ ⚠️ Keep chest up                │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ ⏹️ Stop Recording               │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Key Elements:**
- **Skeleton Overlay**: Dots and lines showing body pose
- **Live Feedback Panel**: Real-time form corrections
- **Rep Counter**: Current repetition count
- **Recording Indicator**: Red dot showing active recording

---

## Feedback Types

### Good Feedback (Green)

```
┌─────────────────────────────┐
│ ✅ Perfect squat depth!     │
│ ✅ Good knee alignment      │
│ ✅ Great posture!           │
└─────────────────────────────┘
```

**Meaning:** Form is correct, keep it up!

### Warning Feedback (Yellow)

```
┌─────────────────────────────┐
│ ⚠️ Go deeper!                │
│ ⚠️ Keep chest upright       │
│ ⚠️ Knees past toes          │
└─────────────────────────────┘
```

**Meaning:** Needs improvement, but not critical.

### Error Feedback (Red)

```
┌─────────────────────────────┐
│ ❌ Keep knees aligned!      │
│ ❌ Back too bent            │
│ ❌ Too deep - risky         │
└─────────────────────────────┘
```

**Meaning:** Incorrect form, immediate correction needed.

### Neutral Feedback (Blue)

```
┌─────────────────────────────┐
│ ℹ️ Standing position         │
│ ℹ️ Ready to squat           │
│ ℹ️ Position yourself         │
└─────────────────────────────┘
```

**Meaning:** Informational message.

---

## Connection States

### Disconnected State

```
┌─────────────────────────────┐
│ ❌ Connection error -        │
│    is backend running?      │
└─────────────────────────────┘
```

**Action:** Start Python backend server.

### Connecting State

```
┌─────────────────────────────┐
│ ⚠️ Connecting to pose       │
│    detection...             │
└─────────────────────────────┘
```

**Action:** Wait for connection to establish.

### Connected State

```
[No status message]
[Feedback panel appears]
[Activity button is blue]
```

**Status:** Ready for pose detection!

---

## Exercise Sequences

### Squat Sequence

#### Standing Position
```
Feedback: "Standing position - ready to squat"
Knee Angle: 170°
Posture: Upright
```
```
     ●  ●          ← Shoulders
      \│/
       ●           ← Hip
      /│\
     ●   ●         ← Knees
     │   │
     ●   ●         ← Ankles
```

#### Quarter Squat (Warning)
```
Feedback: "Go deeper! Squat to at least 90 degrees"
Knee Angle: 130°
Posture: Slight lean
```
```
     ●  ●
      \│/
       ●
      /│\
     ●   ●
    /│   │\
   ●       ●
```

#### Proper Squat (Good)
```
Feedback: "Perfect squat depth! ✓"
Knee Angle: 90°
Posture: Upright
```
```
     ●  ●
      \│/
       ●
      /│\
     ●   ●
    /│   │\
   ●       ●
```

#### Too Deep (Warning)
```
Feedback: "Too deep - risk of injury"
Knee Angle: 70°
Posture: Upright
```
```
     ●  ●
      \│/
       ●
      /│\
     ●   ●
    /│   │\
   ●       ●
```

### Push-up Sequence

#### Starting Position
```
Feedback: "Starting position - arms extended"
Elbow Angle: 160°
Body Alignment: Straight
```
```
●──────●         ← Shoulders
│      │
│      │
●──────●         ← Hips
│      │
│      │
●──────●         ← Feet
```

#### Shallow Push-up (Warning)
```
Feedback: "Go lower! Aim for 90 degrees"
Elbow Angle: 120°
Body Alignment: Straight
```
```
●──────●
│      │
│  ╱╲  │
●──────●
│      │
│      │
●──────●
```

#### Proper Push-up (Good)
```
Feedback: "Perfect depth! ✓"
Elbow Angle: 90°
Body Alignment: Straight
```
```
●──────●
│      │
│  ╱╲  │
●──────●
│      │
│      │
●──────●
```

---

## Setup Visualization

### Optimal Camera Position

```
     [Camera]
        │
        │ 6-8 feet
        │
        ▼
     [You]
    ●─────────●
     \       /
      \     /
       \   /
        ●
       /│\
      / │ \
     ●   ●
     │   │
     ●   ●
```

**Specifications:**
- Distance: 6-8 feet from camera
- Height: Camera at chest level
- Angle: Face camera directly
- Frame: Whole body visible

### Lighting Setup

```
  💡              💡
    \            /
     \          /
      \        /
       \      /
        [You]
```

**Requirements:**
- Face light sources
- Avoid backlighting
- Even lighting across body
- Bright, clear room

### Body Position

```
┌─────────────────┐
│  ●  ●           │  ← Head visible
│   \│/           │
│    ●            │  ← Torso visible
│   /│\           │
│  ● ● ●          │  ← Hips visible
│  │   │          │
│  ●   ●          │  ← Knees visible
│  │   │          │
│  ●   ●          │  ← Feet visible
└─────────────────┘
```

**Checklist:**
- ✅ Head to toes in frame
- ✅ Face camera directly
- ✅ Centered horizontally
- ✅ No body parts cut off

---

## Troubleshooting Visuals

### Problem: Body Not Visible

```
┌─────────────────────────┐
│  [Only upper body]       │
│                         │
│  ⚠️ No pose detected   │
│     Make sure whole     │
│     body is visible     │
└─────────────────────────┘
```

**Fix:** Step back from camera (6-8 feet).

### Problem: Poor Lighting

```
┌─────────────────────────┐
│  [Dark/shadowy video]   │
│                         │
│  ⚠️ Pose detection     │
│     unreliable          │
└─────────────────────────┘
```

**Fix:** Turn on lights, face window.

### Problem: Perfect Setup

```
┌─────────────────────────┐
│  [Clear full body]       │
│  [Good lighting]        │
│  [Skeleton visible]      │
│                         │
│  ✅ All systems go!    │
└─────────────────────────┘
```

**Status:** Optimal conditions for pose detection!

---

## Browser Console Visualization

### Good Connection

```
Console Output:
─────────────────────────────
WebSocket connected
✓ Frame sent
✓ Feedback received
Rep count: 1
─────────────────────────────
```

### Connection Issues

```
Console Output:
─────────────────────────────
WebSocket error
❌ Failed to connect
Attempting to reconnect...
─────────────────────────────
```

---

## Activity Button States

### ON State (Blue)

```
┌─────────────────────────┐
│ ← Back    🔵💪  🔊     │  ← Blue = ON
│                         │
│ [Skeleton visible]      │
│ [Feedback panel shows] │
└─────────────────────────┘
```

### OFF State (Gray)

```
┌─────────────────────────┐
│ ← Back    ⚪💪  🔊     │  ← Gray = OFF
│                         │
│ [No skeleton]           │
│ [No feedback panel]     │
└─────────────────────────┘
```

---

## Rep Counter Display

### During Exercise

```
┌─────────────────┐
│      REPS       │
│       3         │
└─────────────────┘
```

**Features:**
- Large, visible number
- Updates in real-time
- Color changes when reps complete
- Located top-right during recording

---

## Recording States

### Countdown (3, 2, 1)

```
┌─────────────────────────┐
│                         │
│           3             │
│                         │
│      Get ready...       │
│                         │
└─────────────────────────┘
```

### Recording Active

```
┌─────────────────────────┐
│          🔴             │
│      Recording...       │
└─────────────────────────┘
```

### Recording Complete

```
┌─────────────────────────┐
│        ✅               │
│    Video Recorded!      │
│                         │
│  [Record Again] [Save] │
└─────────────────────────┘
```

---

## Tips for Best Results

### Visual Checklist

✅ **Camera Position**
- Chest height
- 6-8 feet away
- Centered

✅ **Lighting**
- Face light source
- No backlighting
- Bright room

✅ **Body Position**
- Whole body visible
- Face camera
- Stand centered

✅ **Clothing**
- Fitted clothes
- Contrasting colors
- Comfortable for movement

---

**Ready to start?** Follow the [QUICKSTART.md](./QUICKSTART.md) guide!

**Need help?** Check [FAQ.md](./FAQ.md) for answers to common questions.
