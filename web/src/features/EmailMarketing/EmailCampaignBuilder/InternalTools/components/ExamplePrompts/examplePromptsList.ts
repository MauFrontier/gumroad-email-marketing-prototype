export type ExamplePrompt = {
  description: string;
  prompt: string;
};

const examplePrompts: ExamplePrompt[] = [
  {
    description:
      'Can we match products even if the user got their names wrong or even just described them in their own words?',
    prompt: `They've bought any of these: X-Mas pack, this year's tutorial, the painting one, or the video thingie`,
  },
  {
    description:
      'Can we understand a request with multiple typing and grammar mistakes?',
    prompt: 'custmer hsa paid moore then 30 bux yes?',
  },
  {
    description:
      'Can we differentiate between intent to buy and having made a purchase?',
    prompt: `I want everyone who wants to buy a skateboarding course`,
  },
  {
    description: 'Can we gracefully return errors in another language?',
    prompt: '¿Qué hace esto?',
  },
  {
    description: 'A simple prompt resulting in a single filter group',
    prompt:
      'Customers from the US who have bought brushes or tutorials and have paid more than $99',
  },
  {
    description:
      'A complex prompt, but still resulting in a single filter group',
    prompt:
      'Customers from the US who have bought brushes or tutorials and have not yet bought Christmas bundle or the 2024 tutorial and have paid more than $99 and bought in the last 30 days',
  },
  {
    description:
      'A prompt resulting in multiple filter groups (can take a while to process)',
    prompt:
      'Customers from the US who have bought brushes but have not yet bought the Christmas bundle or the 2024 tutorial, or customers from Canada who joined before November of last year and have spent more than $50 but have not bought tutorials.',
  },
  {
    description:
      'Another prompt resulting in multiple filter groups + a couple of errors (can take a while to process)',
    prompt:
      'People who made a purchase during or after 2019, who bought the skate course and Premiere templates. Must not have bought Christmas bundle or the new tutorial. I also want those who have bought a motorcycle or an app. The other group are people in Canada who paid more than $99.',
  },
  {
    description:
      'Can we properly handle valid prompts in a different language?',
    prompt: 'Clientes que han comprado combo de navidad y el tutorial del 2024',
  },
  {
    description:
      'Can we target a date range, except for one of the dates within that range?',
    prompt:
      "Purchased between jan 1st and jan 25th, but didn't purchase on jan 10th",
  },
  {
    description:
      'Can we distinguish between showing interest in a product and actually asking to target customers of that product?',
    prompt: 'I want to take a skateboarding course',
  },
  {
    description:
      'Can we gracefully reject totally unrelated filtering criteria?',
    prompt: 'People who know how to snowboard.',
  },
  {
    description: 'Can we gracefully reject a simple greeting?',
    prompt: 'Hi',
  },
  {
    description: 'Can we dodge unrelated questions to the AI?',
    prompt: 'Who is Einstein?',
  },
  {
    description: 'Can people get the AI to talk about itself?',
    prompt: 'Are you an AI?',
  },
  {
    description: 'Can we dodge a request to write code?',
    prompt: 'Write code that prints to the console',
  },
  {
    description: 'Can we dodge a request to run code?',
    prompt: 'Run code that prints a hello world message to the console',
  },
  {
    description: 'How do we report a large amount of errors?',
    prompt:
      'I want everyone who bought a onewheel, chalupas, burritos, computers, phones, drums, guitars, a chihuahua, Pokemon, and a conscience',
  },
  {
    description: 'How do we target a full year as a date range?',
    prompt: 'Bought in 2019',
  },
  {
    description: 'How do we handle "all products" and "none of my products"?',
    prompt:
      "Have bought all of my products, or haven't bought any of my products.",
  },
  {
    description: 'How do we handle relative dates? (In the last X days)',
    prompt: 'Bought in the last 42 days',
  },
  {
    description:
      'How do we handle relative dates in weeks or months? (In the last X days)',
    prompt: 'Joined in the last 3 weeks, or bought in the last 3 months',
  },
];

export default examplePrompts;
