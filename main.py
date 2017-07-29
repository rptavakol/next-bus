# App Logic: "/" routes to -> index.html (runs) -> app.js
# app.js (ajax calls) -> def load_ajax() function (returns json) -> app.js
# app.js (hooks data to) -> index2.html

from flask import Flask, render_template, jsonify, request

import api_request

# Adding Flask instance
app = Flask(__name__)

if __name__ == "__main__":
    app.run()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run_test", methods=["GET", "POST"])
def load_ajax():
    if request.method == "POST":
        return api_request.get_data(request, jsonify)