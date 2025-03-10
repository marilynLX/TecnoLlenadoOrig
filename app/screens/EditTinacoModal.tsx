
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface EditTinacoModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function EditTinacoModal({ visible, onClose }: EditTinacoModalProps) {
  // Estados para almacenar los valores actuales del documento
  const [minimo, setMinimo] = useState<string>('');
  const [medio, setMedio] = useState<string>('');
  const [maximo, setMaximo] = useState<string>('');

  // Cargar datos desde Firestore cuando el modal se muestre
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'contenedor-porcentaje', '8yjQznwuJcg7T1aquFqB');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setMinimo(data.minimo?.toString() || '');
          setMedio(data.medio?.toString() || '');
          setMaximo(data.maximo?.toString() || '');
        } else {
          console.warn('El documento no existe');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    if (visible) {
      fetchData();
    }
  }, [visible]);

  // Función para actualizar los valores en Firestore
  const handleUpdate = async () => {
    const newMinimo = parseFloat(minimo);
    const newMedio = parseFloat(medio);
    const newMaximo = parseFloat(maximo);

    if (isNaN(newMinimo) || isNaN(newMedio) || isNaN(newMaximo)) {
      Alert.alert('Error', 'Por favor, ingrese valores numéricos válidos.');
      return;
    }

    try {
      const docRef = doc(db, 'contenedor-porcentaje', '8yjQznwuJcg7T1aquFqB');
      await updateDoc(docRef, {
        minimo: newMinimo,
        medio: newMedio,
        maximo: newMaximo,
      });
      Alert.alert('Éxito', 'Valores actualizados correctamente.');
      onClose();
    } catch (error) {
      console.error('Error al actualizar los valores:', error);
      Alert.alert('Error', 'No se pudieron actualizar los valores.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Valores del Tinaco</Text>
          
          <Text style={styles.inputLabel}>Mínimo:</Text>
          <TextInput
            style={styles.input}
            value={minimo}
            onChangeText={setMinimo}
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Medio:</Text>
          <TextInput
            style={styles.input}
            value={medio}
            onChangeText={setMedio}
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Máximo:</Text>
          <TextInput
            style={styles.input}
            value={maximo}
            onChangeText={setMaximo}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Actualizar Valores</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#4FC3F7',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});