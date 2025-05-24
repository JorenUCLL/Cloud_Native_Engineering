import { blobServiceClient } from './blob-service'; // your BlobServiceClient setup

export const uploadToBlob = async (containerName: string, blobName: string, content: string) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded blob ${blobName} to container ${containerName}`);
};
