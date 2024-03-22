import {useState} from 'react';
import './ExamplePrompts.scss';
import {ExamplePrompt as ExamplePromptType} from './examplePromptsList';
import ExamplePrompt from './components/ExamplePromptWithNavigation/ExamplePrompt';

type Props = {
  examplePrompts: ExamplePromptType[];
};

const ExamplePrompts = ({examplePrompts}: Props) => {
  const [currentExamplePromptIndex, setCurrentExamplePromptIndex] = useState(0);

  const goToNextPrompt = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCurrentExamplePromptIndex(
      prevIndex => (prevIndex + 1) % examplePrompts.length,
    );
  };

  const goToPreviousPrompt = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCurrentExamplePromptIndex(
      prevIndex =>
        (prevIndex - 1 + examplePrompts.length) % examplePrompts.length,
    );
  };

  return (
    <div aria-label="Example prompts">
      <h3>Example prompts</h3>
      <ul>
        {examplePrompts.length > 0 && (
          <ExamplePrompt
            goToNextPrompt={goToNextPrompt}
            goToPreviousPrompt={goToPreviousPrompt}
            description={examplePrompts[currentExamplePromptIndex].description}
            prompt={examplePrompts[currentExamplePromptIndex].prompt}
          />
        )}
      </ul>
    </div>
  );
};

export default ExamplePrompts;
