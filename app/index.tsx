import { useSessionState } from "@/components/auth/login/context/sessionProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import { View , Text} from "react-native";

//index como splash(se puede utilizar)
export default function MainScreen() {
//consumir la sesion
const{loading, user}= useSessionState();

useEffect(() =>{

//si ya no esta cargando, y no hay usuario llevarlo al login
if (!loading && !user){
    router.push("/auth/login");
}

if (!loading && user){
    router.push("/(tabs)");
}
}, [loading, user])


return(
    <View>
        <Text>
            Cargando...
        </Text>
    </View>
)
}