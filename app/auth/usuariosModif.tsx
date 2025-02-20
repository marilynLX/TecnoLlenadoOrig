import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function usuariosModifi() {

  return (
    <View style={style.container}>
        <Text>Modificar Usuarios</Text>
        <Text>Editar</Text>
        <Text>Eliminar</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white',
  },
});


