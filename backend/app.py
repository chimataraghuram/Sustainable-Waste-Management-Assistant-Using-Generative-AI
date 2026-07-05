from flask import Flask
from flask_cors import CORS

from config import Config
from routes import api


def create_app() -> Flask:
    """Application factory for WasteGuide AI backend."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Allow frontend dev server to communicate with backend
    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

    app.register_blueprint(api, url_prefix="/api")

    @app.route("/health")
    def health():
        return {"status": "ok", "service": "WasteGuide AI Backend"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
