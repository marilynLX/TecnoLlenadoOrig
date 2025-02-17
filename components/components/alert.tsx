import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface AlertItemProps {
  message: string;
}

export default function AlertItem({ message }: AlertItemProps) {
  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    padding: 10,
    backgroundColor: '#3b7583',
    borderRadius: 5,
    marginVertical: 5,
  },
  alertText: {
    fontSize: 16,
    color: 'black',
  },
});
