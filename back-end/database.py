import sqlite3
from os.path import exists

database_file_name = "patient_info.db"



def create_tables(curr):
        curr.execute("CREATE TABLE patient_info(pid, instructions, check_rate,name, rid)")
        curr.execute("CREATE TABLE patient_health(pid, temp, pulse, respiration, bp, timestamp)")
        curr.execute("CREATE TABLE activity_log(pid, time, activity,log)")
        curr.execute("CREATE TABLE chat_log(pid, from_patient, time_stamp, message_body)")

def insert_dummy_data(con):
    # patient_info
    con.cursor().execute("INSERT INTO patient_info VALUES('281-111-2222', 'Take 2 pills every 6 hours', '6h','John Smith', '1a')")
    con.cursor().execute("INSERT INTO patient_info VALUES('281-111-2223', 'Take 1 pill every 12 hours', '12h', 'Jane Doe', '1b')")
    
    # patient_health
    con.cursor().execute("INSERT INTO patient_health VALUES('281-111-2222', '95F', '75bpm', '14', '120 mmHg systolic / 80 mmHg diastolic','2020-04-01 12:00:00')")
    con.cursor().execute("INSERT INTO patient_health VALUES('281-111-2223', '98F', '80bpm', '16', '130 mmHg systolic / 90 mmHg diastolic','2020-04-01 12:00:00')")
    
    con.commit()

class Database:
    def __init__(self, logger):
        self._logger = logger
        self._logger.info("Creating database")

        if exists(database_file_name):
            self._con = sqlite3.connect(database_file_name)
            return

        self._con = sqlite3.connect(database_file_name)
       

        # create database
        create_tables(self._con.cursor())
        # insert dummy data
        insert_dummy_data(self._con)

        req = self._con.cursor().execute("SELECT * FROM patient_info")
        self._logger.info(req.fetchall())

    def get_patient_health(self, patient_number):
        req = self._con.cursor().execute("SELECT * FROM patient_health WHERE pid=?", (patient_number,))
        patient_health = {}
        for i in req.fetchall():
            patient_health[i[5]] = {
                'patient_number' : i[0],
                'temp' : i[1],
                'pulse' : i[2],
                'respiration' : i[3],
                'bp' : i[4]

            }
        return patient_health

    def get_patient_info(self, patient_number):
        req = self._con.cursor().execute("SELECT * FROM patient_info WHERE pid=?", (patient_number,))
        patient_info = {}
        for i in req.fetchall():
            patient_info = {
                'instructions' : i[1],
                'check_rate' : i[2],
                'name' : i[3],
                'room' : i[4]

            }
        return patient_info

    def get_activity_log(self, patient_number):
        req = self._con.cursor().execute("SELECT * FROM activity_log WHERE pid=?", (patient_number,))
        activity_log = {}
        for i in req.fetchall():
            activity_log[i[1]] = {
                'activity' : i[2],
                'log' : i[3]

            }
        return activity_log
