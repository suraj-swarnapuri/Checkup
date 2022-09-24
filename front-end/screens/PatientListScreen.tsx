
import React from "react"
import { Text, Button, View, SafeAreaView, StyleSheet } from "react-native";

const PatientListScreen = ({ navigation }) => {
    return (
        <View style={styles.test}>
            <Text>Patient List Screen</Text>
            <Button
                title="Go to Detail"
                onPress={() =>
                    navigation.navigate('PatientDetail', { name: 'test' })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
    }
})

export default PatientListScreen;