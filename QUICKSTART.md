# Quick Start Guide

Get Wellness Warriors running in 5 minutes! 🚀

## Prerequisites Check

Before starting, make sure you have:

- [ ] **Python 3.8+** installed ([Download](https://www.python.org/downloads/))
- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] A **webcam** connected
- [ ] **Two terminal windows** available

## Installation (One-Time Setup)

### Step 1: Install Backend Dependencies

Open Terminal 1 and run:

```bash
cd wellness-warriors/backend
pip install -r requirements.txt
```

⏱️ This takes about 2-3 minutes.

### Step 2: Install Frontend Dependencies

Open Terminal 2 and run:

```bash
cd wellness-warriors
npm install
```

⏱️ This takes about 1-2 minutes.

## Running the App

### Every Time You Want to Use the App:

#### Terminal 1 - Start Backend
```bash
cd wellness-warriors/backend
python main.py
```

✅ Wait for: `INFO: Uvicorn running on http://0.0.0.0:8000`

#### Terminal 2 - Start Frontend
```bash
cd wellness-warriors
npm run dev
```

✅ Wait for: `✓ Ready in X.Xs`

### Open Your Browser

Go to: **http://localhost:3000**

## First Time Using the App

1. **Welcome Screen**
   - Read the introduction
   - Adjust text size if needed
   - Tap "Next" through the tutorial

2. **Home Screen**
   - Tap "My Exercises" to try pose detection

3. **Recording Screen**
   - Grant camera permission when prompted
   - Read the "Get Ready!" popup
   - Look for the **Activity button** (top right) - it should be blue
   - Position yourself so your whole body is visible
   - Tap "Start Recording"

4. **Try a Squat!**
   - Stand with feet shoulder-width apart
   - Lower down into a squat
   - Watch the **Live Feedback** panel appear
   - You should see messages like:
     - ✅ "Perfect squat depth!"
     - ✅ "Good knee alignment"
     - ⚠️ "Go deeper!" or "Keep chest up!"

## Troubleshooting

### "Connection error - is the backend running?"

**Fix:** Make sure Terminal 1 is running the Python backend.

### "No pose detected"

**Fix:** 
- Step back from the camera
- Make sure your whole body is visible
- Check lighting (bright room works best)

### Camera not working

**Fix:**
- Grant camera permissions in your browser
- Close other apps using the camera
- Refresh the page

### Backend won't start

**Fix:**
```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

## Tips for Best Results

### 🎥 Camera Position
- Place camera at chest height
- Stand 6-8 feet away
- Make sure full body is visible

### 💡 Lighting
- Face a light source
- Avoid backlighting
- Bright room works best

### 🏋️ Exercise Form
- Start with squats (easiest to detect)
- Move slowly and deliberately
- Keep your whole body in frame

### 📱 Performance
- Use Chrome or Edge browser
- Close other heavy applications
- Good internet connection helps

## What to Expect

### ✅ Working Correctly:
- Blue Activity button in recording screen
- "Live Feedback" panel appears when exercising
- Skeleton overlay on your body
- Feedback messages update in real-time

### ❌ Not Working:
- Yellow "Connecting..." message stays
- Red error message appears
- No skeleton overlay
- No feedback messages

If you see ❌ issues, check both terminals for error messages.

## Next Steps

Once everything is working:

1. **Explore Features**
   - Try different exercises
   - Toggle pose detection on/off
   - Use voice narration
   - Record and save videos

2. **Customize Settings**
   - Adjust text size
   - Change exercise type (auto/squat/pushup)
   - Enable/disable pose detection

3. **Track Progress**
   - View your plan
   - Check measurements
   - Connect with community

## Need More Help?

- 📖 Read [SETUP.md](./SETUP.md) for detailed setup
- 🏗️ See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- 📝 Check [README.md](./README.md) for full documentation
- 🐛 Look at terminal output for error messages

## Stopping the App

1. In Terminal 1 (Backend): Press `Ctrl+C`
2. In Terminal 2 (Frontend): Press `Ctrl+C`
3. Close browser tab

## Restarting

Just run the same commands in both terminals again!

---

**Enjoy using Wellness Warriors!** 💪

If you encounter any issues, check the terminal windows for error messages and refer to the troubleshooting section above.

