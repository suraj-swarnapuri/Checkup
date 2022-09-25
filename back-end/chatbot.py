import os
from twilio.rest import Client

from dotenv import load_dotenv
load_dotenv()

class Chatbot:
    def __init__(self, logger, account_sid, auth_token, sender_number):
        self._logger = logger
        self._logger.info('Init chatbot')

        self.sender_number = sender_number
        self.client = Client(account_sid, auth_token)

    def sendMessage(self, phone_number, message):
        return self.client.messages.create(
                body=message,
                from_=self.sender_number,
                to=phone_number)