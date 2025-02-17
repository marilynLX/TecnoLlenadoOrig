import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Boton({
  texto,
  estiloBoton,
  estiloTexto,
  onPress
} : {
  texto: string,
  onPress?: () => void,
  estiloBoton?: object,  
  estiloTexto?: object,  
}) {
    return (
        <TouchableOpacity style={[estilos.boton, estiloBoton]} onPress={onPress}>
        <Text style={[estilos.texto, estiloTexto]}>{texto}</Text>
      </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: '#04132e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:260,
    marginStart:15,
    height: 40,
    width:344,
    position:"absolute",

  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
