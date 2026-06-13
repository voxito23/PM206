/* ZONA 1: IMPORTACIONES DE COMPONENTES Y ARCHIVOS */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from './components/perfil';



/* ZONA 2: MAIN - HOGAR DE LOS COMPONENTES */

export default function App() {
  return (
    <View style={styles.container}>

      <View style={{ alignItems: 'flex-start' }}>
        <Perfil nombre="Victor Hernandez" 
        carrera="Ingeniería de Sistemas Computacionales" 
        materia="Programación Móvil"  
        cuatri="9" 
        ></Perfil> 
        
        <Text>----------------------------------------</Text>
        <Text>----------------------------------------</Text>

        <Perfil nombre="Belen Vega" 
        carrera="Ingeniería de Sistemas Computacionales" 
        materia="Programación Movil"  
        cuatri="9" 
        ></Perfil>  
      </View> 

      <StatusBar style="auto" />
    </View>
  );
}



/* ZONA 3: ESTILOS Y POSICIONAMIENTOS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



