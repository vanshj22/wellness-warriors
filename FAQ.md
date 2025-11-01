# Frequently Asked Questions (FAQ)

## Setup & Installation

### Q: Do I need to install anything?
**A:** Yes, you need:
1. Python 3.8+ (for the backend)
2. Node.js 18+ (for the frontend)
3. Python packages: `pip install -r backend/requirements.txt`
4. Node packages: `npm install`

### Q: How long does setup take?
**A:** About 5 minutes total:
- Backend dependencies: 2-3 minutes
- Frontend dependencies: 1-2 minutes

### Q: Can I use this on my phone?
**A:** The interface is mobile-friendly, but you need to run the servers on a computer. You can access it from your phone's browser if both devices are on the same network.

### Q: Do I need an internet connection?
**A:** Only for initial setup (downloading dependencies). After that, everything runs locally on your computer.

## Running the Application

### Q: Do I need to run two terminals?
**A:** Yes! One for the Python backend (port 8000) and one for the Next.js frontend (port 3000).

### Q: Can I close the terminals?
**A:** No, keep both terminals open while using the app. Closing them will stop the servers.

### Q: How do I stop the application?
**A:** Press `Ctrl+C` in both terminal windows.

### Q: Can I use different ports?
**A:** Yes, but you'll need to update the WebSocket URL in `hooks/use-pose-websocket.ts` to match your backend port.

## Pose Detection

### Q: Why isn't pose detection working?
**A:** Check these things:
1. Is the Python backend running? (Check Terminal 1)
2. Is the Activity button blue? (Toggle it on)
3. Is your whole body visible in the frame?
4. Is the lighting good enough?
5. Look for error messages in the browser console (F12)

### Q: Why do I see "Connecting to pose detection..."?
**A:** The frontend can't reach the backend. Make sure:
- Python backend is running on port 8000
- No firewall is blocking localhost:8000
- Check Terminal 1 for error messages

### Q: Why does it say "No pose detected"?
**A:** MediaPipe can't find your body. Try:
- Step back so your whole body is visible
- Improve lighting (face a light source)
- Stand in a clear area (no clutter behind you)
- Make sure camera has permission

### Q: How accurate is the pose detection?
**A:** Very accurate when:
- Lighting is good
- Whole body is visible
- You're 6-8 feet from camera
- Camera is at chest height

