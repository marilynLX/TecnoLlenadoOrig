import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, Button, TextInput, Text, TouchableOpacity } from 'react-native'
import { useSessionState } from '../context/sessionProvider'
import { useRouter } from 'expo-router'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileView() {

  //estados para el manejo de las cajas de texto
  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('');
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { user, message, update, logout } = useSessionState();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>('');
  //

  useEffect(() => {
    if (!user) return;
    setName(user.displayName || '');
  }, [user]);

  const handlerUpdate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }
  
    setIsLoading(true);
    try {
      await update(name);
      Alert.alert("Éxito", "Información actualizada.");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la información.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!currentPassword) {
      Alert.alert('Error', 'Debes ingresar la contraseña actual para continuar');
      return;
    }

    if (user && user.email) {
      try {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        console.log("Usuario reautenticado correctamente.");
        await updatePassword(user, newPassword);
        Alert.alert('Éxito', 'Contraseña actualizada');
      } catch (error: any) {
        console.error("Error al actualizar la contraseña:", error);
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert("Error", "Usuario no autenticado.");
    }
  };

  const handlerLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={style.linear}>
      
      <View style={style.container}>
      <Text style={style.title}>Perfil de usuario</Text>
        {message ? <Text style={style.message}>{message}</Text> : null}

        <View style={style.section}>
          <Text style={style.label}>Email</Text>
          <TextInput style={style.input} value={user?.email || ""} editable={false}/>
        </View>

        <View style={style.section}>
          <Text style={style.label}>Nombre</Text>
          <TextInput style={style.input} value={name} onChangeText={(text) => setName(text)}/>
        </View>

        <View style={style.section}>
          <Text style={style.label}>Contraseña Actual</Text>
          <TextInput placeholder="Ingresa tu contraseña actual" value={currentPassword} onChangeText={setCurrentPassword} style={style.input} secureTextEntry/>
        </View>

        <View style={style.section}>
          <Text style={style.label}>Nueva Contraseña</Text>
          <TextInput placeholder="Nueva Contraseña" value={newPassword} onChangeText={setNewPassword} style={style.input} secureTextEntry/>
        </View>

        <TouchableOpacity style={style.button} onPress={handleChangePassword}>
          <Text style={style.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={handlerUpdate} disabled={isLoading || !user}>
          <Text style={style.buttonText}>{isLoading ? 'Cargando ...' : 'Guardar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[style.button, style.logoutButton]} onPress={handlerLogout}>
          <Text style={style.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignSelf: 'center',
  },
  linear: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});