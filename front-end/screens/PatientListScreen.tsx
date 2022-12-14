import React from "react"
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";
import { Button, HStack } from "@react-native-material/core";
import { Icon } from 'react-native-elements'


const PatientListScreen = ({ navigation, route }) => {
    //const patients = useSelector((state) => state.checkupStates.patients);
    const { patients, name } = route.params;
    function getPatientData(pid) {
        let response = fetch(
            `https://hackdfw-checkup.herokuapp.com/patients/${pid}/health`
        ).then((response) => response.json()).then((responseJson) => {
            navigation.navigate('PatientDetail', { name: 'test', patientData: responseJson })
        });
    }
    function getChatData(pid) {
        let messagesObj = [];
        let response = fetch(
            `https://hackdfw-checkup.herokuapp.com/patients/${pid}/messages`
        ).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            responseJson.forEach(element => {
                messagesObj.push({
                    _id: Math.floor(Math.random() * 10000),
                    text: element.message,
                    createdAt: element.timestamp,
                    user: {
                        _id: element.role === "nurse" ? 1 : 0,
                        name: element.sender_name,
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                })
            });
            navigation.navigate('Chat', { name: name, messagesObj: messagesObj })
        });
    }
    console.log(patients)
    const patientsDisplay = patients.map((element) =>
        <View style={styles.listItem}>
            <HStack m={4} spacing={6}>
                <Icon style={styles.icon} name={"person-outline"} size={35} type="ionicon" tvParallaxProperties={undefined} />
                <Text style={styles.title}>{element.name}</Text>
                <Icon style={styles.icon} name={"chatbox-ellipses-outline"} size={35} type="ionicon" tvParallaxProperties={undefined} onPress={() =>
                    getChatData(element.pid)
                } />
            </HStack>
            <Text>Dummy</Text>
            <Button style={styles.button} variant="outlined" color="#000000" title="Status" onPress={() => getPatientData(element.pid)} />
        </View>
    );

    return (
        <View>
            {patientsDisplay}
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        marginBottom: 0,
        padding: 10,
        backgroundColor: "#B0E2FF",
        borderRadius: 10,
    },
    title: {
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left",
    },
    button: {
        alignSelf: "flex-end",
        width: 90,
        backgroundColor: "#FFFFFF",
    },
    icon: {
        alignItems: "center",
        marginBottom: 10,
    }
})

export default PatientListScreen;