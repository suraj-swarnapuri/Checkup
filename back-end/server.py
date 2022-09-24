from tkinter import N
from flask import Flask
from flask import g # application context
import database
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