import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {IconType} from '../Icon/iconLibrary';
import VoteUpOrDown from '../VoteUpOrDown/VoteUpOrDown';
import './Warning.scss';

type Props = {
  label?: string;
  message: string;
  isError?: boolean;
  onCloseWarning: () => void;
  votedUp?: boolean;
  votedDown?: boolean;
  onVoteUp?: () => void;
  onRemoveVoteUp?: () => void;
  onVoteDown?: () => void;
  onRemoveVoteDown?: () => void;
};

const Warning = ({
  label,
  message,
  onCloseWarning,
  votedUp = false,
  votedDown = false,
  onVoteUp,
  onRemoveVoteUp,
  onVoteDown,
  onRemoveVoteDown,
  isError = false,
}: Props) => {
  return (
    <div
      aria-label={label || 'Warning'}
      role="alert"
      className={isError ? 'error' : ''}>
      <div className="warning-icon-and-message">
        <Icon type={IconType.Warning} />
        <p>{message}</p>
      </div>
      <div role="toolbar" className="warning-buttons">
        {onVoteUp && onVoteDown && onRemoveVoteUp && onRemoveVoteDown && (
          <VoteUpOrDown
            votedUp={votedUp}
            votedDown={votedDown}
            onVoteUp={onVoteUp}
            onRemoveVoteUp={onRemoveVoteUp}
            onVoteDown={onVoteDown}
            onRemoveVoteDown={onRemoveVoteDown}
          />
        )}
        <Button onClick={onCloseWarning} label="Close warning button">
          <Icon type={IconType.X} />
        </Button>
      </div>
    </div>
  );
};

export default Warning;
