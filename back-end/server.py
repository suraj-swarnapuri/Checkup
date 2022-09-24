import os
import database
import random
import datetime
import json

import chatbot
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
        'temp' : '{0}F'.format(temp),
        'pulse' : '{0}bpm'.format(pulse),
        'respiration' : '{0}breath/min'.format(respiration),
        'bp' : '{0} mmHg systolic / {1} mmHg diastolic'.format(bp_systolic, bp_diastolic)
    }


##### Routes
@app.route("/patient/<patient_id>/health")
def get_info(patient_id):
    db = get_db()
    health_info =  mock_patient_health()
    health_info["patient_id"] = patient_id
    health_info["timestamp"] = get_timestamp()
    patient_info = health_info | db.get_patient_info(patient_id)
    patient_info["activity_log"] = db.get_activity_log(patient_id)
    return patient_info

@app.get("/patient/<patient_id>/messages")
def get_messages(patient_id):
    db = get_db()
    return list(db.get_messages(patient_id))

@app.post("/patient/<patient_id>/messages")
def post_message(patient_id):
    db = get_db()
    json = request.get_json()
    g.logger.info(str(json))
    db.add_message(patient_id, json['sender_name'], json['role'], get_timestamp(), json['message'])
    return Ok()


##### Twilio
@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("The Robots are coming! Head for the hills!")

    bot = get_chatbot()
    bot.sendMessage('+18178512523', 'hello.')

    return str(resp)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=os.environ['DEBUG'], host='0.0.0.0', port=port)