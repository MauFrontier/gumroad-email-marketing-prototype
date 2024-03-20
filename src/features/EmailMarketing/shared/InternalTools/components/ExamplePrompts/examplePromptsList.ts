export type ExamplePrompt = {
  description: string;
  prompt: string;
};

const examplePrompts: ExamplePrompt[] = [
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
      'Can we match products even if the user got their names wrong or even just described them in their own words?',
    prompt: `They've bought any of these: X-Mas pack, this year's tutorial, the painting one, or the video thingie`,
  },
  {
    description:
      'Can we distinguish between showing interest in a product and actually asking to target customers of that product?',
    prompt: 'I want to take a skateboarding course',
  },
  {
    description: 'Can we properly handle prompts in a different language?',
    prompt: 'Clientes que han comprado combo de navidad y el tutorial del 2024',
  },
  {
    description: 'Can we gracefully return errors in another language?',
    prompt: '¿Qué hace esto?',
  },
  {
    description:
      'Can the AI understand a request with multiple typing and grammar mistakes?',
    prompt: 'custmer hsa paid moore then 30 bux yes?',
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
];

export default examplePrompts;
