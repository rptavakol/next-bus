import requests, json

def get_data(request, jsonify):

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