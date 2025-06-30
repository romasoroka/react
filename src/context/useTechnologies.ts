import { useState } from 'react';
import { Technology } from '../types';
import { fetchTechnologies } from '../services/technologies';

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);


  return { technologies, setTechnologies };
};
