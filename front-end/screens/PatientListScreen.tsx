
import React from "react"
import { Text, Button, View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "@react-native-material/core";

const PatientListScreen = ({ navigation }) => {
    return (
        <>
            <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
            }
            title="Brunch this weekend?"
            secondaryText="I'll be in your neighborhood doing errands this…"
            />
            <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{ uri: "https://mui.com/static/images/avatar/2.jpg" }} />
            }
            title="Summer BBQ"
            secondaryText="Wish I could come, but I'm out of town this…"
            />
            <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }} />
            }
            title="Oui Oui"
            secondaryText="Do you have Paris recommendations? Have you ever…"
            />
            <View style={styles.test}>
            <Text>Patient List Screen</Text>
            <Button
                title="Go to Detail"
                onPress={() =>
                    navigation.navigate('PatientDetail', { name: 'test' })
                }
            />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
    }
})

export default PatientListScreen;