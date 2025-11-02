# Quick Start Guide

> **Get Wellness Warriors up and running in 5 minutes** 🚀

---

## Prerequisites Check

Before starting, verify you have the required software installed:

- [ ] **Python 3.8+** ([Download](https://www.python.org/downloads/))
- [ ] **Node.js 18+** ([Download](https://nodejs.org/))
- [ ] **Webcam** (built-in or USB)
- [ ] **Two terminal windows** available

**Check your versions:**
```bash
python --version  # Should be 3.8.0 or higher
node --version    # Should be 18.0.0 or higher
```

---

## Installation (One-Time Setup)

### Step 1: Install Backend Dependencies

Open **Terminal 1** and run:

```bash
cd wellness-warriors/backend
pip install -r requirements.txt
```

⏱️ **Time:** Approximately 3-5 minutes (MediaPipe is a large package)

**What's being installed:**
- FastAPI (WebSocket server)
- MediaPipe (pose detection)
- OpenCV (image processing)
- NumPy (mathematical calculations)

### Step 2: Install Frontend Dependencies

Open **Terminal 2** and run:

```bash
cd wellness-warriors
npm install
```

⏱️ **Time:** Approximately 2-3 minutes

**What's being installed:**
- Next.js 16 (React framework)
- React 19
- TypeScript
- Tailwind CSS
- Other UI dependencies

---

## Running the Application

### Start Backend Server (Terminal 1)

```bash
cd wellness-warriors/backend
python main.py
```

**✅ Success looks like:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**⏸️ Keep this terminal open!**

### Start Frontend Server (Terminal 2)

```bash
cd wellness-warriors
npm run dev
```

**✅ Success looks like:**
```
▲ Next.js 16.0.1 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in 2.1s
```

**⏸️ Keep this terminal open!**

### Open Your Browser

Navigate to: **http://localhost:3000**

---

## First Time Using the App

### 1. Welcome Screen

- Read the introduction
- Adjust text size if needed (use slider)
- Tap **"Next"** through the tutorial
- Or tap **"Skip"** to go directly to home

### 2. Home Screen

The main navigation hub offers:

- **📹 My Exercises** - Record and analyze exercises (recommended first)
- **📅 My Plan** - View your exercise schedule
- **👥 My Community** - Connect with other users
- **📊 Measurements** - Track fitness metrics

**👉 Tap "My Exercises" to try pose detection**

### 3. Recording Screen

**Initial Setup:**
1. Grant **camera permission** when browser prompts
2. Read the **"Get Ready!"** popup
3. Tap **"Got It!"** to dismiss

**Verify Pose Detection:**
- Look for the **Activity button** (💪 icon) in top right
- Should be **blue/highlighted** (pose detection ON)
- If gray, click it to enable

**Position Yourself:**
- Stand **6-8 feet** from camera
- Ensure **whole body is visible**
- Face the camera directly
- Ensure good **lighting**

### 4. Try a Squat!

**Steps:**
1. Tap **"Start Recording"**
2. Wait for **3-second countdown**
3. Stand with feet shoulder-width apart
4. Lower down into a squat position
5. Watch the **Live Feedback** panel (right side)

**Expected Feedback:**
- ✅ **"Perfect squat depth!"** (when depth is good)
- ✅ **"Good knee alignment"** (when alignment is correct)
- ⚠️ **"Go deeper!"** (if not squatting deep enough)
- ⚠️ **"Keep chest up!"** (if posture needs improvement)
- ❌ **"Keep knees aligned with toes!"** (if alignment is off)

**You should also see:**
- **Skeleton overlay** on your body (dots and lines)
- **Rep counter** incrementing when you complete squats
- **Voice feedback** speaking corrections automatically

---

## Troubleshooting

### "Connection error - is the backend running?"

**Problem:** Frontend cannot connect to backend.

**Solution:**
1. Check **Terminal 1** - Should show "Uvicorn running on http://0.0.0.0:8000"
2. If not running, start it: `cd backend && python main.py`
3. Wait for startup message before refreshing browser

### "No pose detected"

**Problem:** MediaPipe cannot identify your body.

**Solutions:**
1. **Step back** - Need 6-8 feet distance from camera
2. **Whole body visible** - Head to toes in frame
3. **Improve lighting** - Face a light source (window or lamp)
4. **Clear background** - Plain wall works best
5. **Wait a moment** - May take a few seconds to detect

### Camera Not Working

**Problem:** Camera doesn't activate or permission denied.

**Solutions:**
1. **Grant permissions** - Click "Allow" when browser asks
2. **Check browser settings** - Privacy → Camera → Allow localhost
3. **Close other apps** - Zoom, Teams, etc. may be using camera
4. **Refresh page** - Try reloading the page
5. **Try different browser** - Chrome or Edge recommended

### Backend Won't Start

**Problem:** Python backend fails to start.

**Solutions:**
```bash
# Update pip first
pip install --upgrade pip

# Reinstall dependencies
pip install -r backend/requirements.txt

# Try running again
python backend/main.py
```

**If still failing:**
- Check Python version: `python --version` (need 3.8+)
- Check for error messages in terminal
- Try: `python3 main.py` (Mac/Linux)

---

## Tips for Best Results

### 🎥 Camera Position

**Optimal setup:**
- Camera at **chest height** (if adjustable)
- **6-8 feet** distance from camera
- **Centered** in frame
- **Full body** visible (head to toes)

### 💡 Lighting

**Best conditions:**
- Face a **light source** (window or lamp)
- Avoid **backlighting** (don't have light behind you)
- **Bright room** works best
- Even lighting across body

### 🏋️ Exercise Form

**For best detection:**
- Start with **squats** (easiest to detect)
- Move **slowly and deliberately**
- Maintain **proper form**
- Keep **whole body in frame** throughout movement

### 📱 Performance

**Optimization tips:**
- Use **Chrome or Edge** browser (recommended)
- **Close other applications** (free up CPU/RAM)
- **Close unnecessary browser tabs**
- **Good internet** not needed (runs locally)

---

## What to Expect

### ✅ Working Correctly

When everything is working, you'll see:

- **Blue Activity button** in recording screen (top right)
- **"Live Feedback" panel** appears when exercising (right side)
- **Skeleton overlay** on your body (dots and lines)
- **Feedback messages** updating in real-time
- **Rep counter** incrementing with completed reps
- **Voice feedback** speaking corrections automatically

### ❌ Not Working

If something is wrong, you might see:

- **Yellow "Connecting..."** message persists
- **Red error message** appears
- **No skeleton overlay**
- **No feedback messages**
- **Gray Activity button** (pose detection off)

**👉 If you see issues:** Check both terminals for error messages and refer to troubleshooting section above.

---

## Next Steps

Once everything is working:

### Explore Features

1. **Try Different Exercises**
   - Squats (most accurate)
   - Push-ups
   - Auto-detection mode

2. **Use Toggle Controls**
   - Toggle pose detection on/off
   - Use voice narration button
   - Test different settings

3. **Record Videos**
   - Start recording
   - Complete exercises
   - Stop and review

4. **Test Voice Feedback**
   - Exercise with form issues
   - Listen for automatic corrections
   - Adjust based on feedback

### Customize Settings

- **Text size** - Adjust in welcome screen
- **Exercise type** - Select in exercises screen
- **Pose detection** - Toggle on/off during recording

### Track Progress

- View your **exercise plan**
- Check **measurements** screen
- Connect with **community**

---

## Need More Help?

### Documentation Resources

- 📖 **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- 🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical details
- 📝 **[README.md](./README.md)** - Full documentation
- ❓ **[FAQ.md](./FAQ.md)** - Frequently asked questions
- 🎨 **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Visual walkthrough

### Debugging

- **Check terminal output** - Error messages appear here
- **Browser console (F12)** - JavaScript errors and WebSocket logs
- **Browser network tab** - WebSocket connection status

---

## Stopping the Application

1. **Terminal 1 (Backend):** Press `Ctrl+C` (or `Cmd+C` on Mac)
2. **Terminal 2 (Frontend):** Press `Ctrl+C` (or `Cmd+C` on Mac)
3. **Close browser tab**

---

## Restarting

Simply run the same commands again in both terminals:

**Terminal 1:**
```bash
cd wellness-warriors/backend
python main.py
```

**Terminal 2:**
```bash
cd wellness-warriors
npm run dev
```

No need to reinstall dependencies unless you update the codebase.

---

## Success Checklist

Before moving on, verify:

- [ ] Both terminals show servers running
- [ ] Browser opens to http://localhost:3000
- [ ] Camera permission granted
- [ ] Activity button is blue (pose detection ON)
- [ ] Skeleton overlay appears when standing in frame
- [ ] Feedback messages appear during exercise
- [ ] Voice feedback speaks corrections
- [ ] Rep counter increments

**🎉 If all checked, you're ready to use Wellness Warriors!**

---

**Enjoy using Wellness Warriors!** 💪

If you encounter any issues, check the troubleshooting section above or refer to the full documentation in [README.md](./README.md).
