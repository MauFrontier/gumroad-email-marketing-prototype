import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {IconType} from '../Icon/iconLibrary';
import './VoteUpOrDown.scss';

type Props = {
  votedUp?: boolean;
  votedDown?: boolean;
  onVoteUp: () => void;
  onRemoveVoteUp: () => void;
  onVoteDown: () => void;
  onRemoveVoteDown: () => void;
};

const VoteUpOrDown = ({
  votedUp = false,
  votedDown = false,
  onVoteUp,
  onRemoveVoteUp,
  onVoteDown,
  onRemoveVoteDown,
}: Props) => {
  return (
    <div aria-label="Vote up or down buttons" role="toolbar">
      {votedUp && (
        <Button onClick={onRemoveVoteUp} label="Remove vote up button">
          <Icon type={IconType.ThumbsUpFilled} />
        </Button>
      )}

      {!votedUp && (
        <Button onClick={onVoteUp} label="Vote up button">
          <Icon type={IconType.ThumbsUpRegular} />
        </Button>
      )}

      {votedDown && (
        <Button onClick={onRemoveVoteDown} label="Remove vote down button">
          <Icon type={IconType.ThumbsDownFilled} />
        </Button>
      )}

      {!votedDown && (
        <Button onClick={onVoteDown} label="Vote down button">
          <Icon type={IconType.ThumbsDownRegular} />
        </Button>
      )}
    </div>
  );
};

export default VoteUpOrDown;
