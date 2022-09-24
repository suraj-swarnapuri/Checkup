import React from "react"
import { View, StyleSheet, Text } from "react-native";
import { Button, HStack } from "@react-native-material/core";
import { Icon } from 'react-native-elements'

const initialState = {
    patients:
    [
        {
            title: "Sam",
            secondaryText: "Patient Info"
        },
        {
            title: "Hunter",
            secondaryText: "Patient Info"
        },
        {
            title: "Sara",
            secondaryText: "Patient Info"
        },
        {
            title: "Matthew",
            secondaryText: "dying"
        }
    ]
}

const PatientListScreen = ({ navigation }) => {
    const patientList = initialState.patients.map((element) =>
        <View style={styles.listItem}>
            <HStack m={4} spacing={6}>
                <Icon style={styles.icon} name={"person-outline"} size={35} type="ionicon" tvParallaxProperties={undefined} />
                <Text style={styles.title}>{element.title}</Text>
            </HStack>
            <Text>{element.secondaryText}</Text>
            <Button style={styles.button} variant="outlined" color="#000000" title="Status" onPress={() =>
                navigation.navigate('PatientDetail', { name: 'test' })
            }/>
        </View>
    );

    return (
        <View>
            {patientList}
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