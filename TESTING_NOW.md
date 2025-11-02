# Testing Guide

> **Quick reference for testing Wellness Warriors during development**

---

## Current Status

### ✅ What's Running

- ✅ **Backend Server**: `http://localhost:8000`
- ✅ **Frontend Server**: `http://localhost:3000`
- ✅ **WebSocket**: Connected
- ✅ **Services**: All operational

---

## Access the Application

**Open your browser and navigate to:**
```
http://localhost:3000
```

---

## Testing Checklist

### Initial Setup

- [ ] Application loads without errors
- [ ] Welcome screen displays correctly
- [ ] Can navigate through tutorial
- [ ] Home screen appears after tutorial/skip

### Camera Access

- [ ] Camera permission prompt appears
- [ ] Camera activates when permission granted
- [ ] Video feed displays clearly
- [ ] No lag or stuttering in video

### Pose Detection

- [ ] Activity button visible (top right)
- [ ] Activity button turns blue when enabled
- [ ] "Connecting..." message disappears
- [ ] WebSocket connection established (check console)
- [ ] Skeleton overlay appears when body visible
- [ ] Feedback panel appears (right side)

### Exercise Testing

#### Squat Test

- [ ] Stand 6-8 feet from camera
- [ ] Whole body visible in frame
- [ ] Skeleton overlay tracks body accurately
- [ ] Feedback messages appear during squat
- [ ] Voice feedback speaks corrections
- [ ] Rep counter increments on completion

**Expected Feedback:**
- ✅ "Perfect squat depth!" (when depth is good)
- ✅ "Good knee alignment" (when alignment correct)
- ⚠️ "Go deeper!" (if not deep enough)
- ❌ "Keep knees aligned!" (if alignment off)

#### Push-up Test

- [ ] Position for push-up (horizontal)
- [ ] System detects push-up position
- [ ] Feedback appears for push-up form
- [ ] Depth feedback works correctly

### Voice Feedback

- [ ] Voice feedback speaks errors automatically
- [ ] Voice feedback speaks warnings
- [ ] No excessive repetition (throttled correctly)
- [ ] Clear and understandable speech
- [ ] Different pitch for errors vs warnings

### Recording

- [ ] "Start Recording" button works
- [ ] Countdown appears (3, 2, 1)
- [ ] Recording indicator shows (red dot)
- [ ] Can stop recording manually
- [ ] Auto-stops after 60 seconds
- [ ] Preview appears after recording
- [ ] Can retake recording
- [ ] Can save recording

### UI Components

- [ ] All buttons are clickable
- [ ] Navigation works (back buttons)
- [ ] Text is readable
- [ ] Colors are appropriate
- [ ] Animations are smooth
- [ ] Responsive on different screen sizes

---

## Quick Test Procedure

### Step 1: Navigate to Exercises

1. Complete or skip welcome tutorial
2. On home screen, click **"My Exercises"**

### Step 2: Start Recording

1. Click **"Start Recording"** button
2. Grant camera permission when prompted
3. Click **"Got It!"** on "Get Ready!" popup

### Step 3: Verify Pose Detection

1. **Activity button** should be blue (top right)
2. Position yourself 6-8 feet from camera
3. Ensure whole body is visible
4. Wait for skeleton overlay to appear

### Step 4: Test Exercise

1. Perform a squat:
   - Stand with feet shoulder-width apart
   - Lower down into squat position
   - Return to standing

2. **Expected Results:**
   - Skeleton overlay tracks movement
   - Feedback messages appear (right panel)
   - Voice feedback speaks corrections
   - Rep counter increments

### Step 5: Verify Feedback

**What You Should See:**
- ✅ Green messages for good form
- ⚠️ Yellow messages for warnings
- ❌ Red messages for errors
- 🔵 Blue messages for neutral info

**What You Should Hear:**
- Voice speaking error messages
- Voice speaking warning messages
- Appropriate pauses between feedback

---

## What Success Looks Like

### ✅ Backend Terminal

```
INFO:     Uvicorn running on http://0.0.0.0:8000
WebSocket connection established: 123456789
```

### ✅ Frontend Terminal

```
✓ Ready in 2.1s
```

### ✅ Browser Console (F12)

```
WebSocket connected
✓ Frame sent
✓ Feedback received
```

### ✅ Application

