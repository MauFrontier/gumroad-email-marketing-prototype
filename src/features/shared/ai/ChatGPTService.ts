import {OpenAI} from 'openai';
import {systemPrompt_generateTargeting} from '../../EmailMarketing/api/ai/generateTargeting/systemPrompt_generateTargeting';
import {VITE_OPENAI_API_KEY} from '../../../constants';

const apiKey = VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const SubmitAIPrompt = async (
  prompt: string,
): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt_generateTargeting,
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
