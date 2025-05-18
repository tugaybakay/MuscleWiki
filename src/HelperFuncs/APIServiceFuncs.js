import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '2a757bffbfmsh00dce4eb9ed90fep173e4djsn181f6ff4ea98',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
});

export const fetchBodyPartList = async () => {
  const response = await axiosInstance.get('/exercises/bodyPartList');
  return response.data;
};

/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} bodyPart
 * @property {string} equipment
 * @property {string} gifUrl
 * @property {string} target
 */

/**
 * Belirli bir kas grubuna göre egzersizleri getirir.
 * 
 * @param {string} bodyPart - Hedef kas grubu (örneğin: "chest", "legs").
 * @returns {Promise<Exercise[]>} - Egzersiz listesini döner.
 */
export const fetchExercisesByBodyPart = async (bodyPart) => {
  const response = await axiosInstance.get(`/exercises/bodyPart/${bodyPart}`,{
    params: {
      limit: 18,
    },
  });
  return response.data;
};


/**
 * Belirli bir egzersiz ID'sine göre egzersiz detaylarını getirir.
 * 
 * @param {string} id - Egzersizin benzersiz ID'si.
 * @returns {Promise<Exercise>} - Egzersiz detayları.
 */
export const fetchExerciseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/exercises/exercise/${id}`);
    return response.data;
  } catch (error) {
    console.error("Egzersiz detayları alınırken hata oluştu:", error);
    throw error;
  }
};


/**
 * Birden fazla egzersizi ID listesi ile getirir
 * @param {string[]} ids
 */
export const fetchExercisesByIds = async (ids) => {
  const requests = ids.map((id) => axiosInstance.get(`/exercises/exercise/${id}`));
  const responses = await Promise.all(requests);
  return responses.map((res) => res.data);
};

/**
 * Belirli bir isimle egzersizleri getirir.
 *
 * @param {string} name - Egzersiz ismi (örn: "push", "curl").
 * @returns {Promise<Exercise[]>}
 */
export const fetchExercisesByName = async (name) => {
  const response = await axiosInstance.get(`/exercises/name/${encodeURIComponent(name)}`, {
    params: {
      offset: 0,
      limit: 18,
    },
  });

  return response.data;
};