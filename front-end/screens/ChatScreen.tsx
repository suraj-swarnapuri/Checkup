import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

function ChatScreen({ route }) {
    const { messagesObj } = route.params;
    console.log(route.params)
    const [messages, setMessages] = useState<any[]>([]);
    var dt = new Date();
    dt.setHours(dt.getHours() - 2);
    useEffect(() => {
        setMessages(messagesObj)
    }, [])

    const onSend = useCallback((messages: any[] = []) => {
        console.log(messages)
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