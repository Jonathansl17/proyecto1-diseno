/**
 * Azure Cosmos DB Configuration
 */

import { CosmosClient } from '@azure/cosmos';
import dotenv from 'dotenv';

dotenv.config();

// Azure Cosmos DB Configuration
export const azureConfig = {
  endpoint: process.env.AZURE_COSMOS_ENDPOINT || 'https://proyecto1-diseno.documents.azure.com:443/',
  key: process.env.AZURE_COSMOS_KEY || '',
  databaseId: process.env.AZURE_COSMOS_DATABASE || 'proyecto1-db',
  containerId: process.env.AZURE_COSMOS_CONTAINER || 'rides-container',
};

// Initialize Cosmos Client
let cosmosClient: CosmosClient | null = null;

export const getCosmosClient = (): CosmosClient => {
  if (!cosmosClient) {
    if (!azureConfig.key) {
      console.warn('⚠️  Azure Cosmos DB no configurado. Usando base de datos en memoria.');
      throw new Error('Azure Cosmos DB credentials not configured');
    }
    
    cosmosClient = new CosmosClient({
      endpoint: azureConfig.endpoint,
      key: azureConfig.key,
    });
    
    console.log('✅ Azure Cosmos DB client inicializado');
  }
  
  return cosmosClient;
};

// Initialize Database and Container
export const initializeCosmosDB = async () => {
  try {
    const client = getCosmosClient();
    
    // Create database if it doesn't exist
    const { database } = await client.databases.createIfNotExists({
      id: azureConfig.databaseId,
    });
    
    console.log(`✅ Database: ${azureConfig.databaseId} listo`);
    
    // Create container if it doesn't exist
    const { container } = await database.containers.createIfNotExists({
      id: azureConfig.containerId,
      partitionKey: { paths: ['/type'] },
    });
    
    console.log(`✅ Container: ${azureConfig.containerId} listo`);
    
    return { database, container };
  } catch (error) {
    console.error('❌ Error inicializando Azure Cosmos DB:', error);
    throw error;
  }
};

// Health check for Azure connection
export const checkAzureConnection = async (): Promise<boolean> => {
  try {
    if (!azureConfig.key) {
      return false;
    }
    
    const client = getCosmosClient();
    await client.getDatabaseAccount();
    return true;
  } catch (error) {
    console.error('❌ Azure Cosmos DB no disponible:', error);
    return false;
  }
};
