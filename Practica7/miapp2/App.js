/* Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Perfil } from './components/perfil';

/* Zona 2: Main - Hogar de los componentes */

export default function App() {
  return (
    <View style={styles.container}>

      {/* <MenuScreen/> */}

      <Perfil estiloE={styles.tarjetaRoja} nombre="Victor" carrera="Sistemas" materia="Programacion Móvil" Cuatrimestre ="9no"/>
      <Perfil estiloE={styles.tarjetaVerde} nombre="Belen" carrera="Sistemas" materia="Programacion Móvil" Cuatrimestre="9no" />
      <Perfil estiloE={styles.tarjetaRoja} nombre="Mau" carrera="Sistemas" materia="Programacion Móvil" Cuatrimestre="9no"/>

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
    flexDirection: 'row',
    
    justifyContent: 'flex-start',
    justifyContent: 'center',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    justifyContent: 'space-evenly',
  },
  tarjetaRoja: { backgroundColor: '#FF6B6B' },
  tarjetaVerde: { backgroundColor: '#2bc520ff' },
});