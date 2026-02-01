# Comic Quest - Futuristic 3D Website 🎮🚀

A futuristic, animated 3D website with a comic theme featuring multiple interactive pages, smooth transitions, video playback, and a simple database.

## Features

✨ **Futuristic comic aesthetic** with vibrant gradients and glowing effects  
🎨 **3D animated backgrounds** using Three.js particles and shapes  
🔄 **Smooth page transitions** with 3D rotation effects  
🎬 **Video playback** for different result pages  
🔊 **Sound effects** for interactive elements  
💾 **Simple JSON database** to track user choices  
📱 **Fully responsive** design

## Project Structure

```
comic-website/
├── public/
│   ├── videos/          # Video files
│   └── sounds/          # Sound effect files
├── src/
│   ├── styles/
│   │   └── main.css    # Main styling
│   └── js/
│       ├── scene3d.js   # Three.js 3D scenes
│       └── transitions.js # Page transitions
├── server/
│   ├── server.js        # Express backend
│   ├── db.json          # JSON database
│   └── package.json     # Backend dependencies
├── index.html           # Landing page
├── question.html        # Question page
├── penguin.html         # Penguin result page
└── result.html          # Gay result page
```

## Setup Instructions

### 1. Add Your Media Files

Replace the placeholder files with your actual media:

- **Penguin video**: Add `penguin.mp4` to `public/videos/`
- **Gay video**: Add `gay.mp4` to `public/videos/`
- **Sound effect**: Add `fhaaa.mp3` to `public/sounds/`

### 2. Start the Backend Server

```bash
cd server
npm install  # Already done if you just set up
node server.js
```

The server will run on `http://localhost:3000`

### 3. Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## How It Works

### Page Flow

1. **Landing Page** (`index.html`)
   - User enters their name
   - Name is stored in localStorage
   - 3D transition to question page

2. **Question Page** (`question.html`)
   - Displays the question: "What is your plan for 3rd Feb at 4:30 PM?"
   - Two options:
     - **Option 1**: "Be in front of the college"
     - **Option 2**: "Go home"

3. **Result Pages**
   - **Option 1** → `penguin.html`: Shows "You're the penguin!" + video + list of recent "gays"
   - **Option 2** → `result.html`: Plays "fhaaa" sound + shows "You are gay!" + video

### Database

The backend stores user choices in `server/db.json`:

```json
{
  "users": [
    {
      "name": "John",
      "choice": "option2",
      "timestamp": "2026-02-01T10:30:00.000Z"
    }
  ]
}
```

### API Endpoints

- `POST /api/save-choice` - Save user's name and choice
- `GET /api/recent-gays` - Get list of users who chose option 2
- `GET /api/users` - Get all users (debugging)
- `DELETE /api/clear` - Clear database (testing)

## Customization

### Colors

Edit CSS variables in `src/styles/main.css`:

```css
:root {
  --primary: #ff00ff;    /* Magenta */
  --secondary: #00ffff;  /* Cyan */
  --accent: #ffff00;     /* Yellow */
  --dark: #0a0a0f;       /* Dark background */
}
```

### 3D Effects

Modify particle count and shapes in `src/js/scene3d.js`:

```javascript
const particleCount = 1000; // Adjust for performance
```

### Transition Duration

Change transition speed in page scripts:

```javascript
await initPageTransition('/page.html', 800); // 800ms
```

## Browser Compatibility

- **Recommended**: Chrome, Edge, Firefox (latest versions)
- **Required**: WebGL support for 3D effects
- **Note**: Video/audio autoplay may require user interaction due to browser policies

## Troubleshooting

### Videos Not Playing

- Ensure video files are in `public/videos/` folder
- Check video format (MP4 recommended)
- Some browsers block autoplay

### Sound Not Playing

- Browser may block autoplay
- User needs to interact with page first
- Check file path and format (MP3 recommended)

### Backend Connection Errors

- Ensure backend server is running on port 3000
- Check for CORS issues (already configured)
- The frontend will continue to work without backend, but data won't persist

### 3D Effects Not Showing

- Check browser console for WebGL errors
- Ensure Three.js is properly installed
- Try a different browser with WebGL support

## Performance Tips

- Reduce particle count for slower devices
- Optimize video file sizes
- Use compressed audio formats

## License

Free to use and modify!

---

Built with ❤️ using Vite, Three.js, and Express
