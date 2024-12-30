from flask import Flask, jsonify, request
from flask_cors import CORS
import requests 
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)

# URL CALL
API_URL = f"{os.getenv('APP_URL')}"
HEADERS = {"Authorization": f"Bearer {os.getenv('AUTH_KEY')}"}

def chat_with_blenderbot(input_text):
    payload = {"inputs": input_text}
    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code == 200:
        try:
            response_data = response.json() 
            if isinstance(response_data, list) and len(response_data) > 0:
                return response_data[0].get("generated_text", "No response generated.")
            elif isinstance(response_data, dict):

                return response_data.get("generated_text", "No response generated.")
            else:
                return "Unexpected response format."
        except ValueError:
            return "Invalid JSON response from the server."
    else:
        return f"Error: {response.status_code}, {response.text}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("input_text", "")

    if not user_input:
        return jsonify({"error": "No text provided"}), 400

    bot_response = chat_with_blenderbot(user_input)
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
