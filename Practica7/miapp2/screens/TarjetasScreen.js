/* Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/perfil';

/* Zona 2: Main - Hogar de los componentes */

export default function TarjetasScreen() {
  return (
    <View style={styles.container}>

      <Perfil estiloE={styles.tarjetaRoja} nombre="Eduardo" carrera="Sistemas" materia="Programacion Móvil" semestre="9"/>
   
      <Perfil estiloE={styles.tarjetaVerde} nombre="Mauricio" carrera="mau" materia="hola" semestre="32"></Perfil>

      <Perfil estiloE={styles.tarjetaRoja} nombre="Eduardo2" carrera="Sistemas" materia="Programacion Móvil" semestre="9"/>

      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: Estilos y posicionamiento */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'column',

    


  },
  tarjetaRoja:{backgroundColor:'#FF6B6B'},
  tarjetaVerde:{backgroundColor:'#2bc520ff'},



});