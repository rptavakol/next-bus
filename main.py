from flask import Flask, render_template, jsonify, request
import requests, json

# Adding Flask instance
app = Flask(__name__)

if __name__ == "__main__":
    app.run()

@app.route("/")
def index():
    return render_template("index2.html")
    #return


@app.route("/run")
def run():

    urlG = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element'

    url = urlG + '?hafasID=' + '6791' + '&time=null'

    USER = "RNV_API_TOKEN"
    PASS = "sauv277demidl1do7imandb9pk"

    headers = {USER: PASS}

    r = requests.get(url, headers=headers)

    # print(r.content)
    data = json.loads(r.text)
    #print(data)

    #return render_template("results.html", data=data)
    return jsonify(result= data)



@app.route("/run_test", methods=["GET", "POST"])
def load_ajax():
    if request.method == "POST":
        # load _sid and _uip from posted JSON and save other data
        # but request.form is empty.
        # >>> request.form
        # ImmutableMultiDict([])
        stationID = request.json['stationID']

        urlG = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element'

        url = urlG + '?hafasID=' + stationID[0] + '&time=null'

        USER = "RNV_API_TOKEN"
        PASS = "sauv277demidl1do7imandb9pk"

        headers = {USER: PASS}

        r = requests.get(url, headers=headers)

        # print(r.content)
        data = json.loads(r.text)
        # print(data)

        # return render_template("results.html", data=data)
        return jsonify(result=data)





















"""
# Inserting an integer
@app.route("/post/<int:post_id>")
def post_id(post_id):
    return "This post has an id of %d" %post_id

# Inserting a template based on String Variable
@app.route("/profile/<name>")
def profile(name=None):
    # Name variable needed to know how to customize template
    return render_template('profile.html', name=name)

# Inserting a template based on List Variable
@app.route("/shopping")
def shopping():
    food = ["Cheese","Tuna","Beef"]
    return render_template("shopping.html", food = food)"""