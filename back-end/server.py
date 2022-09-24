import os
import database
import chatbot
from flask import Flask, request, redirect
from flask import g # application context
from twilio.twiml.messaging_response import MessagingResponse
app = Flask(__name__)

def get_db():
    if 'db' not in g:
        g.db = database.Database(get_logger())
    return g.db

def get_logger():
    if 'logger' not in g:
        app.logger.setLevel("INFO")
        g.logger = app.logger
    return g.logger

@app.route("/")
def hello_world():
    db = get_db()
    get_logger().info(db.get_patient_name("281-111-2222"))
    return "<p>Hello, World!</p>"

# Twilio webhook
@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("The Robots are coming! Head for the hills!")
    return str(resp)


# Body Temperature
@app.route("/health/<patient_number>/temp")
def temperature(patient_number):
    return f'95F'
# Pulse
@app.route("/health/<patient_number>/pulse")
def pulse(patient_number):
    return f'75bpm'
# Rate of breathing
@app.route("/health/<patient_number>/respiration")
def respiration(patient_number):
   return f'14 {patient_number}'
# Blood Pressure
@app.route("/health/<patient_number>/bp")
def blood_pressure(patient_number):
   return f'120 mmHg systolic and 80 mmHg diastolic'


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=os.environ['DEBUG'], host='0.0.0.0', port=port)