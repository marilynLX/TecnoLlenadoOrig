"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Alert, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTinacoController } from "@/hooks/ManejoTinaco"
import { db } from "@/lib/firebase"
import { doc, onSnapshot } from "firebase/firestore"

export default function HomeScreen() {
  const { estadoBomba, modo, cambiarModo, handlerEncenderBomba, handlerApagarBomba } = useTinacoController()

  const [nivelAgua, setNivelAgua] = useState("")
  const [isBombaEncendida, setIsBombaEncendida] = useState(false)

  useEffect(() => {
    const docRef = doc(db, "tinaco", "estado")

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const estado = docSnapshot.data().level || "Desconocido"
        console.log("📡 Datos recibidos de Firestore:", estado)
        setNivelAgua(estado)
      } else {
        console.log("⚠ Documento no encontrado en Firestore")
      }
    })

    return () => unsubscribe()
  }, [])

  // Función para manejar el cambio del interruptor
  const toggleSwitch = () => {
    if (nivelAgua === "Lleno") {
      Alert.alert("¡Atención!", "No se puede encender la bomba porque el tinaco está lleno.")
      return
    }

    if (!isBombaEncendida) {
      handlerEncenderBomba()
      Alert.alert("Bomba Encendida", "La bomba se ha encendido correctamente.")
    } else {
      handlerApagarBomba()
    }
    setIsBombaEncendida((prevState) => !prevState)
  }

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={style.linear}>
      <View style={style.container}>
        <Text style={style.title}>Sistema de Control de Tinaco</Text>

        {/* Selector de modo estilo segmentado */}
        <View style={style.modeSelector}>
          <Text style={style.modeLabel}>Modo de operación:</Text>
          <View style={style.segmentedControl}>
            <Pressable
              style={[style.segmentButton, modo === "manual" ? style.segmentActive : style.segmentInactive]}
              onPress={() => cambiarModo("manual")}
            >
              <Text
                style={[style.segmentText, modo === "manual" ? style.segmentTextActive : style.segmentTextInactive]}
              >
                Manual
              </Text>
            </Pressable>
            <Pressable
              style={[style.segmentButton, modo === "automatico" ? style.segmentActive : style.segmentInactive]}
              onPress={() => cambiarModo("automatico")}
            >
              <Text
                style={[style.segmentText, modo === "automatico" ? style.segmentTextActive : style.segmentTextInactive]}
              >
                Automático
              </Text>
            </Pressable>
          </View>
        </View>

        {modo === "manual" && (
          <View style={style.controlPanel}>
            <Text style={style.controlTitle}>Control Manual</Text>
            <View style={style.toggleContainer}>
              <Text style={style.toggleLabel}>Estado de la bomba</Text>
              <View style={style.toggleSwitch}>
                <Pressable
                  style={[style.toggleOption, isBombaEncendida ? style.toggleActive : style.toggleInactive]}
                  onPress={() => {
                    if (nivelAgua === "Lleno") {
                      Alert.alert("¡Atención!", "No se puede encender la bomba porque el tinaco está lleno.")
                      return
                    }
                    handlerEncenderBomba()
                    setIsBombaEncendida(true)
                    Alert.alert("Bomba Encendida", "La bomba se ha encendido correctamente.")
                  }}
                >
                  <Text
                    style={[style.toggleText, isBombaEncendida ? style.toggleTextActive : style.toggleTextInactive]}
                  >
                    Encendido
                  </Text>
                </Pressable>
                <Pressable
                  style={[style.toggleOption, !isBombaEncendida ? style.toggleActive : style.toggleInactive]}
                  onPress={() => {
                    handlerApagarBomba()
                    setIsBombaEncendida(false)
                  }}
                >
                  <Text
                    style={[style.toggleText, !isBombaEncendida ? style.toggleTextActive : style.toggleTextInactive]}
                  >
                    Apagado
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        <View style={style.statusContainer}>
          <View style={style.statusCard}>
            <Text style={style.statusTitle}>Estado del Tinaco:</Text>
            <Text style={style.statusValue}>{nivelAgua}</Text>
          </View>

          <View style={style.statusCard}>
            <Text style={style.statusTitle}>Estado de la Bomba:</Text>
            <Text style={style.statusValue}>{estadoBomba}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  linear: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },

  // Estilos para el selector de modo segmentado
  modeSelector: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "90%",
    backgroundColor: "#f5f7fa",
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: "#e6eeff",
  },
  segmentInactive: {
    backgroundColor: "white",
  },
  segmentText: {
    fontWeight: "600",
    fontSize: 16,
  },
  segmentTextActive: {
    color: "#3b7583",
  },
  segmentTextInactive: {
    color: "#666",
  },

  // Estilos para el panel de control manual
  controlPanel: {
    width: "90%",
    backgroundColor: "#f5f7fa",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  toggleContainer: {
    width: "100%",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#555",
  },
  toggleSwitch: {
    flexDirection: "row",
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0D7BA",
    backgroundColor: "#FBE8D3",
    width: "80%",
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleInactive: {
    backgroundColor: "transparent",
  },
  toggleText: {
    fontWeight: "600",
    fontSize: 15,
  },
  toggleTextActive: {
    color: "#333",
  },
  toggleTextInactive: {
    color: "#8A7A66",
  },

  // Estilos para la sección de estado
  statusContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b7583",
  },
})