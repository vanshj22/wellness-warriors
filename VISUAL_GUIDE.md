# Visual Guide - What to Expect

This guide shows you what the pose detection looks like in action.

## 1. Starting the Application

### Terminal 1 - Backend
```
$ python main.py
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```
✅ **Look for:** "Uvicorn running on http://0.0.0.0:8000"

### Terminal 2 - Frontend
```
$ npm run dev
  ▲ Next.js 16.0.1 (Turbopack)
  - Local:        http://localhost:3000
  - Network:      http://10.x.x.x:3000

✓ Starting...
✓ Ready in 2.1s
```
✅ **Look for:** "Ready in X.Xs"

## 2. Home Screen

```
┌─────────────────────────────┐
│  📱 Phone Frame              │
│  ┌─────────────────────────┐│
│  │ Wellness Warriors       ││
│  │ Stay active, healthy!   ││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 🆘 Need Help?       │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 🔊 Narrate          │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 📹 My Exercises     │││
│  │ │ Record & review     │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 📅 My Plan          │││
│  │ │ See schedule        │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 👥 My Community     │││
│  │ │ Meet others         │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ [Home] [Help] [Profile] ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

## 3. Recording Screen (Before Pose Detection)

```
┌─────────────────────────────┐
│  📱 Phone Frame              │
│  ┌─────────────────────────┐│
│  │ ← Back    🔵💪  🔊     ││
│  │                         ││
│  │  ┌───────────────────┐ ││
│  │  │                   │ ││
│  │  │   📷 Camera Feed  │ ││
│  │  │                   │ ││
│  │  │   (Your Video)    │ ││
│  │  │                   │ ││
│  │  │                   │ ││
│  │  └───────────────────┘ ││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 📹 Start Recording  │││
│  │ └─────────────────────┘││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

**Key Elements:**
- `← Back` - Return to exercises
- `🔵💪` - Activity button (BLUE = pose detection ON)
- `🔊` - Narrate button

## 4. Get Ready Popup

```
┌─────────────────────────────┐
│  📱 Phone Frame              │
│  ┌─────────────────────────┐│
│  │    [Dimmed Background]  ││
│  │                         ││
│  │  ┌───────────────────┐ ││
│  │  │      📋           │ ││
│  │  │   Get Ready!      │ ││
│  │  │                   │ ││
│  │  │ Stand in frame.   │ ││
│  │  │ Make sure whole   │ ││
│  │  │ body is visible.  │ ││
│  │  │                   │ ││
│  │  │ ┌───────────────┐│ ││
│  │  │ │💪 AI Pose     ││ ││
│  │  │ │ Detection     ││ ││
│  │  │ │ Real-time     ││ ││
│  │  │ │ feedback will ││ ││
│  │  │ │ appear        ││ ││
│  │  │ └───────────────┘│ ││
│  │  │                   │ ││
│  │  │ ┌───────────────┐│ ││
│  │  │ │   Got It!     ││ ││
│  │  │ └───────────────┘│ ││
│  │  └───────────────────┘ ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

## 5. Recording Screen WITH Pose Detection

```
┌─────────────────────────────┐
│  📱 Phone Frame              │
│  ┌─────────────────────────┐│
│  │ ← Back    🔵💪  🔊     ││
│  │                         ││
│  │ ⚠️ Connecting...       ││  ← Connection status
│  │                         ││
│  │  ┌───────────────────┐ ││
│  │  │     ●  ●          │ ││  ← Shoulders
│  │  │      \│/          │ ││  ← Skeleton
│  │  │       ●           │ ││  ← Hip
│  │  │      / \          │ ││  ← Legs
│  │  │     ●   ●         │ ││  ← Knees
│  │  │     │   │         │ ││
│  │  │     ●   ●         │ ││  ← Ankles
│  │  └───────────────────┘ ││
│  │                         ││
│  │ ┌─────────────────────┐││  ← Feedback Panel
│  │ │ 💪 Live Feedback    │││
│  │ │                     │││
│  │ │ ✅ Perfect depth!   │││  ← Good (green)
│  │ │ ✅ Good alignment   │││  ← Good (green)
│  │ │ ⚠️ Keep chest up    │││  ← Warning (yellow)
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 📹 Start Recording  │││
│  │ └─────────────────────┘││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

**What You See:**
1. **Skeleton Overlay** - Dots and lines on your body
2. **Live Feedback Panel** - Real-time messages
3. **Connection Status** - "Connecting..." or connected
4. **Blue Activity Button** - Pose detection is ON

## 6. During Recording

