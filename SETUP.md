# Setup Guide - Wellness Warriors

## Quick Setup (5 minutes)

### Step 1: Install Python Dependencies

Open a terminal in the `wellness-warriors` directory and run:

```bash
cd backend
pip install -r requirements.txt
```

**Note:** If you don't have Python installed, download it from [python.org](https://www.python.org/downloads/) (version 3.8 or higher).

### Step 2: Install Node.js Dependencies

In the `wellness-warriors` directory:

```bash
npm install
```

**Note:** If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/) (version 18 or higher).

### Step 3: Start the Application

You need TWO terminals open:

#### Terminal 1 - Start Backend
```bash
cd wellness-warriors
# Windows:
start-backend.bat

# Mac/Linux:
cd backend && python main.py
```

Wait until you see: `INFO: Uvicorn running on http://0.0.0.0:8000`

#### Terminal 2 - Start Frontend
```bash
cd wellness-warriors
# Windows:
start-frontend.bat

# Mac/Linux:
npm run dev
```

Wait until you see: `✓ Ready in X.Xs`

### Step 4: Open the App

Open your browser and go to: **http://localhost:3000**

## Verification Checklist

- [ ] Backend running on port 8000 (check Terminal 1)
- [ ] Frontend running on port 3000 (check Terminal 2)
- [ ] Browser shows the Wellness Warriors welcome screen
- [ ] Camera permission granted when you start recording
- [ ] Pose detection button (Activity icon) appears when recording

## Common Issues

### Issue: "Module not found" errors in Python

**Solution:**
```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

### Issue: "Port 8000 already in use"

**Solution:**
```bash
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

### Issue: "Port 3000 already in use"

**Solution:** The Next.js dev server will automatically use port 3001. Just use that port instead.

### Issue: Camera not working

**Solutions:**
1. Grant camera permissions in your browser
2. Make sure you're using `localhost` (not an IP address)
3. Close other apps that might be using the camera
4. Try a different browser (Chrome recommended)

### Issue: Pose detection not connecting

**Solutions:**
1. Make sure the Python backend is running (check Terminal 1)
2. Look for the message: "WebSocket connection established"
3. Check browser console (F12) for errors
4. Verify the backend URL in the browser console

## Testing the Pose Detection

1. Click "My Exercises" on the home screen
2. Click "Start Recording"
3. Dismiss the "Get Ready" popup
4. Look for the Activity button (should be blue/highlighted)
5. Look for "Live Feedback" panel on the right side
6. Try doing a squat - you should see feedback messages

## Performance Tips

- **Good lighting** helps pose detection accuracy
- **Stand back** so your whole body is visible
- **Stable camera** position works best
- **Close other apps** for better performance

## Need Help?

If you're still having issues:

1. Check both terminal windows for error messages
2. Make sure all dependencies are installed correctly
3. Try restarting both servers
4. Clear your browser cache and reload

## What's Next?

Once everything is running:

1. Complete the welcome tutorial
2. Try recording an exercise with pose detection
3. Explore the different screens (Plan, Community, Profile)
4. Adjust text size and use voice narration for accessibility

Enjoy using Wellness Warriors! 💪

