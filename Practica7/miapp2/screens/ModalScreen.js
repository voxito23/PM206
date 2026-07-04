import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, 
  ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ModalBottomSheet() {
  const [productoVisible, setProductoVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Modal & BottomSheet</Text>
      <Text style={styles.subtitulo}>Ejemplos de modales en React Native</Text>

      <View style={{ width: '100%', gap: 14 }}>
        <TouchableOpacity style={styles.boton} activeOpacity={0.8}
          onPress={() => setProductoVisible(true)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.botonTitulo}>Ver Producto</Text>
            <Text style={styles.botonSub}>Modal con detalles del producto</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, { backgroundColor: '#7C3AED' }]} 
          activeOpacity={0.8} onPress={() => setBottomSheetVisible(true)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.botonTitulo}>Abrir Bottom Sheet</Text>
            <Text style={styles.botonSub}>Modal deslizable desde abajo</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
      </View>

      {/* Modal Producto */}
      <Modal animationType="fade" transparent visible={productoVisible}
        onRequestClose={() => setProductoVisible(false)}>
        <View style={styles.fondoModal}>
          <View style={styles.productoModal}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={require('../assets/rog.jpg')} 
                style={styles.imagen} resizeMode="contain" />

              <Pressable style={styles.cerrarX} 
                onPress={() => setProductoVisible(false)}>
                <Ionicons name="close" size={20} color="#fff" />
              </Pressable>

              <View style={styles.info}>
                <Text style={styles.productoTitulo}>ASUS ROG Gaming</Text>
                <Text style={styles.precio}>$24,999 MXN</Text>

                <View style={styles.separador} />

                <Text style={styles.seccion}>
                  <Ionicons name="information-circle-outline" size={16} color="#333" /> Descripción
                </Text>
                <Text style={styles.desc}>
                  Laptop gaming de alto rendimiento con procesador de última generación, 
                  pantalla de alta frecuencia y diseño Republic of Gamers.
                </Text>

                <View style={styles.separador} />

                <Text style={styles.seccion}>
                  <Ionicons name="settings-outline" size={16} color="#333" /> Especificaciones
                </Text>
                <View style={styles.specs}>
                  <View style={styles.specItem}>
                    <Ionicons name="hardware-chip-outline" size={18} color="#2563EB" />
                    <Text style={styles.specTexto}>Intel i9</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="server-outline" size={18} color="#2563EB" />
                    <Text style={styles.specTexto}>32GB RAM</Text>
                  </View>
                  <View style={styles.specItem}>
                    <MaterialIcons name="storage" size={18} color="#2563EB" />
                    <Text style={styles.specTexto}>1TB SSD</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="game-controller-outline" size={18} color="#2563EB" />
                    <Text style={styles.specTexto}>RTX 5070</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            <Pressable style={styles.botonComprar}
              onPress={() => { setProductoVisible(false); alert('Producto agregado al carrito'); }}>
              <Ionicons name="cart" size={18} color="#fff" />
              <Text style={styles.botonComprarTexto}>Comprar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Bottom Sheet */}
      <Modal animationType="slide" transparent visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}>
        <View style={styles.fondoSheet}>
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitulo}>Bottom Sheet</Text>
            <Text style={styles.sheetTexto}>Este es un Modal Bottom Sheet</Text>
            <Pressable style={styles.botonCerrar}
              onPress={() => setBottomSheetVisible(false)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, justifyContent: 'center', 
    alignItems: 'center', backgroundColor: '#f5f6fa', padding: 24 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
  subtitulo: { fontSize: 14, color: '#666', marginBottom: 28 },
  boton: { 
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#2563EB', padding: 14, borderRadius: 14 },
  botonIcono: { 
    width: 40, height: 40, borderRadius: 10, 
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center' },
  botonTitulo: { color: '#fff', fontSize: 15, fontWeight: '700' },
  botonSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 1 },

  /* Modal Producto */
  fondoModal: { 
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, elevation: 9999 },
  productoModal: { 
    backgroundColor: '#fff', borderRadius: 16, width: '90%', 
    maxHeight: '85%', overflow: 'hidden', elevation: 10 },
  imagen: { width: '100%', height: 240, backgroundColor: '#fff' },
  cerrarX: { 
    position: 'absolute', top: 10, left: 10, width: 32, height: 32,
    borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center' },
  info: { padding: 18 },
  productoTitulo: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' },
  precio: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginTop: 4 },
  separador: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 14 },
  seccion: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 8 },
  desc: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  specs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  specItem: { 
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#EFF6FF', paddingHorizontal: 10, 
    paddingVertical: 6, borderRadius: 8 },
  specTexto: { fontSize: 13, fontWeight: '600', color: '#2563EB' },
  botonComprar: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, margin: 14, paddingVertical: 12, borderRadius: 10,
    backgroundColor: '#10B981' },
  botonComprarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },

  /* Bottom Sheet */
  fondoSheet: { 
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9999, elevation: 9999 },
  bottomSheet: { 
    backgroundColor: '#fff', padding: 25, 
    borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' },
  sheetTitulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sheetTexto: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  botonCerrar: { 
    backgroundColor: '#2196F3', paddingHorizontal: 25,
    paddingVertical: 10, borderRadius: 8 },
});