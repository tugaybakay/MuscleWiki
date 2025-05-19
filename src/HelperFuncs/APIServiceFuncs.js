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
 * 
 * @param {string} bodyPart 
 * @returns {Promise<Exercise[]>} 
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
 *
 * 
 * @param {string} id 
 * @returns {Promise<Exercise>} 
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
 * 
 * @param {string[]} ids
 */
export const fetchExercisesByIds = async (ids) => {
  const requests = ids.map((id) => axiosInstance.get(`/exercises/exercise/${id}`));
  const responses = await Promise.all(requests);
  return responses.map((res) => res.data);
};

/**
 * 
 *
 * @param {string} name 
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