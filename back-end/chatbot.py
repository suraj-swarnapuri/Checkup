import os
from twilio.rest import Client

from dotenv import load_dotenv
load_dotenv()

def format_number(phone_number):
    if phone_number[0:2] != '+1':
        return f'+1{phone_number}'

class Chatbot:
    def __init__(self, logger, account_sid, auth_token, sender_number):
        self._logger = logger
        self._logger.info('Init chatbot')

        self.sender_number = sender_number
        self.client = Client(account_sid, auth_token)

    def sendMessage(phone_number, message)
        return client.messages.create(
                body='This is the ship that made the Kessel Run in fourteen parsecs?',
                from_=self.sender_number,
                to=format_number(phon_number))