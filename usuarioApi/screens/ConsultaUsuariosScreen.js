import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
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

export default function ConsultaUsuariosScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      console.log("Respuesta de la API:", datos);
      setUsuarios(datos.usuarios || []);
    } catch (error) {
      console.log("Error de la API:", error);
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable
        style={styles.botonDetalle}
        onPress={() => {
          router.push({
            pathname: '/detalles',
            params: {
              id: String(item.id),
              nombre: String(item.nombre),
              edad: String(item.edad),
            },
          });
        }}
      >
        <Text style={styles.textoBotonDetalle}>Ver detalle</Text>
      </Pressable>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={cargando}
        onRefresh={obtenerUsuarios}
        ListEmptyComponent={
          !cargando ? (
            <Text style={styles.vacioTexto}>
              No hay usuarios registrados aún.
            </Text>
          ) : null
        }
      />

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },

  titulo: {
    fontSize: Platform.OS === 'android' ? 24 : 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
    }),
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  vacioTexto: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 40,
  },

  botonDetalle: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  textoBotonDetalle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

});