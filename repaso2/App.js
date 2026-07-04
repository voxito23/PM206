/* Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LibrosScreen from './screens/LibrosScreen';

/* Zona 2: Main - Hogar de los componentes */

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LibrosScreen />
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
});
