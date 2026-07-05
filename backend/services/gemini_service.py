import json
import re

import google.generativeai as genai

from config import Config

SYSTEM_PROMPT = """You are an expert in sustainable waste management.

Analyze the waste item.

Return the response ONLY as JSON in this format:

{
  "category":"",
  "recyclable":"",
  "disposal_steps":[
      "",
      "",
      "",
      ""
  ],
  "hazard_warning":"",
  "eco_suggestion":""
}

Do not return markdown.
Do not explain.
Only valid JSON."""


def _extract_json(text: str) -> dict:
    """Extract and parse JSON from AI response, handling markdown fences."""
    cleaned = text.strip()

    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)```", cleaned)
    if fence_match:
        cleaned = fence_match.group(1).strip()

    return json.loads(cleaned)


def analyze_waste_item(item: str) -> dict:
    """
    Send waste item to Google Gemini and return structured disposal guidance.

    Args:
        item: The waste item name to analyze.

    Returns:
        Parsed JSON dict with category, recyclable, disposal_steps, etc.

    Raises:
        ValueError: If API key is missing or response is invalid.
        Exception: On Gemini API errors.
    """
    if not Config.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured. Set it in backend/.env")

    genai.configure(api_key=Config.GEMINI_API_KEY)

    model = genai.GenerativeModel(
        model_name=Config.GEMINI_MODEL,
        system_instruction=SYSTEM_PROMPT,
    )

    response = model.generate_content(
        f"Analyze this waste item: {item}",
        generation_config={
            "temperature": 0.3,
            "max_output_tokens": 1024,
            "response_mime_type": "application/json",
        },
    )

    content = response.text
    if not content:
        raise ValueError("Empty response from Gemini API")

    result = _extract_json(content)

    required = ["category", "recyclable", "disposal_steps", "hazard_warning", "eco_suggestion"]
    for field in required:
        if field not in result:
            raise ValueError(f"Missing field in AI response: {field}")

    if not isinstance(result["disposal_steps"], list):
        raise ValueError("disposal_steps must be a list")

    return result
