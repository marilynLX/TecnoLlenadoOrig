import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Boton from '@/components/components/botones';
import { useTinacoController } from '@/hooks/ManejoTinaco';
import { db } from '@/lib/firebase'; // Asegúrate de que esta ruta es correcta
import { doc, onSnapshot } from 'firebase/firestore';


export default function HomeScreen() {
  const { estadoBomba, modo, bombaEncendida, 
    cambiarModo, handlerEncenderBomba, handlerApagarBomba } 
    = useTinacoController();

  const [nivelAgua, setNivelAgua] = useState('');
  useEffect(() => {
    const docRef = doc(db, 'tinaco', 'estado');
  
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const estado = docSnapshot.data().level || 'Desconocido';
        console.log('📡 Datos recibidos de Firestore:', estado); 
        setNivelAgua(estado);
      } else {
        console.log('⚠️ Documento no encontrado en Firestore');
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  


  return (
    <LinearGradient colors={['#B3E5FC', '#81D4FA', '#4FC3F7']} style={style.linear}>
      <View style={style.container}>
        <Text style={style.title}>Sistema de Control de Tinaco</Text>

        <View style={style.buttonContainer}>
          <Boton estiloBoton={style.button1} 
          texto="MODO MANUAL" 
          onPress={() => cambiarModo('manual')} 
          />

          <Boton estiloBoton={style.button2} 
          texto="MODO AUTOMÁTICO" 
          onPress={() => cambiarModo('automatico')} 
          />
        </View>

        {modo === 'manual' && (
          <View style={style.botoneraManual}>
        <Boton
          estiloBoton={style.botonManual}
          texto={bombaEncendida ? 'APAGAR BOMBA' : nivelAgua === 'Lleno' ? 'NO SE PUEDE ENCENDER' : 'ENCENDER BOMBA'}
          onPress={nivelAgua === 'Lleno' ? () => {} : bombaEncendida ? handlerApagarBomba : handlerEncenderBomba}
        />



          </View>
        )}

        <View style={style.contentStatus}>
          <Text style={style.status}>Estado del Tinaco: {nivelAgua}</Text>
          <Text style={style.status}>Estado de la Bomba: {estadoBomba}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 5, justifyContent: 'space-around', alignItems: 'center', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  linear: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 500 },
  buttonContainer: { position: 'absolute', width: '75%', height: '50%' },
  button1: { borderRadius: 20, backgroundColor: '#3b7583', width: 250, marginTop: 100 },
  button2: { borderRadius: 20, width: 250, backgroundColor: '#3b7583' },
  status: { fontSize: 16, fontWeight: '600', color: 'gray' },
  contentStatus: { position: 'absolute', marginTop: 450 },
  botoneraManual: { position: 'absolute', top: 375, width: '100%', justifyContent: 'center', marginStart: 90 },
  botonManual: { borderRadius: 20, backgroundColor: '#3b7583', width: 250, marginTop: 20 },
});
