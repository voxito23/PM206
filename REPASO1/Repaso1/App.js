/* Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Alert,
  Platform,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';

/* Zona 2: Main - Hogar de los componentes */

export default function App() {
  // Estados para los TextInput
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');

  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const alertasManager = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  // Función para enviar el registro
  const enviarRegistro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    // Validar que no haya campos vacíos
    if (!nombre.trim() || !carrera.trim() || !cuatrimestre.trim()) {
      alertasManager('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }

    // Validar que cuatrimestre sea numerico
    if (isNaN(cuatrimestre) || cuatrimestre.trim() === '') {
      alertasManager('Error', 'El cuatrimestre debe ser un número.');
      return;
    }

    // Mostrar Alert con los datos del registro
    const mensaje =
      `Nombre: ${nombre}\n` +
      `Carrera: ${carrera}\n` +
      `Cuatrimestre: ${cuatrimestre}\n` +
      `Taller: ${taller ? 'Si' : 'No'}\n` +
      `Constancia: ${constancia ? 'Si' : 'No'}\n` +
      `Deportes: ${deportes ? 'Si' : 'No'}`;

    alertasManager('Registro enviado', mensaje);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Titulo */}
        <Text style={styles.titulo}>Registro de Evento Universitario</Text>

        {/* TextInput nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* TextInput teclado */}
        <TextInput
          style={styles.input}
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
        />

        {/* TextInput teclado numerico*/}
        <TextInput
          style={styles.input}
          placeholder="Cuatrimestre"
          value={cuatrimestre}
          onChangeText={setCuatrimestre}
          keyboardType="numeric"
          maxLength={2}
        />

        {/* Opciones */}
        <Text style={styles.seccionTitulo}>Opciones</Text>

        {/* Preguntas */}
        <View style={styles.switchFila}>
          <Text style={styles.switchTexto}>¿Asistirá al taller?</Text>
          <Switch
            value={taller}
            onValueChange={(valor) => setTaller(valor)}
            trackColor={{ false: '#767577', true: 'lightblue' }}
            thumbColor={'#f4f3f4'}
          />
        </View>

        {}
        <View style={styles.switchFila}>
          <Text style={styles.switchTexto}>¿Requiere constancia?</Text>
          <Switch
            value={constancia}
            onValueChange={(valor) => setConstancia(valor)}
            trackColor={{ false: '#767577', true: 'lightblue' }}
            thumbColor={'#f4f3f4'}
          />
        </View>

        {}
        <View style={styles.switchFila}>
          <Text style={styles.switchTexto}>¿Participará en actividades deportivas?</Text>
          <Switch
            value={deportes}
            onValueChange={(valor) => setDeportes(valor)}
            trackColor={{ false: '#767577', true: 'lightblue' }}
            thumbColor={'#f4f3f4'}
          />
        </View>

        {/* Enviar Registro */}
        <Pressable style={styles.boton} onPress={enviarRegistro}>
          <Text style={styles.botonTexto}>Enviar Registro</Text>
        </Pressable>

        <StatusBar style="auto" />

      </View>
    </ScrollView>
  );
}

/* Zona 3: Estilos y posicionamiento */

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  seccionTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  switchFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchTexto: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  boton: {
    backgroundColor: '#1a6fb5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
