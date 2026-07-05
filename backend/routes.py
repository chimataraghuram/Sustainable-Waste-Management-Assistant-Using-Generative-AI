from flask import Blueprint, jsonify, request

from services.gemini_service import analyze_waste_item

api = Blueprint("api", __name__)


@api.route("/analyze", methods=["POST"])
def analyze():
    """
    Analyze a waste item using Google Gemini.

    Request body: { "item": "Plastic Bottle" }
    Response: AI-generated disposal guidance JSON.
    """
    data = request.get_json(silent=True)

    if not data or not data.get("item", "").strip():
        return jsonify({"error": "Item name is required."}), 400

    item = data["item"].strip()

    try:
        result = analyze_waste_item(item)
        return jsonify({"item": item, **result}), 200
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        import traceback
        print(traceback.format_exc())
        return jsonify({"error": f"Internal Error: {str(exc)}", "details": traceback.format_exc()}), 500
