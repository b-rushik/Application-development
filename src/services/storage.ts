import { uploadData, getUrl, remove } from '../config/aws-config';

export const storage = {
  uploadFile: async (key: string, file: File) => {
    try {
      const result = await uploadData({
        key,
        data: file,
        options: {
          contentType: file.type,
          onProgress: (progress) => {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  getFileUrl: async (key: string) => {
    try {
      const { url } = await getUrl({ key });
      return url;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },

  deleteFile: async (key: string) => {
    try {
      await remove({ key });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};