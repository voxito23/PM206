//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { Pressable, View, StyleSheet, Text,Switch} from "react-native";
import { useState } from "react";

//Zona 2 Main 
export default function PressableScreen() {
    const [buttonText, setButtonText] = useState('Dame Clic');
    const [isDarkMode, setIsDarkMode] = useState(false);

return (
        <View style={[styles.container, {backgroundColor: isDarkMode ? "#000000": "#ffffff"}]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            <Pressable 
                style={styles.button}
                onPress={() => {
                    console.log("Se presiono el boton");
                    setButtonText("Boton presionado");
                }}
                onPressIn={() => {  
                    console.log("Se acaba de presionar el boton");
                }}
                onPressOut={() => {
                    console.log("Se acaba de soltar el boton");
                }}
                onLongPress={() => {
                    console.log("Presion prolongada");
                    setButtonText("Presión prolongada detectada");
                }}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>

            <View style={styles.switchContainer}>
                <Text style={[styles.text, {color: isDarkMode ? "#ffffff": "#000000"}]}>
                    Dark Mode
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={(value) => setIsDarkMode(value)}
                    trackColor={{false: "#767577", true: "lightblue"}}
                    thumbColor="#f4f3f4"
                />
            </View>
        </View>
    )
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 10,
        marginBottom: 50 
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", 
        maxWidth: 300,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
}
);