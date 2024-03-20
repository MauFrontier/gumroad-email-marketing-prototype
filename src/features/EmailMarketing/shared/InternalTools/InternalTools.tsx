import './InternalTools.scss';
import ExamplePrompts from './components/ExamplePrompts/ExamplePrompts';
import examplePrompts from './components/ExamplePrompts/examplePromptsList';
import ProductEditor from './components/ProductEditor/ProductEditor';

const InternalTools = () => {
  return (
    <div aria-label="Internal tools container">
      <header>
        <h2>Internal tools</h2>
        <img src="./src/assets/images/shushing-face-emoji.png" alt="Shhh..." />
      </header>
      <section role="region" aria-label="Internal tools">
        <ExamplePrompts examplePrompts={examplePrompts} />
        <ProductEditor />
    </div>
  );
};

export default InternalTools;
