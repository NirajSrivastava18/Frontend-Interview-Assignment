import axios from 'axios';

const API_ENDPOINT = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

async function fetchSampleJdJSON(limit = 30, offset = 0) {
  try {
    // Send a POST request to the API endpoint with the data
    const response = await axios.post(API_ENDPOINT, { limit, offset });

    // Check if the response is a string and parse it as JSON if possible
    const data =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    // Check if the response is a PRO feature only
    if (data === 'PRO FEATURE ONLY') {
      //   console.log(data);
      return null;
    }

    // Return the data object
    return data;
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return null to indicate an error
    return null;
  }
}

export default fetchSampleJdJSON;
