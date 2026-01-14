"""
Production Server Runner
Uses Waitress (Windows-compatible WSGI server)
"""
import os
from waitress import serve
from app import app

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    
    print(f"Starting production server...")
    print(f"Server running at http://{host}:{port}")
    print("Press Ctrl+C to stop")
    
    serve(app, host=host, port=port, threads=4)
