import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AlertItem from '@/components/components/alert';
import { LinearGradient } from 'expo-linear-gradient';

const alerts = [
  { id: '1', message: 'Nivel bajo de agua' },
  { id: '2', message: 'Nivel medio de agua' },
  { id: '3', message: 'Nivel lleno de agua' },
  { id: '4', message: 'Se encendio la bomba' },
  { id: '5', message: 'Se apago la bomba' },
];

export default function AlertsScreen() {
  return (
     <LinearGradient
        colors={['#B3E5FC', '#81D4FA', '#4FC3F7']}
        style={style.linear}
      >
    <View style={style.container}>
      <Text style={style.title}>Alertas</Text>
      <FlatList
      style={style.flat}
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlertItem message={item.message} />}
      />
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
  linear:{
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginTop:20,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  flat:{
    width:'90%',
  }

});

