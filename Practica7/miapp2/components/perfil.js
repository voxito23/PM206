/*Perfil Usando Props */

import { Text, View, Button, StyleSheet 
  
} from 'react-native';

import React, { useState } from 'react';

const estiolos = StyleSheet.create({
  nombre: {
    fontSize: 24,
    fontWeight: '700',
    textTransform: "uppercase"
  },

  carrera: {
    fontSize: 18,
    color: 'blue',
    fontFamily: 'Arial'
  },

  otroTexto: {
    fontSize: 12,
    fontFamily: 'Courier',
    fontStyle: 'italic'
  },

  tarjeta: {
    borderWidth: 3,
    margin: 20,
    padding: 25,
  }
});

/*Perfil Usando destructuración */
export const Perfil = ({ nombre, carrera, materia, semestre, estiloE }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View style={[estiolos.tarjeta, estiloE]}>
      <Text style={estiolos.nombre}>{nombre}</Text>

      {mostrar && (
        <>
          <Text style={estiolos.carrera}>{carrera} </Text>
          <Text style={estiolos.otroTexto}>{materia}</Text>
          <Text style={estiolos.otroTexto}>{semestre}</Text>
        </>
      )}

      <Button
        title="Ver perfil"
        onPress={() => setMostrar(!mostrar)}
      />
    </View>
  );
};