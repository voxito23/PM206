/* Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuScreen from './screens/MenuScreen';

/* Zona 2: Main - Hogar de los componentes */

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>

        <MenuScreen/>

        <StatusBar style="auto" />

      </View>
    </SafeAreaProvider>
  );
}

/* Zona 3: Estilos y posicionamiento */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tarjetaRoja: { backgroundColor: '#FF6B6B' },
  tarjetaVerde: { backgroundColor: '#2bc520ff' },
});