
import React from "react"
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements'
function PatientDetailScreen(props: any) {
    return (
        <SafeAreaView>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text>Pulse</Text>
                </View>
                <View style={styles.col}>
                    <Text>BP</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text>Respiration</Text>
                </View>
                <View style={styles.col}>
                    <Text>Temp</Text>
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: "lightgrey"
    },
    col: {
        backgroundColor: "red",
        flex: 1,
        height: 200,
        padding: 10,
        margin: 10
    }
})

export default PatientDetailScreen;