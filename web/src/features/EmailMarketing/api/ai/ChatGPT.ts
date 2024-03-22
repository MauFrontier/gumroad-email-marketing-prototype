import axios from 'axios';
import {apiURL} from '../../../../utils/apiConfig';

export async function generateSegmentationAPIRequest(
  prompt: string,
  productsString: string,
) {
  const now = new Date().toISOString();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const response = await axios.post(`${apiURL}/generate-segmentation`, {
      user_prompt: prompt,
      products: productsString,
      current_date: now,
      user_timezone: userTimezone,
    });

    if ((response && response.status < 200) || response.status > 300) {
      throw new Error('Network response was not ok');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error submitting segmentation request:', error);
    throw error; // Or handle errors as needed
  }
}
