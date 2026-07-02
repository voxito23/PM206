import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Animated } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import ListasScreen from './ListasScreen';
import ImageScreen from './ImageScreen';
import IndicadorScreen from './IndicadorScreen';
import ModalScreen from './ModalScreen';

const MENU_ITEMS = [
  { id: 'tarjetas', title: 'Tarjetas' },
  { id: 'safeArea', title: 'SafeArea' },
  { id: 'pressable', title: 'Pressable & Switch' },
  { id: 'textInput', title: 'TextInput & Alert' },
  { id: 'listas', title: 'FlatList & SectionList' },
  { id: 'imageBg', title: 'ImageBackground' },
  { id: 'indicador', title: 'ActivityIndicator' },
  { id: 'modal', title: 'Modal & BottomSheet' },
];

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');
  const backButtonOpacity = useRef(new Animated.Value(1)).current;
  const backButtonTranslateY = useRef(new Animated.Value(0)).current;
  const lastTouchY = useRef(0);
  const wrapperRef = useRef(null);
  const isHidden = useRef(false);

  // Funciones reutilizables para ocultar/mostrar
  const ocultarBoton = useCallback(() => {
    if (isHidden.current) return;
    isHidden.current = true;
    Animated.parallel([
      Animated.timing(backButtonOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonTranslateY, {
        toValue: -60,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backButtonOpacity, backButtonTranslateY]);

  const mostrarBoton = useCallback(() => {
    if (!isHidden.current) return;
    isHidden.current = false;
    Animated.parallel([
      Animated.timing(backButtonOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backButtonOpacity, backButtonTranslateY]);

  // ── Web: detectar scroll con rueda del mouse ──
  useEffect(() => {
    if (screen === 'menu') return;

    const node = wrapperRef.current;
    if (!node) return;

    const handleWheel = (e) => {
      if (e.deltaY > 5) {
        ocultarBoton();
      } else if (e.deltaY < -5) {
        mostrarBoton();
      }
    };

    if (node.addEventListener) {
      node.addEventListener('wheel', handleWheel, { passive: true });
      return () => node.removeEventListener('wheel', handleWheel);
    }
  }, [screen, ocultarBoton, mostrarBoton]);

  // ── Móvil: detectar scroll con touch ──
  const handleTouchStart = (e) => {
    lastTouchY.current = e.nativeEvent.pageY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.nativeEvent.pageY;
    const diff = currentY - lastTouchY.current;

    if (diff < -8) {
      ocultarBoton();
      lastTouchY.current = currentY;
    } else if (diff > 8) {
      mostrarBoton();
      lastTouchY.current = currentY;
    }
  };

  // Resetear animación al volver al menú
  const volverAlMenu = () => {
    backButtonOpacity.setValue(1);
    backButtonTranslateY.setValue(0);
    isHidden.current = false;
    setScreen('menu');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'tarjetas': return <TarjetasScreen />;
      case 'safeArea': return <SafeAreaScreen />;
      case 'pressable': return <PressableScreen />;
      case 'textInput': return <TextInputScreen />;
      case 'listas': return <ListasScreen />;
      case 'imageBg': return <ImageScreen />;
      case 'indicador': return <IndicadorScreen />;
      case 'modal': return <ModalScreen />;
      default: return null;
    }
  };

  if (screen !== 'menu') {
    return (
      <View
        ref={wrapperRef}
        style={{ flex: 1 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {renderScreen()}
        <Animated.View
          style={[
            styles.floatingBackButton,
            {
              opacity: backButtonOpacity,
              transform: [{ translateY: backButtonTranslateY }],
            },
          ]}
        >
          <TouchableOpacity onPress={volverAlMenu}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Menú de Prácticas</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.boton} 
              onPress={() => setScreen(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.textoBoton}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    paddingTop: 40,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 16,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FAFAFA',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  boton: {
    backgroundColor: '#439ce4ff',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  backText: {
    color: '#FAFAFA',
    fontWeight: '500',
    fontSize: 15,
  },
});

