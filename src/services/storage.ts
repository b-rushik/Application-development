import { Storage } from 'aws-amplify';

export const storage = {
  uploadFile: async (key: string, file: File) => {
    try {
      const result = await Storage.put(key, file, {
        contentType: file.type,
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      });
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  getFileUrl: async (key: string) => {
    try {
      return await Storage.get(key);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },

  deleteFile: async (key: string) => {
    try {
      await Storage.remove(key);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};