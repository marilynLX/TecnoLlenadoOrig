import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import AlertItem from '@/components/components/alert';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '@/lib/firebase'; // Asegúrate de que esta ruta sea correcta
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Alert from '@/domain/entities/Alert';

export default function AlertsScreen() {
  // Estados
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para marcar una alerta como "eliminada"
  const handleDeleteAlert = async (alertId: string) => {
    if (!alertId || typeof alertId !== 'string') {
      console.error("Error: El ID de la alerta no es válido");
      alert("Hubo un error con el ID de la alerta.");
      return;
    }
  
    try {
      const alertRef = doc(db, 'alerts', alertId);
      // Actualiza el campo 'status' de la alerta a 'deleted'
      await updateDoc(alertRef, { status: 'deleted' });
      alert("Alerta marcada como eliminada!");
    } catch (e) {
      console.error("Error actualizando alerta: ", e);
      alert("Hubo un error al actualizar la alerta.");
    }
  };
  
  

  useEffect(() => {
    const alertsRef = collection(db, 'alerts');
  
    const unsubscribe = onSnapshot(alertsRef, (snapshot) => {
      const alertasFirestore: Alert[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Alert[];
  
      // Filtramos las alertas para que solo se muestren las activas
      const activeAlerts = alertasFirestore.filter((alert) => alert.status !== 'deleted');
      
      setAlerts(activeAlerts);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <LinearGradient colors={['#B3E5FC', '#81D4FA', '#4FC3F7']} style={style.linear}>
      <View style={style.container}>
        <Text style={style.title}>Alertas</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#4FC3F7" />
        ) : (
          <FlatList
            style={style.flat}
            data={alerts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={style.alertItem}>
                <AlertItem message={item.message} />
                <Button title="Eliminar" color="red" onPress={() => {
                console.log("Eliminando alerta con ID: ", item.id);
                handleDeleteAlert(item.id);
}} />

              </View>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}

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
  linear: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  flat: {
    width: '90%',
  },
  alertItem: {
    marginBottom: 20,
    alignItems: 'center',
  }
});
