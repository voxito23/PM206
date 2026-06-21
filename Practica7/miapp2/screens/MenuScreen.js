import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';

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
      <View style={{ flex: 1, backgroundColor: '#09090B' }}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        {renderScreen()}
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
  backButton: {
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

