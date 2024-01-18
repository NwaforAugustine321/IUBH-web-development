import axios from 'axios';

export const get = async (url: string, config: { [key: string]: any }) => {
  try {
    return await axios.get(url, config);
  } catch (error) {
    throw error;
  }
};
