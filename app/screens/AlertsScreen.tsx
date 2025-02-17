import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AlertItem from '@/components/components/alert';

const alerts = [
  { id: '1', message: 'Nivel bajo de agua' },
  { id: '2', message: 'Nivel medio de agua' },
  { id: '3', message: 'Nivel lleno de agua' },
  { id: '4', message: 'Se encendio la bomba' },
  { id: '5', message: 'Se apago la bomba' },
];

export default function AlertsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlertItem message={item.message} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

