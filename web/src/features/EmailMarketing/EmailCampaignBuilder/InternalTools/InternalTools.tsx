import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import './InternalTools.scss';
import ExamplePrompts from './components/ExamplePrompts/ExamplePrompts';
import examplePrompts from './components/ExamplePrompts/examplePromptsList';
import ProductEditor from './components/ProductEditor/ProductEditor';

const InternalTools = () => {
  const {state} = useEmailMarketingState();

  return (
    <div aria-label="Internal tools container">
      <header>
        <h2>Internal tools</h2>
        <img src="/assets/images/shushing-face-emoji.png" alt="Shhh..." />
      </header>
      <section role="region" aria-label="Internal tools">
        <ExamplePrompts examplePrompts={examplePrompts} />
        <ProductEditor />
        <div aria-label="Current state">
          <h3>Current state (readonly)</h3>
          <pre className="code-block">{JSON.stringify(state, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
};

export default InternalTools;
