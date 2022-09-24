
import React from "react"
import { View, StyleSheet } from "react-native";
import { ListItem } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const initialState = {
    patients:
    [
        {
            title: "Sam1",
            secondaryText: "Patient Info1"
        },
        {
            title: "Hunter1",
            secondaryText: "Patient Info1"
        },
        {
            title: "Sara1",
            secondaryText: "Patient Info1"
        },
        {
            title: "matthew",
            secondaryText: "dying"
        }
    ]
}

const PatientListScreen = ({ navigation }) => {
    const patientList = initialState.patients.map((element) =>
        <ListItem
            leadingMode="icon"
            leading={
                // <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
                <Ionicons name="person" size={24} />
            }
            trailing={props => <Icon name="chevron-right" {...props} />}
            onPress={() =>
                navigation.navigate('PatientDetail', { name: 'test' })
            }
            title={element.title}
            secondaryText={element.secondaryText}
        />
    );

    return (
        <View style={styles.test}>
            {patientList}
        </View>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
    }
})

export default PatientListScreen;