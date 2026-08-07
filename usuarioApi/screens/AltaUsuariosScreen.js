import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { apiFetch, getApiErrorMessage } from '../config/api';

export default function AltaUsuariosScreen() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarUsuario = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacíos','Completa todos los campos.');
      return;
    }

    if (nombre.trim().length < 3) {
      mostrarMensaje('Error','El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 0 || edadNum > 120) {
      mostrarMensaje('Error','Ingresa una edad válida (entre 0 y 120 años).');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await apiFetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre.trim(), edad: edadNum }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      console.log('Respuesta API:', datos);
      mostrarMensaje('Éxito','Usuario registrado correctamente.');

      setNombre('');
      setEdad('');
    } catch (error) {
      console.log('Error API', error);
      mostrarMensaje('Error', getApiErrorMessage(error));
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>

              <Text style={styles.titulo}>
                Registro de Usuarios
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nombre del usuario"
                placeholderTextColor="#9CA3AF"
                value={nombre}
                onChangeText={setNombre}
              />

              <TextInput
                style={styles.input}
                placeholder="Edad del usuario"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={edad}
                onChangeText={setEdad}
              />

              <Pressable
                style={styles.boton}
                onPress={guardarUsuario}
                disabled={cargando}
              >
                <Text style={styles.textoBoton}>
                  {cargando ? 'Guardando...' : 'Agregar Usuario'}
                </Text>
              </Pressable>

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

      container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
      },

      scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 80,
      },

      card: {
        marginVertical: 'auto',
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },

      titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
        color: '#1F2937',
      },

      input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 18,
        backgroundColor: '#F9FAFB',
        fontSize: 16,
        color: '#111827',
      },

      boton: {
        backgroundColor: '#29bb0c',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
      },

      textoBoton: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
      },

    });
