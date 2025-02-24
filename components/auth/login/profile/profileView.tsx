import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, Button, TextInput, Text} from 'react-native'
import { useSessionState } from '../context/sessionProvider'
import { useRouter } from 'expo-router'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileView() {

  //estados para el manejod de las cajas de texto
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
        // Crear la credencial con el email del usuario y la contraseña actual
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        // Reautenticar al usuario
        await reauthenticateWithCredential(user, credential);
        console.log("Usuario reautenticado correctamente.");

        // Actualizar la contraseña con la nueva
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
<LinearGradient colors={['#B3E5FC', '#81D4FA', '#4FC3F7']} style={style.linear}>
   
  <View style={style.container}>
      {message ? <Text style={style.message}>{message}</Text> : null}

      <View style={[style.section]}>
         <Text style={style.label}>Email</Text>
         <TextInput style={style.input} value={user?.email || ""} editable={false}/>
      </View>

      <View style={[style.section]}>
        <Text style={style.label}>Nombre</Text>
        <TextInput
          style={style.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={[style.section]}>
        <Text style={style.label}>Contraseña Actual</Text>
        <TextInput
          placeholder="Ingresa tu contraseña actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={style.input}
          secureTextEntry
        />
      </View>

      <View style={[style.section]}>
        <Text style={style.label}>Nueva Contraseña</Text>
        <TextInput
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          style={style.input}
          secureTextEntry
        />
      </View>

      <View style={[style.section]}>
       <Button title="Cambiar Contraseña" onPress={handleChangePassword} />
      </View>
    
      <View style={[style.section]}>
        <Button
          title={isLoading ? 'Cargando ...' : 'Guardar'}
          onPress={handlerUpdate}
          disabled={isLoading || !user}
        />
      </View>

      <View style={[style.section]}>   
        <Button title="Sign Out" onPress={handlerLogout} />
      </View>
  </View>
</LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    marginStart:20,
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
    marginVertical: 10,
  },
  mt20: {
    marginTop: 20,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5,
   },
    section:{
      marginVertical:10,
    }
}) 