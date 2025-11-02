# Frequently Asked Questions (FAQ)

> **Comprehensive answers to common questions about Wellness Warriors**

---

## Table of Contents

- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Pose Detection](#pose-detection)
- [Camera & Recording](#camera--recording)
- [Feedback & Messages](#feedback--messages)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Features & Functionality](#features--functionality)
- [Privacy & Security](#privacy--security)
- [Customization](#customization)
- [Technical Questions](#technical-questions)
- [Future Features](#future-features)
- [Getting Help](#getting-help)
- [Best Practices](#best-practices)

---

## Setup & Installation

### Q: What do I need to install?

**A:** You need the following software:

1. **Python 3.8+** (for the backend server)
   - Download from [python.org](https://www.python.org/downloads/)
   - Make sure to check "Add Python to PATH" during installation

2. **Node.js 18+** (for the frontend)
   - Download from [nodejs.org](https://nodejs.org/)
   - LTS version recommended

3. **Python packages**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Node.js packages**
   ```bash
   npm install
   ```

### Q: How long does setup take?

**A:** Approximately 5-10 minutes total:
- Backend dependencies: 3-5 minutes (MediaPipe is large)
- Frontend dependencies: 2-3 minutes
- Initial configuration: 1-2 minutes

### Q: Can I use this on my phone?

**A:** The interface is mobile-friendly, but you need to run the servers on a computer. You can access the application from your phone's browser if both devices are on the same network (use your computer's IP address instead of localhost).

### Q: Do I need an internet connection?

**A:** Only for initial setup (downloading dependencies). After installation, everything runs locally on your computer. No internet connection required during use.

### Q: Can I install on Mac/Linux?

**A:** Yes! The setup process is identical:
- Install Python 3.8+ and Node.js 18+
- Follow the same installation steps
- Run commands in terminal instead of command prompt

---

## Running the Application

### Q: Do I need to run two terminals?

**A:** Yes. The application requires two separate processes:
1. **Terminal 1**: Python backend server (port 8000)
2. **Terminal 2**: Next.js frontend server (port 3000)

Both must be running simultaneously for the application to work.

### Q: Can I close the terminals?

**A:** No. Keep both terminal windows open while using the app. Closing them will stop the servers. You can minimize them if needed.

### Q: How do I stop the application?

**A:** Press `Ctrl+C` (or `Cmd+C` on Mac) in both terminal windows, then close your browser tab.

### Q: Can I use different ports?

**A:** Yes, but you'll need to:
1. Change the port in `backend/main.py`
2. Update the WebSocket URL in `hooks/use-pose-websocket.ts`
3. Update the frontend port in `package.json` or use environment variables

**Default ports:**
- Backend: 8000
- Frontend: 3000 (Next.js will auto-use 3001 if 3000 is busy)

### Q: Can I run this as a service?

**A:** For development, terminals are recommended. For production, consider:
- **Windows**: Task Scheduler or NSSM (Non-Sucking Service Manager)
- **Mac/Linux**: systemd service or PM2

---

## Pose Detection

### Q: Why isn't pose detection working?

**A:** Check these items in order:

1. ✅ **Backend running?** Check Terminal 1 for "Uvicorn running on http://0.0.0.0:8000"
2. ✅ **Activity button enabled?** Should be blue/highlighted
3. ✅ **Whole body visible?** Step back 6-8 feet from camera
4. ✅ **Good lighting?** Face a light source
5. ✅ **No console errors?** Open browser console (F12) and check for errors

### Q: Why do I see "Connecting to pose detection..."?

**A:** The frontend cannot reach the backend. Troubleshooting steps:

1. Verify backend is running (check Terminal 1)
2. Check for error messages in Terminal 1
3. Ensure no firewall is blocking localhost:8000
4. Try refreshing the browser page
5. Check browser console (F12) for WebSocket errors

### Q: Why does it say "No pose detected"?

**A:** MediaPipe cannot identify your body position. Try:

- **Step back further** - Whole body must be visible (6-8 feet away)
- **Improve lighting** - Face a light source, avoid backlighting
- **Clear background** - Plain wall works best
- **Check camera permission** - Grant camera access in browser settings
- **Fitted clothing** - Baggy clothes can reduce accuracy

### Q: How accurate is the pose detection?

**A:** Accuracy depends on several factors:

**Optimal conditions (90%+ accuracy):**
- Good lighting (bright room)
- Whole body visible
- 6-8 feet from camera
- Camera at chest height
- Plain background
- Fitted clothing

**Reduced accuracy:**
- Poor lighting
- Partial body view
- Cluttered background
- Baggy clothing
- Too close/far from camera

### Q: What exercises does it support?

**A:** Currently supports:

- **Squats** (most accurate and well-tested)
- **Push-ups** (good accuracy)
- **Auto-detection** (tries to identify exercise type automatically)

**Future exercises planned:**
- Lunges
- Planks
- Bicep curls
- More to come!

### Q: Can I turn off pose detection?

**A:** Yes! Click the **Activity button** (💪 icon) in the top right corner of the recording screen to toggle pose detection on/off. When gray, it's off; when blue, it's on.

### Q: Does pose detection work in the dark?

**A:** No. Good lighting is essential for accurate pose detection. MediaPipe requires clear visibility of body landmarks.

---

## Camera & Recording

### Q: Why can't I access my camera?

**A:** Common causes and solutions:

1. **Permission not granted**
   - Check browser permissions (Settings → Privacy → Camera)
   - Clear browser cache and try again

2. **Another app is using camera**
   - Close other applications (Zoom, Teams, etc.)
   - Restart browser

3. **Not using localhost or HTTPS**
   - Camera requires secure context (localhost or HTTPS)
   - Use `http://localhost:3000` not an IP address

4. **Camera disabled in system settings**
   - Check system privacy settings
   - Enable camera for your browser

### Q: Can I use an external webcam?

**A:** Yes! The browser will prompt you to select a camera if multiple are available. Make sure the webcam is:
- Properly connected
- Not being used by another application
- Selected in browser permissions

### Q: Why is the video laggy?

**A:** Performance optimization tips:

1. **Close other applications** - Free up CPU/RAM
2. **Reduce browser tabs** - Each tab uses resources
3. **Check CPU usage** - Task Manager (Windows) or Activity Monitor (Mac)
4. **Disable pose detection temporarily** - Toggle off if not needed
5. **Use a faster computer** - More powerful hardware = better performance
6. **Reduce video quality** - Edit `getUserMedia` parameters in code

### Q: How long can I record?

**A:** Videos automatically stop after **60 seconds**. You can stop earlier by clicking "Stop Recording". Future versions may support longer recordings.

### Q: Where are my recordings saved?

**A:** Currently, recordings are temporary and stored in browser memory. When you click "Save Video", the video blob is passed to the parent component. Full save functionality is planned for future releases.

### Q: Can I record longer videos?

**A:** Currently limited to 60 seconds. To change this, edit the timeout in `components/recording-screen.tsx` (line ~216).

---

## Feedback & Messages

### Q: What do the feedback colors mean?

**A:** Feedback is color-coded for quick recognition:

| Color | Type | Meaning |
|-------|------|---------|
| 🟢 **Green** | Good | Form is correct, keep it up! |
| 🟡 **Yellow** | Warning | Needs improvement |
| 🔴 **Red** | Error | Incorrect form, immediate correction needed |
| 🔵 **Blue** | Neutral | Informational message |

### Q: Why am I getting conflicting feedback?

**A:** The system analyzes **multiple aspects** of your form simultaneously:
- Depth might be good ✅
- But alignment might need work ⚠️
- And posture might be off ❌

Each message addresses a different aspect. This is normal and helps you improve all aspects of your form.

### Q: Can I hear the feedback?

**A:** Yes! The system provides **automatic voice feedback** during exercise:
- **Errors** are spoken immediately with emphasis
- **Warnings** are announced to help correct form
- You can also use the "Narrate" button (🔊) to hear screen content

Voice feedback is automatically enabled and speaks posture corrections in real-time.

### Q: Is the feedback always accurate?

**A:** The feedback is generally accurate but not perfect. Factors affecting accuracy:

**High accuracy conditions:**
- Good lighting
- Optimal camera angle
- Proper body position
- Clear background

**Reduced accuracy:**
- Poor lighting conditions
- Camera too close/far
- Partial body view
- Cluttered background
- Loose clothing

**Remember:** Use feedback as a **guide**, not absolute truth. Listen to your body and consult a professional trainer when in doubt.

---

## Performance

### Q: Why is it slow?

**A:** Performance issues can stem from several sources:

1. **High CPU usage**
   - Close other applications
   - Check for background processes

2. **Backend errors**
   - Check Terminal 1 for error messages
   - Restart backend if needed

3. **Network issues**
   - Should be localhost (no network needed)
   - Check for firewall interference

4. **Browser performance**
   - Use Chrome or Edge (recommended)
   - Clear browser cache
   - Disable extensions if needed

### Q: How much CPU does it use?

**A:** Typical usage:

- **Backend**: 20-40% CPU (MediaPipe processing)
- **Frontend**: 5-15% CPU (rendering and communication)
- **Total**: Similar to a video call or streaming

**On slower computers:**
- May see 50-70% CPU usage
- Frame rate may drop
- Feedback may be slightly delayed

### Q: Can I make it faster?

**A:** Yes, several optimization options:

1. **Reduce frame rate**
   - Edit `frameIntervalRef` in `recording-screen.tsx`
   - Increase interval time (e.g., 100ms → 200ms)

2. **Lower video resolution**
   - Edit `getUserMedia` parameters
   - Reduce `width` and `height` values

3. **Disable pose detection**
   - Toggle off when not needed
   - Reduces backend processing

4. **Use faster hardware**
   - More powerful CPU helps
   - GPU acceleration (future feature)

### Q: Does it work on older computers?

**A:** Minimum requirements:
- **Python 3.8+** support
- **Node.js 18+** support
- **Modern browser** (Chrome/Edge/Firefox)

**Older computers:**
- May work but be slower
- May need reduced frame rate
- May experience occasional lag

---

## Troubleshooting

### Q: "Module not found" error in Python

**A:** Dependencies not installed. Run:

```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

If errors persist, try:
```bash
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
```

### Q: "Port 8000 already in use"

**A:** Another process is using port 8000. Solutions:

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

Or change the port in `backend/main.py`.

### Q: "Port 3000 already in use"

**A:** Next.js will automatically use port 3001. Just use that port instead:
```
http://localhost:3001
```

### Q: Backend crashes immediately

**A:** Check these items:

1. **Python version**
   ```bash
   python --version  # Should be 3.8+
   ```

2. **Dependencies installed**
   ```bash
   pip list  # Check for fastapi, mediapipe, opencv-python
   ```

3. **Error messages**
   - Read terminal output carefully
   - Look for specific error messages

4. **Test backend**
   ```bash
   python backend/test_backend.py
   ```

### Q: Frontend won't start

**A:** Troubleshooting steps:

1. **Node version**
   ```bash
   node --version  # Should be 18+
   ```

2. **Dependencies installed**
   ```bash
   npm list  # Check for next, react, etc.
   ```

3. **Clean reinstall**
   ```bash
   rm -rf node_modules .next
   npm install
   ```

4. **Check for errors**
   - Read terminal output
   - Look for specific error messages

### Q: Everything looks right but pose detection doesn't work

**A:** Debug checklist:

1. **Browser console (F12)**
   - Look for WebSocket connection errors
   - Check for JavaScript errors
   - Verify network requests

2. **Backend terminal**
   - Look for "WebSocket connection established"
   - Check for processing errors
   - Verify frame reception

3. **Camera feed**
   - Is video showing?
   - Is it clear and well-lit?
   - Is whole body visible?

4. **Connection status**
   - Activity button should be blue
   - No error messages on screen

---

## Features & Functionality

### Q: Can I save my workout history?

**A:** Currently, workout history saving is not implemented. This feature is planned for future releases.

### Q: Can I compare my form to correct form?

**A:** Not yet, but this feature is planned. You'll be able to see side-by-side comparisons with proper form demonstrations.

### Q: Can I add custom exercises?

**A:** Yes! You can extend the system by:

1. Adding a new analysis function in `backend/pose_detector.py`
2. Following the pattern of `analyze_squat()` or `analyze_pushup()`
3. Adding the exercise type to the frontend selection

See `ARCHITECTURE.md` for technical details.

### Q: Does it count reps?

**A:** Yes! Rep counting is implemented for squats. The system automatically counts repetitions when you complete proper squat movements. Rep counting for other exercises is planned.

### Q: Can multiple people use it at once?

**A:** Each person needs their own browser session, but the backend supports multiple concurrent WebSocket connections. Multiple users can use the system simultaneously.

### Q: Can I use it offline?

**A:** Yes! After initial setup (downloading dependencies), everything runs locally. No internet connection required during use.

---

## Privacy & Security

### Q: Is my video recorded or sent anywhere?

**A:** **No!** Everything runs locally on your computer:

1. **Video frames** are captured in your browser
2. **Sent to your local Python backend** (same machine)
3. **Processed and returned** immediately
4. **Never saved or sent** to any external server

All processing happens on your device. No data leaves your computer.

### Q: Can others see my video?

**A:** No. Everything is processed locally on your computer. No video data is transmitted over the internet or stored on external servers.

### Q: Is my data stored?

**A:** Currently, the app doesn't store any data persistently. All state is:
- Kept in browser memory (temporary)
- Reset when you refresh the page
- Not saved to disk

Future versions may include optional local storage for workout history.

### Q: Is it safe to use?

**A:** Yes! The application is:
- **Open-source** - You can review all code
- **Local processing** - No external servers
- **No data collection** - Privacy-first design
- **Secure by default** - No authentication needed for local use

### Q: What about production deployment?

**A:** For production, security measures would include:
- HTTPS/WSS encryption
- User authentication
- Data encryption at rest
- Secure camera access
- Privacy policy compliance

---

## Customization

### Q: Can I change the text size?

**A:** Yes! Use the text size adjustment button on the welcome screen. The preference is saved for your session.

### Q: Can I change the colors?

**A:** Yes, but you'll need to edit the Tailwind CSS classes in component files. Look for color classes like `bg-blue-600`, `text-red-500`, etc.

### Q: Can I add more exercises?

**A:** Yes! Edit `backend/pose_detector.py` and add new analysis functions following the existing patterns. See `ARCHITECTURE.md` for implementation details.

### Q: Can I adjust the feedback thresholds?

**A:** Yes! Edit the angle ranges in `pose_detector.py`. For example:
- Change squat depth threshold from 80-120° to your preference
- Adjust alignment sensitivity
- Modify rep counting thresholds

### Q: Can I customize voice feedback?

**A:** Yes! Edit the `useNarration` hook or modify the voice feedback logic in `recording-screen.tsx`. You can adjust:
- Speech rate
- Pitch
- Volume
- When feedback is spoken

---

## Technical Questions

### Q: What technology does this use?

**A:** Technology stack:

**Frontend:**
- React 19
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion

**Backend:**
- Python 3.8+
- FastAPI
- MediaPipe (Google)
- OpenCV
- NumPy

**Communication:**
- WebSocket (real-time)
- Base64 encoding (images)

### Q: How does pose detection work?

**A:** The process:

1. **Camera captures video** frames
2. **Frames sent to Python backend** via WebSocket
3. **MediaPipe extracts 33 body landmarks** (joint positions)
4. **Calculate angles** between joints (knees, hips, elbows)
5. **Compare angles** to ideal form ranges
6. **Generate feedback messages** based on deviations
7. **Draw skeleton overlay** on frame
8. **Send annotated frame back** to frontend

See `ARCHITECTURE.md` for detailed technical documentation.

### Q: Can I deploy this to the cloud?

**A:** Yes, but you'll need:

1. **Cloud hosting** for backend (AWS, Google Cloud, Azure)
2. **HTTPS/WSS** for secure WebSocket connections
3. **Database** (optional, for user data)
4. **CDN** for static assets
5. **Load balancer** (for multiple instances)

See `ARCHITECTURE.md` for deployment options.

### Q: Is the code open source?

**A:** Yes! All code is available and can be modified. Check the license file for usage terms.

### Q: Can I contribute?

**A:** Absolutely! Contributions are welcome:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Add new exercises

---

## Future Features

### Q: What features are planned?

**A:** Planned enhancements include:

- ✅ **Rep counting** (partially implemented for squats)
- 🔄 **Workout history** - Save and review past sessions
- 🔄 **More exercises** - Lunges, planks, bicep curls, etc.
- 🔄 **Form comparison** - Side-by-side with correct form
- ✅ **Voice feedback** - Real-time corrections (implemented)
- 🔄 **Progress charts** - Visualize improvement over time
- 🔄 **Mobile apps** - Native iOS/Android versions
- 🔄 **Social features** - Share progress with friends
- 🔄 **Custom workout plans** - Build personalized routines

### Q: When will these be added?

**A:** This is a community-driven project. Features are added:
- As time permits
- By contributors
- Based on user feedback
- Following development priorities

### Q: Can I request a feature?

**A:** Yes! Feature requests are welcome:
- Open an issue on GitHub
- Submit a pull request
- Discuss in community forums
- Contact maintainers

---

## Getting Help

### Q: Where can I get more help?

**A:** Resources available:

1. **📖 Documentation**
   - [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
   - [SETUP.md](./SETUP.md) - Detailed setup instructions
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical documentation
   - [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - Visual walkthrough

2. **🐛 Debugging**
   - Terminal output - Error messages
   - Browser console (F12) - JavaScript errors
   - Network tab - WebSocket connections

3. **💬 Community**
   - GitHub Issues
   - Discussion forums
   - Developer communities

### Q: How do I report a bug?

**A:** When reporting bugs, include:

1. **What you were doing** - Steps to reproduce
2. **What you expected** - Expected behavior
3. **What happened** - Actual behavior
4. **Error messages** - From terminal and browser console
5. **Your setup** - OS, Python version, Node version
6. **Screenshots** - If applicable

### Q: Can I get live support?

**A:** This is an open-source project without dedicated support staff. Try:

1. Reading the documentation thoroughly
2. Checking terminal/console for error messages
3. Searching for similar issues online
4. Asking in developer communities
5. Reviewing the code for understanding

---

## Best Practices

### Q: How should I position myself?

**A:** Optimal positioning:

- **Distance**: 6-8 feet from camera
- **Height**: Camera at chest height (if possible)
- **Visibility**: Whole body visible in frame
- **Angle**: Face the camera directly
- **Lighting**: Face a light source

### Q: What should I wear?

**A:** Clothing recommendations:

- **Fitted clothing** works best (easier landmark detection)
- **Avoid baggy clothes** (can obscure body shape)
- **Contrasting colors** help (against background)
- **No hats/accessories** that block body view
- **Comfortable** for exercise movement

### Q: How often should I use it?

**A:** Use as often as you exercise! The system is designed for:
- Daily workouts
- Exercise practice
- Form improvement sessions
- Progress tracking

### Q: Should I trust the feedback completely?

**A:** Use feedback as a **guide**, not absolute truth:

- ✅ **Listen to your body** - Stop if you feel pain
- ✅ **Consult professionals** - Trainer or physical therapist
- ✅ **Start gradually** - Don't push too hard initially
- ✅ **Use common sense** - The AI isn't perfect

The system provides helpful guidance but shouldn't replace professional medical or fitness advice.

---

**Still have questions?** Review the documentation files or examine the source code for detailed implementation details.
