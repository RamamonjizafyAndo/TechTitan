from flask import Flask, render_template, jsonify, request
import processor
import requests
import json
import datefinder
import re
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
app.config['SECRET_KEY'] = 'enter-a-very-secretive-key-3479373'
other_server_url = 'https://us-central1-boulou-functions-for-devs.cloudfunctions.net'
developer_id = '-Nlm4dylAEVqUP6jRrOF'
email = 'ramamonjizafymanitra06@gmail.com'
deviceId = 'bf7f35cf2583be4b5ej9tt'

def check_tension():
    res = requests.get(
        f'{other_server_url}/boulou_check_deviceStatus?developerId={developer_id}&email={email}&deviceId={deviceId}',
    )
    response_data = json.loads(res.text)
    print(response_data)
    return response_data.get('result', {}).get('actual_voltage', '')

def check_intensite():
    res = requests.get(
        f'{other_server_url}/boulou_check_deviceStatus?developerId={developer_id}&email={email}&deviceId={deviceId}',
    )
    response_data = json.loads(res.text)
    return response_data.get('result', {}).get('actual_current', '')

def check_puissance():
    res = requests.get(
        f'{other_server_url}/boulou_check_deviceStatus?developerId={developer_id}&email={email}&deviceId={deviceId}',
    )
    response_data = json.loads(res.text)
    return response_data.get('result', {}).get('actual_power', '')

def check_stat():
    res = requests.get(
        f'{other_server_url}/boulou_check_deviceStatus?developerId={developer_id}&email={email}&deviceId={deviceId}',
    )
    response_data = json.loads(res.text)
    courant = response_data["result"]["status"]["actual_current"]
    tension = response_data["result"]["status"]["actual_voltage"]
    puissance = response_data["result"]["status"]["actual_power"]

    # Formatage dans une chaîne de texte
    resultat_formate = f"Intensité {courant} A, Tension {tension} V, Puissance {puissance} W"
    return resultat_formate

def check_device_stat_day(day):
    res = requests.get(
        f'{other_server_url}/boulou_get_deviceStatistics?developerId={developer_id}&email={email}&deviceId={deviceId}&period_type=day&period_value={day}',
    )
    response_data = json.loads(res.text)
    formatted_list = []

    # Parcourir le dictionnaire
    for key, value in response_data.get("result", {}).items():
        # Convertir la clé en format de date
        date_format = f"{key[:4]}-{key[4:6]}-{key[6:8]} {key[8:10]}:00"
        # Ajouter à la liste formatée
        formatted_list.append(f"{date_format}: {value}")

    # Imprimer la liste formatée
    formatted_string = ", ".join(formatted_list)
    return formatted_string

def check_device_stat_year(year):
    print(deviceId)
    res = requests.get(
        f'{other_server_url}/boulou_get_deviceStatistics?developerId={developer_id}&email={email}&deviceId=bf7f35cf2583be4b5ej9tt&period_type=year&period_value={year}',
    )
    response_data = json.loads(res.text)
    print(response_data)
    formatted_list = []
    # Extraire les données
    result_data = response_data.get("result", {})

    # Créer une chaîne de texte formatée
    formatted_text = ', '.join([f"{key[:4]}-{key[4:]}: {value}" for key, value in result_data.items()])
    print(formatted_text)
    return formatted_text

def mois_en_chiffre(mois_traite):
    mois_traite = mois_traite.lower()
    print('mois'+mois)  # Convertir en minuscules pour la cohérence
    mois_mapping = {
        'janvier': '1',
        'février': '2',
        'mars': '3',
        'avril': '4',
        'mai': '5',
        'juin': '6',
        'juillet': '7',
        'août': '8',
        'septembre':'9',
        'octobre': '10',
        'novembre': '11',
        'décembre': '12'
    }
    return mois_mapping.get(mois_traite, None)

