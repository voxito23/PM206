import { Button, Text, Image, View } from "react-native";

export const Saludo2 = () => {
    return (

        <View>

            <Text>Soy un componente propio</Text>

            <Image source={require('../assets/wave.png')}></Image>

            <Button title="Hola 206"> </Button>

        </View>


    )
}