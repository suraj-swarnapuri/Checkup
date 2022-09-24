
import { Stack, Chip } from "@react-native-material/core";
import React from "react"
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Divider, Icon } from 'react-native-elements'
function PatientDetailScreen(props: any) {
    return (
        <SafeAreaView>
            <Stack>
                <View style={styles.row}>
                    <View style={styles.col}>
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
            </Stack>
            <Divider></Divider>
            <Text>Care and Prescriptions</Text>

            <Divider></Divider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center",

    },
    row: {
        flexDirection: "row",
        backgroundColor: "#B0E2FF"
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