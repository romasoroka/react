import { Credential, Technology } from "../types/Models";

export interface AppContextType {
  credentials: Credential[];
  addCredential: (credential: Omit<Credential, "id">) => Promise<void>;
  technologies: Technology[];
  loading: boolean;
  error: string | null;
}