```
┌─────────────────────────────┐
│  📱 Phone Frame              │
│  ┌─────────────────────────┐│
│  │ ← Back    🔵💪  🔊     ││
│  │                         ││
│  │          🔴 Recording...││  ← Recording indicator
│  │                         ││
│  │  ┌───────────────────┐ ││
│  │  │   [Your Video     │ ││
│  │  │    with Skeleton  │ ││
│  │  │    Overlay]       │ ││
│  │  │                   │ ││
│  │  │   Doing Squat...  │ ││
│  │  └───────────────────┘ ││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ 💪 Live Feedback    │││
│  │ │                     │││
│  │ │ ✅ Great posture!   │││
│  │ │ ✅ Perfect depth!   │││
│  │ │ ✅ Good alignment   │││
│  │ └─────────────────────┘││
│  │                         ││
│  │ ┌─────────────────────┐││
│  │ │ ⏹️ Stop Recording   │││
│  │ └─────────────────────┘││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

## 7. Feedback Types

### ✅ Good (Green Background)
```
┌─────────────────────────┐
│ ✅ Perfect squat depth! │  ← Everything correct
│ ✅ Good knee alignment  │
│ ✅ Great posture!       │
└─────────────────────────┘
```

### ⚠️ Warning (Yellow Background)
```
┌─────────────────────────┐
│ ⚠️ Go deeper!           │  ← Needs improvement
│ ⚠️ Keep chest upright   │
│ ⚠️ Knees past toes      │
└─────────────────────────┘
```

### ❌ Error (Red Background)
```
┌─────────────────────────┐
│ ❌ Keep knees aligned!  │  ← Incorrect form
│ ❌ Back too bent        │
│ ❌ Too deep - risky     │
└─────────────────────────┘
```

### ℹ️ Neutral (Blue Background)
```
┌─────────────────────────┐
│ ℹ️ Standing position    │  ← Informational
│ ℹ️ Ready to squat       │
│ ℹ️ Position yourself    │
└─────────────────────────┘
```

## 8. Skeleton Overlay Detail

```
        ●  ●           ← Shoulders (landmark points)
         \│/
          ●            ← Spine
         /│\
        ● ● ●          ← Hips
        │   │
        ●   ●          ← Knees
        │   │
        ●   ●          ← Ankles
```

**Colors:**
- **Pink/Magenta** - Connection lines
- **Orange** - Joint points
- **White** - Guide overlay (dashed)

## 9. Connection States

### Disconnected
```
┌─────────────────────────┐
│ ❌ Connection error -   │
│    is backend running?  │
└─────────────────────────┘
```
**Fix:** Start Python backend

### Connecting
```
┌─────────────────────────┐
│ ⚠️ Connecting to pose   │
│    detection...         │
└─────────────────────────┘
```
**Wait:** Backend is starting up

### Connected
```
[No status message]
[Feedback panel appears]
```
**Ready:** Pose detection working!

## 10. Toggle Pose Detection

### ON (Blue Button)
```
┌─────────────────────────┐
│ ← Back    🔵💪  🔊     │  ← Blue = ON
│                         │
│ [Skeleton visible]      │
│ [Feedback panel shows]  │
└─────────────────────────┘
```

### OFF (Gray Button)
```
┌─────────────────────────┐
│ ← Back    ⚪💪  🔊     │  ← Gray = OFF
│                         │
│ [No skeleton]           │
│ [No feedback panel]     │
└─────────────────────────┘
```

## 11. Squat Sequence

### Standing
```
Feedback: "Standing position - ready to squat"
Knee Angle: 170°
```

### Quarter Squat
```
Feedback: "Go deeper! Squat to at least 90 degrees"
Knee Angle: 130°
```

### Proper Squat
```
Feedback: "Perfect squat depth! ✓"
Knee Angle: 90°
```

### Too Deep
```
Feedback: "Too deep - risk of injury"
Knee Angle: 70°
```

## 12. Common Issues Visual

### ❌ Body Not Visible
```
┌─────────────────────────┐
│  [Only upper body]      │
│                         │
│  ⚠️ No pose detected   │
│     Make sure whole    │
│     body is visible    │
└─────────────────────────┘
```
**Fix:** Step back from camera

### ❌ Poor Lighting
```
┌─────────────────────────┐
│  [Dark/shadowy video]   │
│                         │
│  ⚠️ Pose detection     │
│     unreliable         │
└─────────────────────────┘
```
**Fix:** Turn on lights, face window

### ✅ Perfect Setup
```
┌─────────────────────────┐
│  [Clear full body]      │
│  [Good lighting]        │
│  [Skeleton visible]     │
│                         │
│  ✅ All systems go!    │
└─────────────────────────┘
```

## 13. Browser Console (F12)

### Good Connection
```
WebSocket connected
✓ Frame sent
✓ Feedback received
```

### Connection Issues
```
WebSocket error
❌ Failed to connect
Attempting to reconnect...
```

## Tips for Best Results

### Camera Position
```
     [Camera]
        │
        │ 6-8 feet
        │
        ▼
     [You]
```
- Chest height
- 6-8 feet away
- Centered

### Lighting
```
  💡              💡
    \            /
     \          /
      \        /
       \      /
        [You]
```
- Face light sources
- Avoid backlighting
- Bright room

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
- Whole body in frame
- Face camera
- Stand centered

## What Success Looks Like

✅ **Backend terminal:** "WebSocket connection established"
✅ **Frontend:** Blue Activity button
✅ **Video:** Skeleton overlay visible
✅ **Feedback:** Messages updating in real-time
✅ **Smooth:** No lag or freezing
✅ **Accurate:** Feedback matches your form

## What Problems Look Like

❌ **Backend terminal:** No "WebSocket connection" message
❌ **Frontend:** Yellow "Connecting..." stays visible
❌ **Video:** No skeleton overlay
❌ **Feedback:** No messages or "No pose detected"
❌ **Laggy:** Video freezes or stutters
❌ **Inaccurate:** Feedback doesn't match your form

---

**Ready to try it?** Follow the QUICKSTART.md guide!

