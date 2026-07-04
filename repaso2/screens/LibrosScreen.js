import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LibrosScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  // Animaciones del Splash
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada del Splash
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación del Splash
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navegar después de 5 segundos
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const agregarLibro = async () => {
    // Validar que todos los campos estén llenos
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);
    setCountdown(4);

    // Iniciar cuenta regresiva cada segundo
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    let portadaUrl = null;
    try {
      // Buscar portada
      const query = encodeURIComponent(titulo.trim());
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}&limit=5`);
      const data = await response.json();
      
      // Buscar la portada
      const doc = data.docs?.find(d => d.cover_i);
      if (doc) {
        portadaUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
      }
    } catch (e) {
      console.log('Error buscando portada:', e);
    }

    // Animación de guardado
    setTimeout(() => {
      clearInterval(interval);
      setCountdown(0);
      
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
        portadaUrl,
      };

      setLibros((prevLibros) => [...prevLibros, nuevoLibro]);

      // Limpiar los TextInput
      setTitulo('');
      setAutor('');
      setGenero('');

      setGuardando(false);

      // Notificar con un Alert
      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  const renderLibro = ({ item }) => (
    <View style={styles.libroCard}>
      <View style={styles.libroContent}>
        <Text style={styles.libroTitulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.libroDetalle}>
          Autor: {item.autor}
        </Text>
        <Text style={styles.libroDetalle}>
          Género: {item.genero}
        </Text>
      </View>
      {item.portadaUrl ? (
        <View style={styles.portadaContainer}>
          <Image 
            source={{ uri: item.portadaUrl }} 
            style={styles.portada} 
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.portadaPlaceholder}>
          <FontAwesome5 name="book" size={30} color="#CBD5E1" />
        </View>
      )}
    </View>
  );

  // SPLASH SCREEN
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        {/* Fondo con círculos */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />

        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Ícono de libro estilizado */}
          <View style={styles.iconWrapper}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <View style={styles.globeContainer}>
                <FontAwesome5 name="globe-americas" size={48} color="#3B82F6" />
              </View>
            </Animated.View>
            <View style={styles.bookIcon}>
              <FontAwesome5 name="book-open" size={56} color="#1E293B" />
            </View>
            <View style={styles.sparkles}>
              <MaterialCommunityIcons name="star-four-points" size={24} color="#F59E0B" />
            </View>
          </View>

          <Animated.Text style={[styles.splashTitle, { opacity: fadeAnim }]}>
            repa2
          </Animated.Text>
          <Animated.Text style={[styles.splashSubtitle, { opacity: fadeAnim }]}>
            <FontAwesome5 name="book" size={14} color="#64748B" /> Registro de Libros Leídos
          </Animated.Text>
        </Animated.View>

        {/* Indicador de carga inferior */}
        <Animated.View style={[styles.loadingDots, { opacity: fadeAnim }]}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.splashLoadingText}>Cargando experiencia...</Text>
        </Animated.View>
      </View>
    );
  }

  // PANTALLA PRINCIPAL
  return (
    <ImageBackground
      source={require('../assets/batman.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Catálogo de Libros</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Título del libro"
              placeholderTextColor="rgba(100, 116, 139, 0.7)"
              value={titulo}
              onChangeText={setTitulo}
              editable={!guardando}
            />
            <TextInput
              style={styles.input}
              placeholder="Autor"
              placeholderTextColor="rgba(100, 116, 139, 0.7)"
              value={autor}
              onChangeText={setAutor}
              editable={!guardando}
            />
            <TextInput
              style={styles.input}
              placeholder="Género"
              placeholderTextColor="rgba(100, 116, 139, 0.7)"
              value={genero}
              onChangeText={setGenero}
              editable={!guardando}
            />

            {/* Botón Agregar */}
            <Pressable
              style={({ pressed }) => [
                styles.botonAgregar,
                pressed && styles.botonPresionado,
                guardando && styles.botonDeshabilitado,
              ]}
              onPress={agregarLibro}
              disabled={guardando}
            >
              <Text style={styles.botonTexto}>
                {guardando ? 'Guardando...' : 'Agregar Libro'}
              </Text>
            </Pressable>
          </View>

          {/* Animación de carga */}
          {guardando && (
            <View style={styles.proLoadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.proCountdownText}>
                {countdown > 0 ? `Guardando libro... ${countdown}s` : 'Cargado'}
              </Text>
            </View>
          )}

          {/* Contador de libros */}
          <View style={styles.contadorContainer}>
            <Text style={styles.contadorTexto}>
              Total de libros: {libros.length}
            </Text>
          </View>

          {/* Lista de libros */}
          <FlatList
            data={libros}
            renderItem={renderLibro}
            keyExtractor={(item) => item.id}
            style={styles.lista}
            contentContainerStyle={styles.listaContent}
            showsVerticalScrollIndicator={false}
          />
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ESTILOS SPLASH
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFBFE',
  },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    top: -50,
    right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    bottom: 100,
    left: -60,
  },
  circle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(245, 158, 11, 0.06)',
    top: 200,
    left: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  globeContainer: {
    position: 'absolute',
    top: 0,
  },
  globeEmoji: {
    fontSize: 48,
  },
  bookIcon: {
    marginTop: 30,
  },
  bookEmoji: {
    fontSize: 60,
  },
  sparkles: {
    position: 'absolute',
    top: -5,
    right: 10,
  },
  sparkleEmoji: {
    fontSize: 28,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: 1,
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  loadingDots: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    gap: 12,
  },
  splashLoadingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B82F6',
    letterSpacing: 0.5,
  },

  // ESTILOS PANTALLA PRINCIPAL
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  botonAgregar: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 4,
  },
  botonPresionado: {
    backgroundColor: '#1D4ED8',
    transform: [{ scale: 0.98 }],
  },
  botonDeshabilitado: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  loadingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  indicador: {
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  contadorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  contadorTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  lista: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listaContent: {
    paddingBottom: 30,
    gap: 10,
  },
  libroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  libroContent: {
    flex: 1,
    padding: 14,
  },
  libroTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  libroDetalle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  portadaContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    padding: 8,
  },
  portada: {
    width: 60,
    height: 90,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  portadaPlaceholder: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  proLoadingContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  proCountdownText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
