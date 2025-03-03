import { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { ControlarBomba } from '@/domain/useCases/controlBomba';
import { firebase } from '@/lib/firebase';

export const useTinacoController = () => {
  const [nivelAgua, setNivelAgua] = useState('');
  const [estadoBomba, setEstadoBomba] = useState('');
  const [modo, setModo] = useState<'automatico' | 'manual'>('automatico');
  const [bombaEncendida, setBombaEncendida] = useState(false);

  const db = getFirestore(firebase);

  useEffect(() => {
    // Suscripción en tiempo real a Firestore
    const unsubscribe = onSnapshot(doc(db, "tinaco", "estado"), (doc) => {
      if (doc.exists()) {
        const level = doc.data().level;
        setNivelAgua(level);

        if (modo === 'automatico') {
          const bomba = new ControlarBomba().execute(level === 'Vacio');
          setEstadoBomba(bomba);
        }
      }
    });

    return () => unsubscribe();
  }, [modo]);

  const cambiarModo = (nuevoModo: 'automatico' | 'manual') => setModo(nuevoModo);

  const handlerEncenderBomba = () => {
    if (modo === 'manual' && nivelAgua !== 'Lleno') {
      setBombaEncendida(true);
      setEstadoBomba(new ControlarBomba().execute(true));
    }
  };

  const handlerApagarBomba = () => {
    if (modo === 'manual') {
      setBombaEncendida(false);
      setEstadoBomba(new ControlarBomba().execute(false));
    }
  };

  return { nivelAgua, 
    estadoBomba, 
    modo, bombaEncendida, 
    cambiarModo, 
    handlerEncenderBomba, 
    handlerApagarBomba };
};
