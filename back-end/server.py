import os
from flask import Flask
from flask import g # application context
import database
import random
import datetime

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
@app.route("/patient/<patient_number>/health")
def get_info(patient_number):
    db = get_db()
    health_info =  mock_patient_health()
    health_info["patient_number"] = patient_number
    health_info["timestamp"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    patient_info = health_info | db.get_patient_info(patient_number)
    patient_info["activity_log"] = db.get_activity_log(patient_number)
    return patient_info




if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)