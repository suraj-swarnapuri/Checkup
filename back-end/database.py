from doctest import UnexpectedException
import sqlite3
from os.path import exists

database_file_name = "checkup.db"

def create_tables(curr):
    curr.execute("CREATE TABLE users(uid PRIMARY KEY, phone_number, name, role)")
    curr.execute("CREATE TABLE patient_info(pid, phone_number, instructions, check_rate,name, rid)")
    curr.execute("CREATE TABLE patient_health(pid, temp, pulse, respiration, bp, timestamp)")
    curr.execute("CREATE TABLE activity_log(pid, name, timestamp, message)")
    curr.execute("CREATE TABLE chat_log(pid, sender_name, role, timestamp, message_body)")

def insert_dummy_data(con):
    # patient_info
    con.cursor().execute("INSERT INTO patient_info VALUES('1','281-111-2222', 'Take 2 pills every 6 hours', '6h','John Smith', '1a')")
    con.cursor().execute("INSERT INTO patient_info VALUES('2','281-111-2223', 'Take 1 pill every 12 hours', '12h', 'Jane Doe', '1b')")
    
    # patient_health
    con.cursor().execute("INSERT INTO patient_health VALUES('1', '95F', '75bpm', '14', '120 mmHg systolic / 80 mmHg diastolic','2020-04-01 12:00:00')")
    con.cursor().execute("INSERT INTO patient_health VALUES('2', '98F', '80bpm', '16', '130 mmHg systolic / 90 mmHg diastolic','2020-04-01 12:00:00')")
    
    # activity_log
    con.cursor().execute("INSERT INTO activity_log VALUES('1', '1', '2020-04-01 12:00:00', 'took medicine')")
    con.cursor().execute("INSERT INTO activity_log VALUES('2', '1', '2020-04-01 12:00:00', 'changed bed sheets')")

    con.commit()

def clean(input):
    input.replace('\'', '\\\'')
    input.replace('\"', '\\\"')
    input.replace('\.', '')
    input.replace(';', '')
    return input

def clean_phone_number(phone_number):
    phone_number.replace('-', '')
    return f"+1{phone_number}"


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

    def get_patient_health(self, patient_id):
        req = self._con.cursor().execute("SELECT * FROM patient_health WHERE pid=?", (patient_id,))
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

    def get_patient_info(self, patient_id):
        req = self._con.cursor().execute("SELECT * FROM patient_info WHERE pid=?", (patient_id,))
        patient_info = {}
        for i in req.fetchall():
            patient_info = {
                'instructions' : i[2],
                'check_rate' : i[3],
                'name' : i[4],
                'room' : i[5]

            }
        return patient_info

    def get_messages(self, patient_id):
        req = self._con.cursor().execute(f"SELECT * FROM chat_log WHERE pid={patient_id} ORDER BY timestamp DESC")
        messages = []
        for i in req.fetchall():
            messages.append({
                'sender_name': i[1],
                'role': i[2],
                'timestamp': i[3],
                'message': i[4]
            })
        return messages

    def add_message(self, patient_id, sender_name, role, timestamp, message):
        self._con.cursor().execute(f"INSERT INTO chat_log VALUES({patient_id}, \"{clean(sender_name)}\", \"{role}\", \"{timestamp}\", \"{clean(message)}\")")
        self._con.commit()

    def add_user(self, uid, phone_number, name, role):
        self._con.cursor().execute(f"INSERT INTO users VALUES({uid}, \"{clean_phone_number(phone_number)}\", \"{clean(name)}\", \"{role}\")")
        self._con.commit()

    def get_user(self, uid):
        req = self._con.cursor().execute(f"SELECT * FROM users WHERE uid={uid}")
        users = req.fetchall()
        if len(users) > 1 or len(users) < 1:
            raise UnexpectedException("There should be one match..")
        return {
            'uid': users[0][0],
            'phone_number': users[0][1],
            'name': users[0][2],
            'role': users[0][3],
        }

    def get_patient_by_phone(self, phone_number):
        req = self._con.cursor().execute(f"SELECT * FROM users WHERE phone_number=\"{phone_number}\" and role=\"patient\"")
        users = req.fetchall()
        if len(users) < 1:
            raise UnexpectedException("No match")
        return {
            'uid': users[0][0],
            'phone_number': users[0][1],
            'name': users[0][2],
            'role': users[0][3],
        }

    def get_patients(self):
        req = self._con.cursor().execute(f"SELECT * FROM users WHERE role=\"patient\"")
        patients = []
        for i in req.fetchall():
            patients.append({
                'pid': i[0],
                'phone_number': i[1],
                'name': i[2],
                'role': i[3]
            })
        return patients

    def add_activity_log(self, pid, name, timestamp, message):
        self._con.cursor().execute(f"INSERT INTO activity_log VALUES({pid}, \"{clean(name)}\", \"{timestamp}\", \"{clean(message)}\")")
        self._con.commit()

    def get_activity_log(self, patient_id):
        req = self._con.cursor().execute(f"SELECT * FROM activity_log WHERE pid={patient_id}")
        activity_log = []
        for i in req.fetchall():
            activity_log.append({
                'name' : i[1],
                'timestamp' : i[2],
                'message' : i[3]
            })
        return activity_log
    