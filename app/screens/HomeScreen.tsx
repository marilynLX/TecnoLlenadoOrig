import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Boton from '@/components/components/botones';
import { ObtenerNivelAgua } from '@/domain/useCases/ObtenerEstadoTinaco';
import { BombaAgua } from '@/domain/useCases/OnOff';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen1 () {
  const [nivelAgua, setNivelAgua] = useState('');
  const [estadoBomba, setEstadoBomba] = useState('');

  useEffect(() => {
    const obtenerEstado = () => {
      //  estado del tinaco
      const nivel = new ObtenerNivelAgua().execute().nivel;
      setNivelAgua(nivel);

      // estado de la bomba, se enciende si esta vacio
      const bomba = new BombaAgua().execute(nivel === 'Vacio');
      setEstadoBomba(bomba);
    };

    obtenerEstado();
  }, []);

  return (
   
    <LinearGradient
    colors={['#B3E5FC', '#81D4FA', '#4FC3F7']}
    style={style.linear}
  >
    <View style={style.container}>
      <Text style={style.title}>Sistema de Control de Tinaco</Text>

      <View style={style.buttonContainer}>
      <Boton estiloBoton={style.button1} 
        texto='MODO MANUAL' 
        onPress={() => console.log('Manual')} 
        />
      <Boton estiloBoton={style.button2} 
        texto='MODO AUTOMÁTICO' 
        onPress={() => console.log('Automático')} 
        />
      </View>

      <View style={style.contentStatus}>
        <Text style={style.status}>Estado del Tinaco: {nivelAgua}</Text>
        <Text style={style.status}>Estado de la Bomba: {estadoBomba}</Text>
      </View>
    </View>
  </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  linear:{
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 500,
  },
  buttonContainer: {
    position:'absolute',
    width:'75%',
    height:'50%',
  },
  button1:{
    borderRadius:20,
    backgroundColor:'#3b7583',
    width:250,
    marginTop:100,
  },
  button2:{
    borderRadius:20,
      width:250,
    backgroundColor:'#3b7583',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color:'gray',
  },
  contentStatus:{
    position:'absolute',
    marginTop:450,
  }
});


