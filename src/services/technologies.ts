import axios from "axios";
import { Technology } from "../types/Models";

const API = "http://localhost:5000/api/Technologies";

export const fetchTechnologies = async (): Promise<Technology[]> =>
  (await axios.get(API)).data;
