// src/config/config.js
import { Client, Storage, TablesDB } from "appwrite";

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const storage = new Storage(client);
export const tablesDB = new TablesDB(client);
