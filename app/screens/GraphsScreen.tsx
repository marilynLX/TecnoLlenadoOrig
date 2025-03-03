// Simulacion-consumir-firease.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { subscribeTinacoData } from '@/lib/service1';

// Altura fija del contenedor que simula el tinaco
const TINACO_HEIGHT = 300;

// Definimos un tipo para los datos que vienen desde Firestore
interface TinacoData {
  minimo?: number;
  medio?: number;
  maximo?: number;
}

export default function SimulacionDatosTinacoScreen() {
  // Estado para almacenar los datos de Firestore
  const [firebaseTinaco, setFirebaseTinaco] = useState<TinacoData>({});
  // Estado para el nivel simulado, valor ingresado por el usuario (1 a 100)
  const [simulatedLevel, setSimulatedLevel] = useState<number>(50);

  // Valor compartido para la animación (0 a 1)
  const fillProgress = useSharedValue(0);

  // Suscribirse a los datos de Firestore en tiempo real
  useEffect(() => {
    const unsubscribe = subscribeTinacoData((data) => {
      setFirebaseTinaco({
        minimo: data.minimo ?? 0,
        medio: data.medio ?? 0,
        maximo: data.maximo ?? 0,
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Cada vez que cambia el nivel simulado, actualizamos la animación
  useEffect(() => {
    const ratio = simulatedLevel / 100; // Convertir a relación 0-1
    fillProgress.value = withTiming(ratio, { duration: 500 });
  }, [simulatedLevel]);

  // Estilo animado que ajusta la altura de la “barra de agua” en función del valor
  const animatedWaterStyle = useAnimatedStyle(() => ({
    height: fillProgress.value * TINACO_HEIGHT,
  }));

  // Función para determinar la etiqueta según el valor simulado
  const getLevelLabel = (level: number): string => {
    if (level <= 35) return 'Mínimo';
    else if (level >= 36 && level <= 80) return 'Medio';
    else if (level >= 81) return 'Máximo';
    return '';
  };

  return (
    <LinearGradient
      colors={['#B3E5FC', '#81D4FA', '#4FC3F7']}
      style={styles.linear}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Llenado del tinaco</Text>
        
        {/* Se muestran los datos obtenidos desde Firestore */}
        <View style={styles.firebaseData}>
          <Text style={styles.subtitle}>Datos de Firebase</Text>
          <Text>Mínimo: {firebaseTinaco.minimo}</Text>
          <Text>Medio: {firebaseTinaco.medio}</Text>
          <Text>Máximo: {firebaseTinaco.maximo}</Text>
        </View>
        
        {/* Contenedor del tinaco con animación de llenado */}
        <View style={styles.tinacoContainer}>
          <View style={styles.tinaco}>
            <Animated.View style={[styles.water, animatedWaterStyle]} />
          </View>
          {/* Se muestra el porcentaje y la etiqueta según el valor simulado */}
          <Text style={styles.label}>
            {simulatedLevel}% Lleno - {getLevelLabel(simulatedLevel)}
          </Text>
        </View>
        
        {/* Slider para ajustar manualmente el nivel simulado (1 a 100) */}
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={simulatedLevel}
          onValueChange={(value) => setSimulatedLevel(value)}
          minimumTrackTintColor="#4FC3F7"
          maximumTrackTintColor="#3b7583"
          thumbTintColor="#3b7583"
        />
        <Text style={styles.sliderLabel}>Nivel Actual: {simulatedLevel}%</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linear: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  firebaseData: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  tinacoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tinaco: {
    width: 100,
    height: TINACO_HEIGHT,
    borderWidth: 2,
    borderColor: '#3b7583',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0f7fa',
    justifyContent: 'flex-end', // La “barra de agua” se llena desde abajo
  },
  water: {
    width: '100%',
    backgroundColor: '#4FC3F7',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
});