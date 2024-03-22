# Gumroad email segmentation prototype
Author: **Mau Fournier**
Applying for the role of **Software engineer** at Gumroad.

* [Open live demo](https://gumroad-email-segmentation-f38164d5c41f.herokuapp.com/)
* [Visit GitHub Repository](https://github.com/MauFrontier/gumroad-email-marketing)
* [View Figma mockups](https://www.figma.com/file/brvBekodG186nNxzCUkKLu/Email-Marketing-Mockups)

This project showcases my ability to quickly build a piece of Gumroad UI with Typescript + React code.

It's also a sample of my level of comfort with Generative AI and my vision for how it can be harnessed to revolutionize the way people interact with Gumroad.

It should give you a good sense of my approach to writing and organizing code, testing, and solid engineering principles.

Having said that, it's only a small demo and there is a LOT I would improve in it. I'm happy to discuss more over a conversation 🙂.

## ⚙️ Tech stack

Back-end:
* Small Ruby on Rails API
* OpenAI API - GPT-4 Turbo (latest model)

Front-end:
* Typescript
* React (via Vite)
* SCSS (following [Gumroad's design system principles](https://gumroad.notion.site/Design-System-Principles-3c47ff13facb47d49b7f1d1ebf30eb2a))
* Axios to talk to the API

Infrastructure:
* Ruby on Rails serves both the front-end and the back-end API
* Live demo deployed to Heroku

## 👁️ Suggested sights

### 📬 Segmentation builder

The segmentation builder is at the heard of this demo, and it's what the demo in the [board meeting](https://youtu.be/qUYSTvJnIXA?t=753) centered around.

It's only a sample of the possible fields that could be used to segment the audience, but it's got all the core functionality there, and it allows you to build pretty advanced segmentation.

### 🤖 Generate with AI

The real star of this show is the "Generate with AI" feature, and it's run by [a contract written in Markdown](). I leveraged the Typescript types and enums and clever prompt engineering to guide the AI to give us very consistent results in generating the targeting automatically.

I am __*all in*__ on AI. I've been honing my prompt engineering skills daily since I got access to Github Copilot on October 2021. That's what now allows me to quickly implement a complex feature like this one. I've developed a great sense of how to get what I want from AI.

I used Github Copilot, ChatGPT, and Cody heavily to help me build this project quickly in my spare time. Every engineer should be diving deep into AI at this point, and those are the engineers that are needed to enter this new stage in tech.

### 🤫 Internal tools

Make sure to also check out the Internal Tools section at the bottom of the page, which includes a ton of sample prompts and allows you to customize the products in the account (since this small demo isn't connected to a database).

## 🔨 Installation

To install back-end dependencies, run this command from the `./back-end/` directory:

```
bundle install
```

To install front-end dependencies, run this command from the `./web/` directory:

```
npm install
```

To enable the "Generate with AI" feature, you'll need to set an environment variable in the back-end with your OpenAI API key. I've included a `.sample.env` file so just rename that file to `.env` and enter your API key there.

## ▶️ Usage

To run the back-end locally, run this command from the `./back-end/` directory:

```
rails s
```

To run the front-end locally, run this command from the `./web/` directory:

```
npm run dev
```

## 🧪 Testing

There are over 300 tests in this project. I'm pragmatic, but I believe in staying as close to TDD as possible and documenting all behavior with tests.

To run the back-end tests, run this command from the `./back-end/` directory:

```
bundle exec rspec
```

To run the front-end tests, run this command from the `./web/` directory:

```
npm test
```

## Let's build stuff together! 🚀