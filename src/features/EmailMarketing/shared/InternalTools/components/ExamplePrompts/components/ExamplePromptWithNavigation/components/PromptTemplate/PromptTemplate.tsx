import Button from '../../../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/Icon/iconLibrary';

import './PromptTemplate.scss';

type Props = {
  prompt: string;
  onUsePromptTemplate: (prompt: string) => void;
};

const PromptTemplate = ({
  prompt,
  onUsePromptTemplate: onApplyPromptTemplate,
}: Props) => {
  return (
    <div aria-label="Prompt template">
      <pre className="code-block">{prompt}</pre>
      <Button
        className="dark"
        onClick={() => onApplyPromptTemplate(prompt)}
        label="Use this prompt">
        <Icon type={IconType.Clone} /> Use this prompt
      </Button>
    </div>
  );
};

export default PromptTemplate;
