import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Boton from '@/components/components/botones';
import { ObtenerNivelAgua } from '@/domain/useCases/ObtenerEstadoTinaco';
import { BombaAgua } from '@/domain/useCases/OnOff';

export default function HomeScreen1 () {
  const [nivelAgua, setNivelAgua] = useState('');
  const [estadoBomba, setEstadoBomba] = useState('');

  useEffect(() => {
    const obtenerEstado = () => {
      //  estado del tinaco
      const nivel = new ObtenerNivelAgua().execute().nivel;
      setNivelAgua(nivel);

      // Determinar estado de la bomba (ejemplo: encendida si está vacío)
      const bomba = new BombaAgua().execute(nivel === 'Vacio');
      setEstadoBomba(bomba);
    };

    obtenerEstado();
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.title}>Sistema de Control de Tinaco</Text>
      <Boton estiloBoton={style.button1} texto='MODO MANUAL' onPress={() => console.log('Manual')} />
      <Boton estiloBoton={style.button2} texto='MODO AUTOMÁTICO' onPress={() => console.log('Automático')} />
<View style={style.content}>
      <Text style={style.status}>Estado del Tinaco: {nivelAgua}</Text>
      <Text style={style.status}>Estado de la Bomba: {estadoBomba}</Text>
</View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 200,
  },
  button1:{
    borderRadius:20,
    backgroundColor:'#3b7583',
    padding:10,
    marginTop:10,
  },
  button2:{
    borderRadius:20,
    backgroundColor:'#3b7583',
    padding:10,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  content:{
    position:'absolute',
    marginTop:450,
  }
});


