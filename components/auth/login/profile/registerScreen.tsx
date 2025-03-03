import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'expo-router';

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
        // Regresa al login luego de registrarse
        router.replace('./loginScreen');
      })
      .catch((error: any) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Registro de Usuario</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />

      {/* Botón para regresar a la pantalla de login sin registrarse */}
      <Button
        title="¿Ya tienes cuenta? Inicia sesión"
        onPress={() => router.push('/auth/login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     justifyContent: 'center', 
     padding: 20 ,
     backgroundColor:'white',
    },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5 },
});

export default RegisterScreen;
