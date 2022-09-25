import { StyleSheet, View } from 'react-native'
import React, { useState, } from 'react'
import { TextInput, Button, } from '@react-native-material/core'
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "react-native";

export default function LoginScreen({ navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [text, setText] = useState('');
    const [items, setItems] = useState([
        { label: 'Nurse', value: "nurse" },
        { label: 'Doctor', value: "doctor" },
        { label: 'Admin', value: "admin" },
    ]);

    function navigateToList() {
        let response = fetch(
            'https://hackdfw-checkup.herokuapp.com/patients'
        ).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            navigation.navigate('PatientList', { patients: responseJson, name: text })
        });
    }

    return (

        <View style={{ flex: 1, margin: 10, alignItems: "center", backgroundColor: "#ffffff" }}>
            <Image style={{ width: 300, height: 300, justifyContent: "center" }} source={require('../assets/checkup.jpeg')} />
            <TextInput label='Username' onChangeText={newText => setText(newText)} defaultValue={text} variant="outlined" style={{ borderRadius: 30, width: 390 }} />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <Button color="#000000" title="Login" style={{ marginTop: 30, width: 300, height: 45 }} onPress={() =>
                navigateToList()
            } />
        </View>
    )
}

const styles = StyleSheet.create({})