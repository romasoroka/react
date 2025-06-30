import { useState } from 'react';
import { Credential } from '../types';
import { fetchCredentials, createCredential } from '../services/credentials';

export const useCredentials = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const addCredential = async (credential: Omit<Credential, 'id'>) => {
    const newCred = await createCredential(credential);
    setCredentials(prev => [...prev, newCred]);
  };

  return { credentials, setCredentials, addCredential };
};
