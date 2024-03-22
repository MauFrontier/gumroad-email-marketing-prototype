import {apiURL} from '../../../../utils/apiConfig';

export async function generateSegmentationAPIRequest(
  prompt: string,
  productsString: string,
) {
  const timeoutDuration = 120000;

  const now = new Date().toISOString();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const response = await fetch(`${apiURL}/generate-segmentation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_prompt: prompt,
        products: productsString,
        current_date: now,
        user_timezone: userTimezone,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body?.getReader();
    let chunks = '';
    let timedOut = false;

    const timeoutId = setTimeout(() => {
      timedOut = true;
      reader?.cancel();
      console.error('The AI took too long to respond...');
    }, timeoutDuration);

    if (reader) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (timedOut) break;
        const {done, value} = await reader.read();
        if (done) break;
        chunks += new TextDecoder().decode(value);
      }
    }

    clearTimeout(timeoutId);

    if (timedOut) {
      throw new Error('Operation timed out');
    }

    const completeResponse = JSON.parse(chunks);
    return completeResponse;
  } catch (error) {
    console.error('Error submitting segmentation request:', error);
    throw error;
  }
}
