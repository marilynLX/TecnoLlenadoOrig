import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useSessionState } from './context/sessionProvider';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import RegisterScreen from './profile/registerScreen';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Consumir el proveedor de sesión
  const { loading, login, user } = useSessionState();

  async function signInWithEmail() {
    login(email, password);
  }

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  return (
    <LinearGradient colors={['#B3E5FC', '#81D4FA', '#4FC3F7']} style={styles.linear}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Text>Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Text>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Iniciar sesión" disabled={loading} onPress={signInWithEmail} />
        </View>

        {/* Botón para registrarse si no tiene cuenta */}
        <View style={styles.mt20}>
          <Button title="¿No tienes cuenta? Regístrate" onPress={() => router.push('/auth/registerView')} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginStart: 20,
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  linear: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
