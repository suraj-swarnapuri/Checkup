import sqlite3
from os.path import exists

database_file_name = "patient_info.db"



def create_tables(curr):
        curr.execute("CREATE TABLE admin_info(pid, name, rid)")
        curr.execute("CREATE TABLE patient_info(pid, instructions, check_rate)")
        curr.execute("CREATE TABLE patient_health(pid, temp, pulse, respiration, bp)")
        curr.execute("CREATE TABLE activity_log(pid, time, activity,log)")
        curr.execute("CREATE TABLE chat_log(pid, from_patient, time_stamp, message_body)")

def insert_dummy_data(con):
    # admin_info
    con.cursor().execute("INSERT INTO admin_info VALUES('281-111-2222', 'John Smith', '1a')")
    con.cursor().execute("INSERT INTO admin_info VALUES('281-111-2223', 'Jane Doe', '1b')")

    # patient_info
    con.cursor().execute("INSERT INTO patient_info VALUES('281-111-2222', 'Take 2 pills every 6 hours', '6h')")
    con.cursor().execute("INSERT INTO patient_info VALUES('281-111-2223', 'Take 1 pill every 12 hours', '12h')")
    
    # patient_health
    con.cursor().execute("INSERT INTO patient_health VALUES('281-111-2222', '95F', '75bpm', '14', '120 mmHg systolic / 80 mmHg diastolic')")
    con.cursor().execute("INSERT INTO patient_health VALUES('281-111-2223', '98F', '80bpm', '16', '130 mmHg systolic / 90 mmHg diastolic')")
    
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

    def get_patient_name(self, patient_number):
        res = self._con.cursor().execute("SELECT name FROM admin_info WHERE pid = ?", (patient_number,))
        
        return res.fetchone()[0]