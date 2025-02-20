import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'
import { useSessionState } from './context/sessionProvider'
import { router } from 'expo-router'



export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
//  const [loading, setLoading] = useState(false)

  //consumir el provedor de sesion
  const {loading, login, user} =useSessionState();

  async function signInWithEmail() {
    login(email, password);
    //TODO
    }
useEffect(()=> {
    if(user){
        router.replace("/(tabs)");
    }
}, [user])

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
      <Text>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})