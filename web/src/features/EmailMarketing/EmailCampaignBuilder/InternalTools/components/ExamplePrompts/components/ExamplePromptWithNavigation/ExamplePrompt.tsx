import Icon from '../../../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../../../shared/ui/components/Icon/iconLibrary';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingActionTypes';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';
import './ExamplePrompt.scss';
import PromptTemplate from './components/PromptTemplate/PromptTemplate';

type Props = {
  goToNextPrompt: (event: React.MouseEvent<HTMLButtonElement>) => void;
  goToPreviousPrompt: (event: React.MouseEvent<HTMLButtonElement>) => void;
  description: string;
  prompt: string;
};

const ExamplePrompt = ({
  goToNextPrompt,
  goToPreviousPrompt,
  description,
  prompt,
}: Props) => {
  const {state, dispatch} = useEmailMarketingState();

  const scrollToTop = () => {
    window.scrollTo({top: 225});
  };

  const usePromptTemplate = (newPrompt: string) => {
    dispatch({
      type: EmailMarketingActionType.SetPrompt,
      payload: newPrompt,
    });

    scrollToTop();

    if (!state.showGenerateWithAIPanel) {
      dispatch({
        type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
      });
    }
  };

  return (
    <li aria-label="Example prompt">
      <h4>{description}</h4>
      <div aria-label="Prompt with navigation">
        <button
          role="navigation"
          onClick={goToPreviousPrompt}
          aria-label="Previous prompt">
          <Icon className="rotate-90" type={IconType.ChevronDown} />
        </button>
        <PromptTemplate
          prompt={prompt}
          onUsePromptTemplate={usePromptTemplate}
        />
        <button
          role="navigation"
          onClick={goToNextPrompt}
          aria-label="Next prompt">
          <Icon className="rotate-270" type={IconType.ChevronDown} />
        </button>
      </div>
    </li>
  );
};

export default ExamplePrompt;
