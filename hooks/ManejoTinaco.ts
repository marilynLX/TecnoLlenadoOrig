import { useState } from 'react';
import { TinacoAgua } from '@/domain/entities/Tinaco';

export const useTinacoAgua = () => {
  const [tinaco, setTinaco] = useState(new TinacoAgua('Medio'));

  const updateLevel = (newLevel: 'Vacio' | 'Medio' | 'Lleno') => {
    setTinaco(new TinacoAgua(newLevel));
  };

  return { tinaco, updateLevel };
};
