from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route("/run-script", methods=["GET"])
def run_script():
    result = subprocess.run(["python", "path/to/script.py"], capture_output=True)
    return jsonify({"output": result.stdout.decode()})