- Blue Activity button (pose detection ON)
- Skeleton overlay visible on body
- Feedback panel showing messages
- Voice feedback working
- Rep counter displaying

---

## What Problems Look Like

### ❌ Backend Issues

**No "WebSocket connection" message:**
- Connection not established
- Check frontend WebSocket URL
- Verify backend is running

**Error messages in terminal:**
- Check Python version
- Verify dependencies installed
- Review error details

### ❌ Frontend Issues

**Yellow "Connecting..." persists:**
- Backend not reachable
- Check Terminal 1
- Verify port 8000

**Red error messages:**
- Check browser console (F12)
- Review error details
- Verify WebSocket connection

### ❌ Detection Issues

**"No pose detected":**
- Step back further (6-8 feet)
- Improve lighting
- Ensure whole body visible
- Check camera angle

**No skeleton overlay:**
- Pose detection may be off
- Check Activity button
- Verify WebSocket connection
- Check backend processing

---

## Browser Console Checks

**Open Console (F12) and look for:**

### Good Signs ✅

```
WebSocket connected
[WebSocket] Sending frames with exercise type: squat
Frame sent successfully
Feedback received: 3 messages
Rep count updated: 0 -> 1
```

### Problem Signs ❌

```
WebSocket error
Failed to connect
Connection timeout
Failed to send frame
```

---

## Performance Checks

### Frame Rate

- Should capture ~15 frames per second
- Smooth video playback
- No stuttering or freezing

### Latency

- Feedback appears within 200-500ms
- Skeleton overlay updates smoothly
- Voice feedback doesn't lag

### CPU Usage

- Backend: 20-40% CPU typical
- Frontend: 5-15% CPU typical
- Total: Shouldn't max out system

---

## Camera Setup Tips

### Optimal Position

```
     [Camera]
        │
        │ 6-8 feet
        │
        ▼
     [You]
```

- Camera at chest height
- 6-8 feet distance
- Centered in frame

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
- Bright, even lighting

---

## Common Test Scenarios

### Scenario 1: Perfect Squat

**Actions:**
1. Stand in frame
2. Lower to proper depth (90° knee angle)
3. Keep knees aligned
4. Maintain upright posture

**Expected:**
- ✅ All green feedback messages
  - ✅ "Perfect squat depth!"
  - ✅ "Good knee alignment"
- ✅ Rep count increments

### Scenario 2: Shallow Squat

**Actions:**
1. Stand in frame
2. Lower only partway (140° knee angle)
3. Return to standing

**Expected:**
- ⚠️ Yellow warning message
- ⚠️ "Go deeper! Squat to at least 90 degrees"
- Voice feedback speaks warning

### Scenario 3: Knees Caving In

**Actions:**
1. Stand in frame
2. Lower into squat
3. Let knees cave inward

**Expected:**
- ❌ Red error message
- ❌ "Keep knees aligned with toes!"
- Voice feedback speaks error immediately

### Scenario 4: Poor Posture

**Actions:**
1. Stand in frame
2. Lower into squat
3. Lean too far forward

**Expected:**
- ⚠️ or ❌ Feedback on posture
- "Keep your chest up!"
- Voice feedback correction

---

## Debugging Tips

### Check Backend Logs

**Terminal 1 should show:**
- Connection messages
- Frame processing logs
- Rep count updates
- Any errors

### Check Frontend Logs

**Browser Console (F12) shows:**
- WebSocket connection status
- Frame sending confirmation
- Feedback reception
- JavaScript errors

### Test Backend Directly

```bash
cd backend
python test_backend.py
```

Should output:
```
✓ Pose detector created successfully
✓ Frame processing works
✓ Feedback received: X messages
✓ Detector closed successfully
✅ All tests passed!
```

---

## Next Steps After Testing

Once all tests pass:

1. ✅ **Document any issues** found
2. ✅ **Note performance** observations
3. ✅ **Record feedback** accuracy
4. ✅ **Test edge cases** (if time permits)
5. ✅ **Verify accessibility** features

---

## Need Help?

- **Setup Issues**: See [SETUP.md](./SETUP.md)
- **Troubleshooting**: See [FAQ.md](./FAQ.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Happy Testing!** 🧪

If you find issues, document them with:
- Steps to reproduce
- Expected vs actual behavior
- Error messages
- System information
