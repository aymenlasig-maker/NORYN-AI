from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/health")
def health():
    return jsonify({"ok": True, "service": "NORYN AI", "version": "1.0.0"})
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify({"error": "اكتب رسالة أولاً."}), 400
    return jsonify({"reply": "وصلت رسالتك إلى خادم NORYN AI. هذا رد تجريبي مؤقت؛ سنربط نموذج الذكاء الاصطناعي لاحقاً."})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
