
import { Stack, ListItem, HStack, Dialog, DialogHeader, DialogContent, DialogActions, TextInput } from "@react-native-material/core";
import React, { useState } from "react"
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements'

function PatientDetailScreen({ route }) {

    const { patientData } = route.params;
    console.log(patientData)
    const [visible, setVisible] = useState(false);
    const activityLog = patientData["activity_log"].map((element) =>
        <ListItem

            trailing={
                <Text style={{ fontSize: 14, paddingRight: 25 }}>{element.timestamp.split(" ")[1].slice(0, 5)}</Text>
            }
            title={element.name}
            secondaryText={element.message}
        />
    );

    return (
        <SafeAreaView>
            <Stack>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            {/*  <PulseAnimation style={{ justifyContent: "center" }} color={'#aaa'} numPulses={1} diameter={100} speed={500} duration={2000} /> */}
                            <Icon style={styles.icon} name={"heart-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />

                            <Text style={styles.subtitle}>{patientData["pulse"]} bpm</Text>
                        </View>
                        <View style={styles.col}>
                            <Icon style={styles.icon} name={"water-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}>{patientData["bp_systolic"]}/{patientData["bp_diastolic"]}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Icon style={styles.icon} name={"lungs"} size={60} type="material-community" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}> {patientData["respiration"]} B/m</Text>
                        </View>
                        <View style={styles.col}>
                            <Icon style={styles.icon} name={"thermometer-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}>{patientData["temp"]}F</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Care and Prescriptions</Text>
                    <Text style={styles.listItem}>- {patientData["instructions"]}</Text>
                </View>
                <View style={styles.section}>
                    <HStack m={4} spacing={6}>
                        <Text style={styles.title}>Activity Log</Text>
                        <Icon style={styles.leftIcon} name={"add-outline"} size={30} type="ionicon" tvParallaxProperties={undefined} onPress={() => setVisible(true)} />
                    </HStack>
                    <View>
                        {activityLog}
                    </View>
                </View>
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#B0E2FF"
    },
    title: {
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",

    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center",

    },
    listItem: {
        fontSize: 18,
        margin: 5
    },
    row: {
        flexDirection: "row"
    },
    col: {
        backgroundColor: "#EBEBEB",
        flex: 1,
        height: 200,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        justifyContent: "center",
        shadowRadius: 5
    },
    icon: {
        alignItems: "center",
        marginBottom: 10
    },
    leftIcon: {
        alignContent: "flex-end",
        marginBottom: 10
    }
})

export default PatientDetailScreen;