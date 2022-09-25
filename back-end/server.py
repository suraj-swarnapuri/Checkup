import os
import database
import random
import datetime
import json
import chatbot
from random import randint
from flask import Flask, request, redirect
from flask import g # application context
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
app = Flask(__name__)

CORS(app)

def get_db():
    if 'db' not in g:
        g.db = database.Database(get_logger())
    return g.db

def get_logger():
    if 'logger' not in g:
        app.logger.setLevel("INFO")
        g.logger = app.logger
    return g.logger

def get_chatbot():
    if 'chatbot' not in g:
        g.chatbot = chatbot.Chatbot(
            get_logger(),
            os.environ['TWILIO_ACCOUNT_SID'],
            os.environ['TWILIO_AUTH_TOKEN'],
            os.environ['TWILIO_PHONE_NUMBER'])
    return g.chatbot

##### Helpers
def get_timestamp():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def Ok(obj = None):
    if obj == None:
        obj = {'success':True} 
    return json.dumps(obj), 200, {'ContentType':'application/json'} 


##### Mocks
def mock_patient_health():
    temp = random.randint(90, 110)
    pulse = random.randint(60, 160)
    respiration = random.randint(10, 30)
    bp_systolic = random.randint(100, 200)
    bp_diastolic = random.randint(60, 120)
    return {
        'temp' : temp,
        'pulse' : pulse,
        'respiration' : respiration,
        'bp_systolic' : bp_systolic,
        'bp_diastolic' : bp_diastolic
    }


##### Routes
@app.route("/patients/<patient_id>/health")
def get_info(patient_id):
    db = get_db()
    health_info =  mock_patient_health()
    health_info["patient_id"] = patient_id
    health_info["timestamp"] = get_timestamp()
    patient_info = health_info | db.get_patient_info(patient_id)
    patient_info["activity_log"] = db.get_activity_log(patient_id)
    return patient_info

@app.get("/patients/<patient_id>/messages")
def get_messages(patient_id):
    db = get_db()
    return list(db.get_messages(patient_id))

@app.post("/patients/<patient_id>/messages")
def post_message(patient_id):
    db = get_db()
    json = request.get_json()
    post_message
    db.add_message(patient_id, json['sender_name'], json['role'], get_timestamp(), json['message'])

    user = db.get_user(patient_id)
    chatbot = get_chatbot()
    chatbot.sendMessage(user['phone_number'], json['message'])
    return Ok()

@app.get("/patients")
def get_patients():
    db = get_db()
    patients = db.get_patients()
    if patients == None:
        return Ok([])
    return Ok(patients)

@app.get("/patients/phone/<patient_id>")
def get_patient_by_phone(phone_number):
    db = get_db()
    user = db.get_user_by_phone(phone_number)
    return Ok(user)

@app.post("/users")
def add_user():
    db = get_db()
    json = request.get_json()
    uid = randint(1, 1000)
    db.add_user(uid, json['phone_number'], json['name'], json['role'])
    return Ok({'uid': uid})


##### Twilio
@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    logger = get_logger()
    logger.info(str(request.values))

    from_number = request.values.get('From')
    body = request.values.get('Body')

    logger.info(f'from:{from_number}')
    logger.info(f'body:{body}')

    # write message to db
    db = get_db()
    user = db.get_patient_by_phone(from_number)

    logger.info(f'user:{str(user)}')
    db.add_message(user['uid'], user['name'], user['role'], get_timestamp(), body)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=os.environ['DEBUG'], host='0.0.0.0', port=port)