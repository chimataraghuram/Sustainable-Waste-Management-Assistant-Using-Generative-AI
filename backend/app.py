import os
import sys

# Ensure current directory is in sys.path for serverless environments (Vercel Lambda)
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from flask import Flask
from flask_cors import CORS

from config import Config
from routes import api


def create_app() -> Flask:
    """Application factory for WasteGuide AI backend."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all origins so deployed frontend can access it
    CORS(app, resources={r"/*": {"origins": "*"}})

    app.register_blueprint(api, url_prefix="/api")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
