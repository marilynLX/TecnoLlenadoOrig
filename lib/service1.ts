// service1.ts
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Escucha en tiempo real los datos del tinaco.
 * @param callback Función que se llama con los datos del tinaco.
 * @returns Función para detener la suscripción.
 */
export function subscribeTinacoData(callback: (data: DocumentData) => void) {
  // Ajusta la ruta con el nombre de tu colección y el ID del documento
  const tinacoDoc = doc(db, 'contenedor-porcentaje', '8yjQznwuJcg7T1aquFqB');

  const unsubscribe = onSnapshot(
    tinacoDoc,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        console.log("Datos del documento:", data);
        callback(data);
      } else {
        console.warn("El documento no existe");
        callback({});
      }
    },
    (error) => {
      console.error("Error al suscribirse a tinaco:", error);
    }
  );

  return unsubscribe;
}