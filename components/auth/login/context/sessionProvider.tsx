
// proveedor de estado de sesión
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// estructura del estado
//type User = { name: string };

// definir el context(todo lo que nos proporcionara el provedor)
type ContextDefinition = {
  loading: boolean;
  user: User | null;
  message?: string;

  // funciones
  login: (email: string, password: string) => void; //autentifica llamando a firebase
  logout: () => void; //cierra la secion
}

// objeto context
const SessionContext = createContext({} as ContextDefinition );

const SessionProvider = (
  { children } 
  : 
  { children: React.ReactNode }
) => {

  // estado del proveedor
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);




  //cuando se carge el probedor verificar una sesion existente
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(
        auth, 
        async (data) => {
            if (data) {
                setUser(data);
            }
            setLoading(false);
        }
    );
    return unsuscribe;
  },[]);

  // implementar las funciones del proveedor
  const login = (email: string, password: string) => {
    // autenticar por email y contraseña
    signInWithEmailAndPassword(
    auth,
    email.toLocaleLowerCase(),
    password
  )
    .then((userCredential) => {
        console.log(userCredential);
        setUser(userCredential.user);
    })
    .catch((error) => {
        setMessage(`Error:${error.message}`)
    })
    .finally(() => {

    })
  }

  const logout = () => {
    //signOut(auth).then(() => {
      // ToDo
    /*
    })
    .catch(() => {
      setMessage("No se pudo cerrar sesión");
    });
    */
  }

  return (
    <SessionContext.Provider value={{
      loading,
      user,
      message,
      
      login,
      logout,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

// función hook para consumir el estado de sesión
function useSessionState() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionState() no puede usarse fuera de SessionProvider");
  }

  return context;
}

// exportar el provider y el hook para consumirlo
export {
  SessionProvider,
  useSessionState,
}
