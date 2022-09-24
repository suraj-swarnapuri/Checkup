
import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

function PatientDetailScreen(props: any) {
    return (
        <SafeAreaView style={styles.test}>
            <Text>Patient Detail Screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
        width: 100,
        height: 200
    }
})

export default PatientDetailScreen;