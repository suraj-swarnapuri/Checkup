
import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

function PatientDetailScreen(props) {
    return (
        <SafeAreaView style={styles.test}>
            <Text>HELLO</Text>
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