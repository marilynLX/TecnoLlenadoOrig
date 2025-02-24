import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// Valores definidos en el Arduino
const nivelTinacoLleno = 3.0;       // Distancia en cm cuando el tinaco está lleno
const nivelTinacoVacioMax = 12.0;    // Distancia en cm cuando el tinaco está vacío

// Altura del contenedor del tinaco en la app
const TINACO_HEIGHT = 300;

export default function GraphsScreen() {
  // Valor compartido que representa el llenado (de 0 a 1)
  const fillProgress = useSharedValue(0);

  // Estilo animado que cambia la altura de la "barra de agua"
  const animatedWaterStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(fillProgress.value * TINACO_HEIGHT, { duration: 1000 }),
    };
  });
  // Función para mapear la distancia medida a un porcentaje (0 a 1)
  const calcularPorcentajeLlenado = (distancia: number): number => {
    // Si la distancia es mayor o igual que el valor para vacío, se asume 0%
    if (distancia >= nivelTinacoVacioMax) return 0;
    // Si la distancia es menor o igual que el valor para lleno, se asume 100%
    if (distancia <= nivelTinacoLleno) return 1;
    return (nivelTinacoVacioMax - distancia) / (nivelTinacoVacioMax - nivelTinacoLleno);
  };

  useEffect(() => {
    // Simulación de lectura de datos desde Arduino
    // Supongamos que recibes este dato (por ejemplo, 6.0 cm)
    const distanciaTinaco = 6.0; // Esto vendría desde el Arduino vía Serial o API
    const porcentaje = calcularPorcentajeLlenado(distanciaTinaco);
    
    // Actualiza el valor de la animación
    fillProgress.value = porcentaje;
  }, []);

  return (
    <LinearGradient
      colors={['#B3E5FC', '#81D4FA', '#4FC3F7']}
      style={styles.linear}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Llenado del Tinaco</Text>
        
        {/* Contenedor del tinaco */}
        <View style={styles.tinacoContainer}>
          <View style={styles.tinaco}>
            {/* Barra de agua animada */}
            <Animated.View style={[styles.water, animatedWaterStyle]} />
          </View>
          {/* Mostrar el porcentaje en texto */}
          <Text style={styles.label}>
            {(fillProgress.value * 100).toFixed(0)}% Lleno
          </Text>
        </View>
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
  tinacoContainer: {
    alignItems: 'center',
  },
  tinaco: {
    width: 100,
    height: TINACO_HEIGHT,
    borderWidth: 2,
    borderColor: '#3b7583',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0f7fa',
    justifyContent: 'flex-end', // La barra se llena desde abajo
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
});