### Q: What exercises does it support?
**A:** Currently:
- **Squats** (most accurate)
- **Push-ups**
- **Auto-detection** (tries to figure out what you're doing)

More exercises can be added in the future!

### Q: Can I turn off pose detection?
**A:** Yes! Click the Activity button (💪) in the top right to toggle it on/off.

## Camera & Recording

### Q: Why can't I access my camera?
**A:** Common reasons:
1. Browser didn't get permission (check browser settings)
2. Another app is using the camera (close other apps)
3. You're not using localhost or HTTPS
4. Camera is disabled in system settings

### Q: Can I use an external webcam?
**A:** Yes! The browser will ask which camera to use if you have multiple.

### Q: Why is the video laggy?
**A:** Try:
- Close other heavy applications
- Reduce browser tabs
- Check CPU usage
- Disable pose detection temporarily
- Use a faster computer

### Q: How long can I record?
**A:** Videos auto-stop after 60 seconds. You can stop earlier by clicking "Stop Recording".

### Q: Where are my recordings saved?
**A:** Currently, recordings are temporary. You can download them by clicking "Save Video" (feature to be implemented).

## Feedback & Messages

### Q: What do the colors mean?
**A:**
- 🟢 **Green** = Good form! Keep it up
- 🟡 **Yellow** = Warning, needs improvement
- 🔴 **Red** = Error, incorrect form
- 🔵 **Blue** = Neutral information

### Q: Why am I getting conflicting feedback?
**A:** The system analyzes multiple aspects:
- Depth might be good
- But alignment might need work
- And posture might be off

Each message addresses a different aspect of your form.

### Q: Can I hear the feedback?
**A:** Not yet, but you can use the "Narrate" button to hear what's on screen. Voice feedback during exercise is a future enhancement.

### Q: Is the feedback always accurate?
**A:** It's very accurate but not perfect. Factors that affect accuracy:
- Lighting conditions
- Camera angle
- Body position
- Clothing (tight-fitting works best)

## Performance

### Q: Why is it slow?
**A:** Check:
1. CPU usage (close other apps)
2. Backend terminal for errors
3. Network connection (should be localhost)
4. Browser performance (Chrome/Edge recommended)

### Q: How much CPU does it use?
**A:**
- **Backend:** Moderate (MediaPipe processing)
- **Frontend:** Low (just displaying)
- **Total:** Similar to a video call

### Q: Can I make it faster?
**A:** Yes:
- Reduce frame rate (edit `frameIntervalRef` in recording-screen.tsx)
- Lower video resolution (edit `getUserMedia` parameters)
- Disable pose detection when not needed
- Use a faster computer

### Q: Does it work on older computers?
**A:** It should work on any computer that can run:
- Python 3.8+
- Node.js 18+
- Chrome/Edge browser

Older computers may be slower but should still work.

## Troubleshooting

### Q: "Module not found" error in Python
**A:** Run:
```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

### Q: "Port 8000 already in use"
**A:** Something else is using port 8000. Either:
1. Stop that application
2. Change the port in `backend/main.py`

### Q: "Port 3000 already in use"
**A:** Next.js will automatically use port 3001. Just use that instead.

### Q: Backend crashes immediately
**A:** Check:
1. Python version: `python --version` (need 3.8+)
2. Dependencies installed: `pip list`
3. Error messages in terminal
4. Try: `python backend/test_backend.py`

### Q: Frontend won't start
**A:** Check:
1. Node version: `node --version` (need 18+)
2. Dependencies installed: `npm list`
3. Delete `node_modules` and `.next`, then `npm install` again

### Q: Everything looks right but pose detection doesn't work
**A:** Open browser console (F12) and look for:
- WebSocket connection errors
- JavaScript errors
- Network errors

Copy the error and search for solutions.

## Features & Functionality

### Q: Can I save my workout history?
**A:** Not yet. This is a future feature.

### Q: Can I compare my form to correct form?
**A:** Not yet, but this is planned for future versions.

### Q: Can I add custom exercises?
**A:** Yes, but you'll need to edit `backend/pose_detector.py` and add your own analysis logic.

### Q: Does it count reps?
**A:** Not yet. Rep counting is a planned feature.

### Q: Can multiple people use it at once?
**A:** Each person needs their own browser session. The backend supports multiple connections.

### Q: Can I use it offline?
**A:** Yes! After initial setup, everything runs locally. No internet needed.

## Privacy & Security

### Q: Is my video recorded or sent anywhere?
**A:** No! Everything runs locally on your computer. Video frames are:
1. Captured in your browser
2. Sent to your local Python backend
3. Processed and returned
4. Never saved or sent to any server

### Q: Can others see my video?
**A:** No. Everything is on your computer only.

### Q: Is my data stored?
**A:** No. The app doesn't store any data currently.

### Q: Is it safe to use?
**A:** Yes! It's completely local and open-source. You can review all the code.

## Customization

### Q: Can I change the text size?
**A:** Yes! Use the text size button in the welcome screen.

### Q: Can I change the colors?
**A:** Yes, but you'll need to edit the Tailwind CSS classes in the component files.

### Q: Can I add more exercises?
**A:** Yes! Edit `backend/pose_detector.py` and add new analysis functions.

### Q: Can I adjust the feedback thresholds?
**A:** Yes! Edit the angle ranges in `pose_detector.py` (e.g., change squat depth from 80-120° to your preference).

## Technical Questions

### Q: What technology does this use?
**A:**
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI, MediaPipe, OpenCV
- **Communication:** WebSocket
- **Pose Detection:** Google MediaPipe Pose

### Q: How does pose detection work?
**A:**
1. Camera captures video
2. Frames sent to Python backend
3. MediaPipe extracts 33 body landmarks
4. Calculate angles between joints
5. Compare angles to ideal form
6. Generate feedback messages
7. Draw skeleton on frame
8. Send back to frontend

### Q: Can I deploy this to the cloud?
**A:** Yes, but you'll need:
- Cloud hosting for backend (AWS, Google Cloud, etc.)
- HTTPS/WSS for secure connections
- Possibly a database for user data

### Q: Is the code open source?
**A:** Yes! All code is available and can be modified.

### Q: Can I contribute?
**A:** Yes! Feel free to add features, fix bugs, or improve documentation.

## Future Features

### Q: What features are planned?
**A:**
- Rep counting
- Workout history
- More exercises (lunges, planks, etc.)
- Side-by-side comparison with correct form
- Voice feedback during exercise
- Progress charts and analytics
- Mobile app versions
- Social features (share progress)

### Q: When will these be added?
**A:** This is a community project. Features will be added as time permits or by contributors.

### Q: Can I request a feature?
**A:** Yes! Open an issue on GitHub or modify the code yourself.

## Getting Help

### Q: Where can I get more help?
**A:** Check these resources:
1. **QUICKSTART.md** - Quick setup guide
2. **SETUP.md** - Detailed setup instructions
3. **ARCHITECTURE.md** - Technical documentation
4. **VISUAL_GUIDE.md** - Visual walkthrough
5. **Terminal output** - Error messages
6. **Browser console** (F12) - JavaScript errors

### Q: How do I report a bug?
**A:** Note:
1. What you were doing
2. What you expected
3. What actually happened
4. Error messages from terminal/console
5. Your setup (OS, Python version, Node version)

### Q: Can I get live support?
**A:** This is an open-source project without dedicated support. Try:
1. Reading the documentation
2. Checking terminal/console errors
3. Searching for similar issues online
4. Asking in developer communities

## Best Practices

### Q: How should I position myself?
**A:**
- 6-8 feet from camera
- Camera at chest height
- Whole body visible
- Face the camera
- Good lighting

### Q: What should I wear?
**A:**
- Fitted clothing works best
- Avoid baggy clothes
- Contrasting colors help
- No hats or accessories that block view

### Q: How often should I use it?
**A:** As often as you exercise! It's designed for daily use.

### Q: Should I trust the feedback completely?
**A:** Use it as a guide, but:
- Listen to your body
- Consult a professional trainer
- Don't push through pain
- Start with light exercises

---

**Still have questions?** Check the other documentation files or examine the code!

