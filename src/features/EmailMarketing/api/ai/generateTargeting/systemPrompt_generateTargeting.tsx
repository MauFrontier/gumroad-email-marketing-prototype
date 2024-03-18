import emailMarketingTypes from './types_generateTargeting.ts';
import {exampleProducts, examples} from './examples_generateTargeting';
import products from '../../productsFromServer';

const responseType = `type Response = {
  result: 'success' | 'success with errors' | 'failure';
  payload: Targeting;
  errors: string[];
};`;

export const basicRules = ` 
You're going to take a user's prompt in natural language and will generate the JSON for email marketing targeting, adhering strictly to these rules:

* The JSON must me 100% compatible with the type structure laid out below.
* If any parts of the prompt are incompatible with the type structure, you will ignore those parts and generate the JSON with only the valid parts, and with a structure that is actually compatible. You will take note of the issues, though, explaining in a maximum of 2 sentences and 96 characters why the JSON is not compatible, making sure that the explanation is sanitized, professional and appropriate for a company to show to their customers.
* If the prompt is empty, or if your resulting JSON is empty, you will return an empty JSON object, but this will be considered a failure and you will explain why in the errors array. Do not include any sensitive information in the error messages - product names and data entered by the user are fine to include.
* For each filter, you will include all the relevant fields. If the prompt didn't specify a valid value for one of those, you will keep it empty if that's valid, or you'll pick the default value that makes the most sense in this type structure.
* Dates are ISO strings, and the current date is ${new Date().toISOString()}. Disregard the time in all dates, we're not able to specify time of day, only dates. Still, your responses should adhere to the ISOString format.
* "Is in the last" accepts a number of days, and it should be a numerical value
* When dealing with currency amounts, don't include the currency symbol.
* When people give you a time range, use multiple filters with the right filter parameters to cover that date range, making sure to use the right verb, subject, qualifiers, and value.
* Be flexible in the types of prompts you receive. Do your best to understand or even infer what the user meant to say. You can accept dates far in the past or future, and the user doesn't need to provide dates in the right format. If any values are in the wrong format but it's clear what the user meant to say, make the correction and accept it.
* The first filter in each group, and the first filter group in the entire targeting, will have no operand. The rest will have an operand.
* You will assign a unique, randomized UUID to each filter and filter group.
* When returning products, you will only use products that are in the provided list of products. If none of them are applicable, you'll return an empty products array and report it in the errors array. However, if you can infer which products the user meant, do so - for example: "has bought any tutorials" will return all the tutorials, but "has bought any painting tutorials" would match tutorial-2024 and tutorial-painting-101 from the example products'
* Make sure you consider the type structure and use the best possible operands, subjects, subject qualifiers, verbs, verb qualifiers, and verbs to represent what the user is asking for.
* You will adhere to the ISO 3166-1 standard for countries`;

const responseTypeSegment = `* You will return an object in the following structure as a response, with no explanation: ${responseType}`;

const typesSegment = `* Your response must be a valid JSON object that can be parsed into the following type structure: ${emailMarketingTypes}`;

const examplesSegment = `I will show you some example JSON results. The prompts can take any form, so these are just example responses I'd expect for a few example prompts I came up with. These examples assume that the account has the following example products (but the real user's products will be listed later): ${exampleProducts}

These are the examples: ${examples}`;

const realProductsSegment = `The example products I mentioned before were simply meant to be referenced in the examples I shared. But when analyzing the user's prompt, you will instead look at the following list of real products in their account: ${products}`;

export const systemPrompt_generateTargeting = `${basicRules} ${responseTypeSegment} ${typesSegment} ${examplesSegment} ${realProductsSegment}`;