def check_device_stat_month(month):
    mois_mapping = {
        'janvier': '01',
        'février': '02',
        'mars': '03',
        'avril': '04',
        'mai': '05',
        'juin': '06',
        'juillet': '07',
        'août': '08',
        'septembre': '09',
        'octobre': '10',
        'novembre': '11',
        'décembre': '12'
    }

    mois = '2023' + mois_mapping.get(month, None)
    res = requests.get(
        f'{other_server_url}/boulou_get_deviceStatistics?developerId={developer_id}&email={email}&deviceId={deviceId}&period_type=month&period_value={mois}',
    )

    # Charger la réponse JSON
    response_data = json.loads(res.text)
    # Extraire les données
    result_data = response_data.get("result", {})
    print(result_data)
    # Créer un dictionnaire pour regrouper les valeurs par mois
    grouped_data = {}

    for key, value in result_data.items():
        month = key[4:6]
        grouped_data[month] = grouped_data.get(month, 0.00) + float(value)
    # Formater le texte
    del response_data['success']
    del response_data['result']
    formatted_text = json.dumps(response_data)
    print(formatted_text)
    return str(result_data)


def on_off(state):
    try:
        data = {
            "developerId": developer_id,
            "email": email,
            "deviceId": deviceId,
            "switch_status": state.upper()
        }
        print(state.upper())
        res = requests.post(other_server_url+'/boulou_switch_device', data)
        print(res)
        return ""
    except:
        print('error')

@app.route('/', methods=["GET", "POST"])
def index():
    return render_template('index.html', **locals())

def extraire_mois(texte):
    print(texte)
    # Utiliser une expression régulière pour trouver les noms de mois
    matches = re.findall(r'\b(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\b', texte, flags=re.IGNORECASE)
    
    # Si des correspondances sont trouvées, prendre la première comme le mois
    if matches:
        return matches[0].lower()  # Convertir en minuscules pour la cohérence
    else:
        return None


def get_year(texte):
    # Utilisation d'une expression régulière pour trouver le premier chiffre
    match = re.search(r'\d+', texte)

    # Vérifier si un chiffre a été trouvé
    if match:
        chiffre = match.group()
        
        return int(chiffre)
    else:
        # Retourner l'année actuelle si aucun chiffre n'est trouvé
        return datetime.now().year


def get_day(texte):
    # Utilisation d'une expression régulière pour trouver le premier chiffre
    match = re.search(r'\d+', texte)

    # Vérifier si un chiffre a été trouvé
    if match:
        chiffre = match.group()
        mois_mapping = {
        'janvier': '01',
        'février': '02',
        'mars': '03',
        'avril': '04',
        'mai': '05',
        'juin': '06',
        'juillet': '07',
        'août': '08',
        'septembre':'09',
        'octobre': '10',
        'novembre': '11',
        'décembre': '12'
        }
    
        mois = mois_mapping.get(extraire_mois(texte), None)
        dates_trouvees = datefinder.find_dates(texte)

        # Parcourir les dates trouvées
        for date_trouvee in dates_trouvees:
            # Extraire l'année de la date
            annee = date_trouvee.year
        return (str(annee)+mois+chiffre)
    else:
        # Retourner l'année actuelle si aucun chiffre n'est trouvé
        return datetime.now().day

@app.route('/chatbot', methods=["POST", "GET"])
def check_device_status():
    # Send a GET request to the other server
    the_question = request.form['question']
    response = processor.chatbot_response(the_question)
    try:
        avant, apres = response.split("-", 1)
    except:
        avant = ''
        apres = response
    mois_txt = ''
    dates_trouvees = datefinder.find_dates(the_question)
    day_txt = ''
    year_txt = ''
    if(avant == 'year'):
        year_txt = get_year(the_question)
    
    elif(avant=='day'):
        day_txt = get_day(the_question)
    
    elif(avant=='month'):
        mois_txt = extraire_mois(the_question)
    
    # Utiliser un dictionnaire pour émuler un switch/case
    switch = {
        'tension': check_tension,
        'intensité': check_intensite,
        'puissance': check_puissance,
        'stat': check_stat,
        'year': lambda: check_device_stat_year(year_txt),
        'day': lambda: check_device_stat_day(day_txt),
        'month': lambda: check_device_stat_month(mois_txt),
        'on': lambda: on_off('on'),
        'off': lambda: on_off('off'),
        'default': lambda: '',
    }

    # Appeler la fonction appropriée
    other_server_response = switch.get(avant.strip().lower(), switch['default'])() 
    print(other_server_response)
    
    # device = response_data.get('result', {}).get('id', '')
    # device_name = response_data.get('result', {}).get('name', '')

    # Process the response locally (if needed)
    print(apres)
    return jsonify({"response": apres+other_server_response })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4000', debug=True)
