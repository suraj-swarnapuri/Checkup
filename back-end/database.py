import sqlite3
from os.path import exists

database_file_name = "patient_info.db"

class Database:
    def __init__(self, logger):
        self._logger = logger
        self._logger.info("Creating database")

        if exists(database_file_name):
            self._con = sqlite3.connect(database_file_name)
            return

        self._con = sqlite3.connect(database_file_name)
       

        # create database
        print("test")
        self._logger.info("Creating database")
        self._con.cursor().execute("CREATE TABLE patient(id, number, rid)")
   
        self._con.cursor().execute("""
            INSERT INTO patient VALUES
                (1, '713-444-2376', '4b'),
                (2, '832-568-1342', '6a')
        """)
        self._con.commit()
        req = self._con.cursor().execute("SELECT * FROM patient")
        self._logger.info(req.fetchall())



    def get_number(self, id):
        res = self._con.cursor().execute("SELECT number FROM patient WHERE id = ?", (id,))
        
        return res.fetchone()[0]