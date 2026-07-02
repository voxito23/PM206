import React,  {useState} from 'react';
import { View, Text, StyleSheet, Button, Modal, Pressable } from 'react-native';

export default function ModalBottomSheet() {
    const [modalVisible, setModalVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    return (
    <View style={styles.container}> 
    <Text style={styles.titulo}>Modal & BottomSheet</Text>

    <View style={styles.botonesContainer}>
      <Button 
      title='Abrir Modal'
      onPress={() => setModalVisible(true)}
      />

      <Button 
      title='Abrir Bottom Sheet'
      onPress={() => setBottomSheetVisible(true)}
      />
    </View>

    {/* Modal Centrado */}
    <Modal
    animationType='fade'
    transparent={true}
    visible={modalVisible}
    >
      <View style={styles.fondoCentrado}>
        <View style={styles.modalCentrado}>
          <Text style={styles.textoTituloModal}>Modal Centrado</Text>
          <Text style={styles.texto}>Este es un modal tipo alerta centrado en la pantalla.</Text>
          <Pressable 
          style={styles.boton}
          onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textoBoton}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

    {/* Bottom Sheet */}
    <Modal
    animationType='slide'
    transparent={true}
    visible={bottomSheetVisible}
    >
      <View style={styles.fondo}>
        <View style={styles.bottomSheet}>
          <Text style={styles.textoTituloModal}>Bottom Sheet</Text>
          <Text style={styles.texto}>Este es un Modal Bottom Sheet</Text>
          <Pressable 
          style={styles.boton}
          onPress={() => setBottomSheetVisible(false)}
          >
            <Text style={styles.textoBoton}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botonesContainer: {
    gap: 12,
  },
  fondoCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCentrado: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fondo: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  textoTituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});