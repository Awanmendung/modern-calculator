# Modern Calculator 🧮

A beautiful, full-stack calculator application built with Flask and modern CSS.

![Calculator Preview](https://via.placeholder.com/600x400?text=Modern+Calculator)

## ✨ Features

- **Modern UI**: Glassmorphism design with animated background
- **Full-Stack**: Flask backend with REST API
- **History Tracking**: View and reuse previous calculations
- **Keyboard Support**: Use your keyboard for faster input
- **Responsive**: Works on desktop and mobile devices
- **Production Ready**: Configured for multiple deployment platforms

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calculator
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run development server**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📦 Deployment Options

### Option 1: Windows (Waitress)

```bash
pip install -r requirements.txt
python run_production.py
```

### Option 2: Linux/macOS (Gunicorn)

```bash
pip install -r requirements.txt
gunicorn wsgi:app --bind 0.0.0.0:5000 --workers 4
```

### Option 3: Docker

```bash
# Build the image
docker build -t modern-calculator .

# Run the container
docker run -p 5000:5000 modern-calculator
```

### Option 4: Render.com (Free Hosting)

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Render will auto-detect `render.yaml` configuration
6. Click **Deploy**

### Option 5: Railway (Free Hosting)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create a new project from GitHub
4. Railway will auto-detect Python and `Procfile`
5. Your app will be live!

### Option 6: Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create my-calculator-app

# Deploy
git push heroku main

# Open app
heroku open
```

### Option 7: Vercel (with Serverless)

Create `vercel.json`:
```json
{
  "builds": [{"src": "wsgi.py", "use": "@vercel/python"}],
  "routes": [{"src": "/(.*)", "dest": "wsgi.py"}]
}
```

Then:
```bash
vercel deploy
```

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Environment variables:
- `FLASK_ENV`: `development` or `production`
- `SECRET_KEY`: Secure random string for sessions
- `HOST`: Server host (default: `0.0.0.0`)
- `PORT`: Server port (default: `5000`)

## 📁 Project Structure

```
calculator/
├── app.py              # Main Flask application
├── wsgi.py             # WSGI entry point
├── config.py           # Configuration settings
├── run_production.py   # Windows production server
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
├── Procfile            # Heroku/Railway config
├── render.yaml         # Render.com config
├── templates/
│   └── index.html      # Main HTML template
└── static/
    ├── css/
    │   └── style.css   # Stylesheets
    └── js/
        └── script.js   # Frontend JavaScript
```

## 🎨 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render calculator page |
| POST | `/api/calculate` | Calculate expression |
| GET | `/api/history` | Get calculation history |
| DELETE | `/api/history` | Clear history |

### Example API Usage

```bash
# Calculate
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"expression": "10+5*2"}'

# Response: {"expression": "10+5*2", "result": 20, "success": true}
```

## 🛡️ Security Features

- Safe expression evaluation (no arbitrary code execution)
- Input validation
- CORS enabled for API access
- Environment-based configuration

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

Built with ❤️ using Flask & Modern CSS
