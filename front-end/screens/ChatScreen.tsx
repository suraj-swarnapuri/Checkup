import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'


function sendMessage(message, name) {
    console.log(message, typeof message)
    fetch('https://hackdfw-checkup.herokuapp.com/patients/509/messages', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "sender_name": name,
            "role": "nurse",
            "message": message
        })
    });
}


function ChatScreen({ route }) {
    const { messagesObj, name } = route.params;
    console.log(route.params)
    const [messages, setMessages] = useState<any[]>([]);
    var dt = new Date();
    dt.setHours(dt.getHours() - 2);
    useEffect(() => {
        setMessages(messagesObj)
    }, [])

    const onSend = useCallback((messages: any[] = []) => {
        console.log(messages);
        sendMessage(messages[0].text, name);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    return (
        <GiftedChat
            renderUsernameOnMessage={true}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )

}

const styles = StyleSheet.create({})

export default ChatScreen;