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

    @app.route("/health")
    def health():
        import os
        return {
            "status": "ok",
            "service": "WasteGuide AI Backend",
            "env_keys": list(os.environ.keys())
        }

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
