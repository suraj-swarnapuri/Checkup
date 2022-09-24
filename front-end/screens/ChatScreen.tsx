import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

function ChatScreen() {
    const [messages, setMessages] = useState<any[]>([]);
    var dt = new Date();
    dt.setHours(dt.getHours() - 2);
    useEffect(() => {
        setMessages([
            {
                _id: 3,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'How are you doing??',
                createdAt: dt,
                user: {
                    _id: 2,
                    name: 'Test',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 1,
                text: 'I love you',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
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