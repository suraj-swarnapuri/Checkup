
import { Stack, ListItem, Avatar } from "@react-native-material/core";
import React from "react"
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements'
function PatientDetailScreen(props: any) {
    return (
        <SafeAreaView>
            <Stack>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            {/*  <PulseAnimation style={{ justifyContent: "center" }} color={'#aaa'} numPulses={1} diameter={100} speed={500} duration={2000} /> */}
                            <Icon style={styles.icon} name={"heart-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />

                            <Text style={styles.subtitle}>96 BPM</Text>
                        </View>
                        <View style={styles.col}>
                            <Icon style={styles.icon} name={"water-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}>130/90</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>

                            <Icon style={styles.icon} name={"pizza-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}> 5 B/m</Text>
                        </View>
                        <View style={styles.col}>
                            <Icon style={styles.icon} name={"thermometer-outline"} size={60} type="ionicon" tvParallaxProperties={undefined} />
                            <Text style={styles.subtitle}>100.1 F</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Care and Prescriptions</Text>
                    <Text style={styles.listItem}>- 600mg of Ibuprofen every 6 hrs</Text>
                    <Text style={styles.listItem}>- 100mg of Fentanyl every 12 hrs</Text>
                    <Text style={styles.listItem}>- Monitor vitals after midnight</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Activity Log</Text>
                    <ListItem
                        trailing={
                            <Text style={{ fontSize: 14 }}>11:59PM</Text>
                        }
                        title="Suraj S."
                        secondaryText="Administered 2mg of dopamine"
                    />
                    <ListItem

                        trailing={
                            <Text style={{ fontSize: 14 }}>6:30PM</Text>
                        }
                        title="Suraj S."
                        secondaryText="Administered 20mg of fentanyl"
                    />
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
    }
})

export default PatientDetailScreen;