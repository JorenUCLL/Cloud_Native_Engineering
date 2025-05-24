import { BlobServiceClient } from '@azure/storage-blob';
import * as dotenv from 'dotenv';
dotenv.config(); // Load .env vars

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
export const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
