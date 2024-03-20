import {OpenAI} from 'openai';
import {getTargetingSystemPrompt} from '../../EmailMarketing/api/ai/generateTargeting/getTargetingSystemPrompt';
import {VITE_OPENAI_API_KEY} from '../../../constants';
import {KeyValuePair} from '../sharedTypes';

const apiKey = VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const SubmitAIPrompt = async (
  prompt: string,
  products: KeyValuePair[],
): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: getTargetingSystemPrompt(products),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {type: 'json_object'},
      model: 'gpt-4-1106-preview',
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('ChatGPT API error:', error);
    throw error;
  }
};
