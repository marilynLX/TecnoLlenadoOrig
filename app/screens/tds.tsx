import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db, doc, onSnapshot } from "@/lib/firebase";

export default function TDSMonitor() {
  const [tds, setTds] = useState(0);
  const [quality, setQuality] = useState("Cargando...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateWaterQuality = (tdsValue: number) => {
    if (tdsValue <= 50) return "Excelente";
    if (tdsValue <= 150) return "Buena";
    if (tdsValue <= 300) return "Aceptable";
    if (tdsValue <= 500) return "Pobre";
    return "Inaceptable";
  };

  useEffect(() => {
    const tdsRef = doc(db, "tds", "datos");
    const unsubscribe = onSnapshot(
      tdsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.valor) {
            setTds(data.valor);
            setQuality(calculateWaterQuality(data.valor));
          } else {
            setError("Datos incompletos en la base de datos.");
          }
        } else {
          setError("No se encontró el documento en la base de datos.");
        }
        setLoading(false);
      },
      (err) => {
        setError("Error al obtener los datos: " + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getQualityColor = () => {
    switch (quality) {
      case "Excelente": return "#00C853"; // Verde
      case "Buena": return "#64DD17"; // Verde claro
      case "Aceptable": return "#FFEB3B"; // Amarillo
      case "Pobre": return "#FF9800"; // Naranja
      case "Inaceptable": return "#D50000"; // Rojo
      default: return "#B0BEC5"; 
    }
  };

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.container}>
      <Text style={styles.title}>Calidad del Agua 💧</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={[styles.card, { borderColor: getQualityColor() }]}>
          <Text style={styles.tds}>TDS: {tds} ppm</Text>
          <Text style={[styles.quality, { color: getQualityColor() }]}>
            Calidad: {quality}
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
  },
  tds: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  quality: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    color: "#D50000", // Rojo para los errores
    fontWeight: "bold",
    marginTop: 20,
  },
});
