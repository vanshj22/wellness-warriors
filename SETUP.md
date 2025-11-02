# Setup Guide

> **Comprehensive installation and configuration instructions for Wellness Warriors**

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Setup](#quick-setup)
- [Detailed Installation](#detailed-installation)
- [Configuration](#configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Platform-Specific Notes](#platform-specific-notes)

---

## Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Python** | 3.8+ | [python.org](https://www.python.org/downloads/) |
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **pip** | Latest | Included with Python |
| **npm** | Latest | Included with Node.js |

### System Requirements

- **Operating System:** Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM:** Minimum 4GB, 8GB recommended
- **Storage:** 2GB free space for dependencies
- **Webcam:** Built-in or USB webcam
- **Internet:** Required for initial dependency download only

### Verification

Check that prerequisites are installed:

```bash
# Check Python version
python --version
# Should output: Python 3.8.x or higher

# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check pip
pip --version
# Should output: pip x.x.x

# Check npm
npm --version
# Should output: x.x.x
```

---

## Quick Setup

> **For experienced users - get running in 3 commands**

```bash
# Terminal 1 - Backend
cd wellness-warriors/backend
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend (in new terminal)
cd wellness-warriors
npm install
npm run dev
```

Open browser to: **http://localhost:3000**

For detailed steps, continue reading.

---

## Detailed Installation

### Step 1: Clone or Download Repository

**Option A: Git Clone**
```bash
git clone <repository-url>
cd wellness-warriors
```

**Option B: Download ZIP**
1. Download repository as ZIP
2. Extract to desired location
3. Open terminal in extracted folder

### Step 2: Install Python Dependencies

#### Windows

```bash
# Navigate to backend directory
cd wellness-warriors\backend

# Install dependencies
pip install -r requirements.txt
```

**Expected output:**
```
Collecting fastapi...
Collecting mediapipe...
Collecting opencv-python...
...
Successfully installed ...
```

⏱️ **Time:** 3-5 minutes (MediaPipe is large ~100MB)

#### macOS/Linux

```bash
# Navigate to backend directory
cd wellness-warriors/backend

# Install dependencies
pip install -r requirements.txt

# If pip fails, try pip3
pip3 install -r requirements.txt
```

**Note:** On some systems, you may need `python3` and `pip3` instead of `python` and `pip`.

### Step 3: Install Node.js Dependencies

```bash
# Navigate to project root
cd wellness-warriors

# Install dependencies
npm install
```

**Expected output:**
```
added 1234 packages, and audited 1235 packages in 45s
```

⏱️ **Time:** 2-3 minutes

**Note:** First-time installation may take longer. Subsequent runs will be faster due to caching.

---

## Configuration

### Backend Configuration

The backend requires minimal configuration. Default settings:

- **Port:** 8000
- **Host:** 0.0.0.0 (all interfaces)
- **CORS:** Enabled for localhost:3000 and localhost:3001

**To change port** (edit `backend/main.py`):
```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Change 8000 to desired port
```

**To change CORS origins** (edit `backend/main.py`):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    # Add your origins here
)
```

### Frontend Configuration

Default frontend settings:

- **Port:** 3000 (auto-increments if busy)
- **WebSocket URL:** ws://localhost:8000/ws/pose

**To change WebSocket URL** (edit `hooks/use-pose-websocket.ts`):
```typescript
const ws = new WebSocket("ws://localhost:8000/ws/pose");
// Change URL here if backend uses different port
```

**Environment Variables** (create `.env.local`):
```env
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/pose
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Verification

### Checklist

After installation, verify everything is set up correctly:

#### ✅ Backend Verification

**Terminal 1 - Start Backend:**
```bash
cd wellness-warriors/backend
python main.py
```

**Expected output:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Test health endpoint:**
```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

#### ✅ Frontend Verification

**Terminal 2 - Start Frontend:**
```bash
cd wellness-warriors
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.1 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in 2.1s
```

**Open browser:**
- Navigate to: `http://localhost:3000`
- Should see Wellness Warriors welcome screen

#### ✅ Integration Test

1. **Navigate to Exercises:**
   - Click "My Exercises" on home screen

2. **Start Recording:**
   - Click "Start Recording"
   - Grant camera permission
   - Dismiss "Get Ready" popup

3. **Verify Pose Detection:**
   - Activity button should be blue (top right)
   - Stand in frame (6-8 feet away)
   - Should see skeleton overlay
   - Feedback panel should appear (right side)

4. **Test Exercise:**
   - Do a squat
   - Should see feedback messages
   - Should hear voice feedback
   - Rep counter should increment

---

## Troubleshooting

### Installation Issues

#### "Module not found" in Python

**Problem:** Dependencies not installed correctly.

**Solution:**
```bash
# Upgrade pip first
pip install --upgrade pip
# or
python -m pip install --upgrade pip

# Reinstall dependencies
pip install -r backend/requirements.txt
```

**If using virtual environment:**
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

#### "Command not found: npm"

**Problem:** Node.js not installed or not in PATH.

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Verify: `npm --version`

#### Port Already in Use

**Backend Port 8000:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**Frontend Port 3000:**
- Next.js automatically uses port 3001 if 3000 is busy
- Or change port: `npm run dev -- -p 3001`

#### MediaPipe Installation Fails

**Problem:** MediaPipe requires specific system dependencies.

**Solution:**

**Windows:**
- Install Visual C++ Redistributable
- Ensure Python 3.8-3.11 (MediaPipe may not support 3.12+ yet)

**macOS:**
- May require Xcode Command Line Tools: `xcode-select --install`

**Linux:**
```bash
sudo apt-get update
sudo apt-get install python3-dev python3-pip
pip install --upgrade pip
pip install mediapipe
```

### Runtime Issues

#### Backend Crashes on Start

**Check:**
1. Python version: `python --version` (must be 3.8+)
2. Dependencies: `pip list | grep -i fastapi`
3. Error messages in terminal

**Try:**
```bash
# Test backend directly
python backend/test_backend.py
```

#### Frontend Won't Start

**Check:**
1. Node version: `node --version` (must be 18+)
2. Dependencies: `npm list`
3. Port availability

**Try:**
```bash
# Clean reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

#### Camera Not Working

**Check:**
1. Browser permissions (Settings → Privacy → Camera)
2. No other apps using camera
3. Using localhost (not IP address)
4. HTTPS required (or localhost exception)

**Try:**
- Different browser (Chrome/Edge recommended)
- Refresh page
- Clear browser cache

#### Pose Detection Not Connecting

**Check:**
1. Backend running (Terminal 1)
2. WebSocket URL correct
3. No firewall blocking port 8000
4. Browser console (F12) for errors

**Verify:**
- Check Terminal 1 for "WebSocket connection established"
- Check browser console for connection messages

---

## Platform-Specific Notes

### Windows

**Command Prompt vs PowerShell:**
- Both work, but syntax may differ
- Use backslashes for paths: `cd wellness-warriors\backend`

**Python Installation:**
- Check "Add Python to PATH" during installation
- May need to use `py` instead of `python`: `py main.py`

**Batch Files:**
- Use provided `start-backend.bat` and `start-frontend.bat`
- Double-click to run, or run from command prompt

### macOS

**Python Commands:**
- May need `python3` and `pip3` instead of `python` and `pip`
- Install via Homebrew: `brew install python3`

**Permissions:**
- Grant Terminal camera access in System Preferences
- May need to allow Python in Security settings

**Paths:**
- Use forward slashes: `cd wellness-warriors/backend`

### Linux

**Package Manager:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3-pip nodejs npm

# Fedora
sudo dnf install python3-pip nodejs npm
```

**Python Virtual Environment:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

**Permissions:**
- May need sudo for system-wide installs
- Consider using virtual environments instead

---

## Post-Installation

### First Run

1. **Start both servers** (Terminal 1 and Terminal 2)
2. **Open browser** to http://localhost:3000
3. **Complete welcome tutorial**
4. **Test camera and pose detection**

### Regular Use

**Every time you want to use the app:**

1. **Terminal 1:** `cd wellness-warriors/backend && python main.py`
2. **Terminal 2:** `cd wellness-warriors && npm run dev`
3. **Open browser** to http://localhost:3000

**Shortcut Scripts (Windows):**
- Double-click `start-backend.bat`
- Double-click `start-frontend.bat`

### Updates

**When updating the codebase:**

```bash
# Pull latest code
git pull

# Update backend dependencies (if requirements.txt changed)
cd backend
pip install -r requirements.txt --upgrade

# Update frontend dependencies (if package.json changed)
cd ..
npm install
```

---

## Need More Help?

- **Quick Start:** See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup
- **FAQ:** Check [FAQ.md](./FAQ.md) for common questions
- **Architecture:** Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- **Visual Guide:** See [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) for screenshots

---

**Setup Complete!** 🎉

If you encounter issues not covered here, check the troubleshooting section or refer to the FAQ.
