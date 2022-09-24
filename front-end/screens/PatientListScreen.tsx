import React from "react"
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";
import { Button, HStack } from "@react-native-material/core";
import { Icon } from 'react-native-elements'

const PatientListScreen = ({ navigation }) => {
    const patients = useSelector((state) => state.checkupStates.patients);

    const patientsDisplay = patients.map((element) =>
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