import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Constants from 'expo-constants';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/v1/usuarios/';
  }

  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;

  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return `http://${ip}:5000/v1/usuarios/`;
    }
  }

  return Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/v1/usuarios/'
    : 'http://localhost:5000/v1/usuarios/';
};

const API_URL = getApiUrl();
const AUTH_HEADER = 'Basic YWRtaW46MTIzNA==';

export default function EditarUsuarioScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params?.id ? String(params.id) : '';
  const [nombre, setNombre] = useState(params?.nombre ? String(params.nombre) : '');
  const [edad, setEdad] = useState(params?.edad ? String(params.edad) : '');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (params?.nombre) setNombre(String(params.nombre));
    if (params?.edad) setEdad(String(params.edad));
  }, [params?.nombre, params?.edad]);

  const mostrarMensaje = (titulo, mensaje, callback) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
      if (callback) callback();
    } else {
      Alert.alert(titulo, mensaje, [
        { text: 'OK', onPress: callback },
      ]);
    }
  };

  const actualizarUsuario = async () => {
    if (!id) {
      mostrarMensaje('Error', 'No se encontró el ID del usuario.');
      return;
    }

    if (nombre.trim() === '' || String(edad).trim() === '') {
      mostrarMensaje('Vacíos', 'Completa todos los campos.');
      return;
    }

    if (nombre.trim().length < 3) {
      mostrarMensaje('Error', 'El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 0 || edadNum > 120) {
      mostrarMensaje('Error', 'Ingresa una edad válida (entre 0 y 120 años).');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_HEADER,
        },
        body: JSON.stringify({ nombre: nombre.trim(), edad: edadNum }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      console.log('Respuesta API actualización:', datos);

      mostrarMensaje('Éxito', 'Usuario actualizado correctamente.', () => {
        router.replace('/(tabs)/consulta');
      });
    } catch (error) {
      console.log('Error API al actualizar:', error);
      mostrarMensaje('Error', 'No fue posible actualizar el usuario.');
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
                Editar Usuario #{id}
              </Text>

              <Text style={styles.label}>Nombre del usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del usuario"
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.label}>Edad (años)</Text>
              <TextInput
                style={styles.input}
                placeholder="Edad del usuario"
                keyboardType="numeric"
                value={edad}
                onChangeText={setEdad}
              />

              <Pressable
                style={styles.boton}
                onPress={actualizarUsuario}
                disabled={cargando}
              >
                {cargando ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.textoBoton}>Guardar Cambios</Text>
                )}
              </Pressable>

              <Pressable
                style={styles.botonCancelar}
                onPress={() => router.back()}
                disabled={cargando}
              >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 8,
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
  },
  boton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonCancelar: {
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
  textoBotonCancelar: {
    color: '#4B5563',
    fontSize: 16,
  },
});
