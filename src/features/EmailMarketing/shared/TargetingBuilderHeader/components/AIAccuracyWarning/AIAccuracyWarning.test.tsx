import {fireEvent, render, screen} from '@testing-library/react';
import AIAccuracyWarning from './AIAccuracyWarning';
import {emailMarketingInitialState} from '../../../../store/emailMarketingInitialState';
import {renderComponentWithState} from '../../../../store/emailMarketingStoreUtils';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';

describe('AIAccuracyWarning', () => {
  it('renders the component', async () => {
    render(<AIAccuracyWarning />);

    expect(screen.getByLabelText('AI accuracy warning')).toBeVisible();
  });

  it('displays the vote up button when votedAIAccuracyUp is false', async () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyUp: false,
    });

    expect(screen.getByLabelText('Vote up button')).toBeVisible();
  });

  it('displays the remove vote up when votedAIAccuracyUp is true', async () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyUp: true,
    });

    expect(screen.getByLabelText('Remove vote up button')).toBeVisible();
  });

  it('displays the vote down button when votedAIAccuracyDown is false', async () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyDown: false,
    });

    expect(screen.getByLabelText('Vote down button')).toBeVisible();
  });

  it('displays the remove vote down when votedAIAccuracyDown is true', async () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyDown: true,
    });

    expect(screen.getByLabelText('Remove vote down button')).toBeVisible();
  });

  it('votes up on the AI accuracy warning when the vote up button is clicked', () => {
    renderComponentWithState(<AIAccuracyWarning />, emailMarketingInitialState);

    const upVoteUpButton = screen.getByLabelText('Vote up button');
    fireEvent.click(upVoteUpButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: true,
    });
  });

  it('votes down on the AI accuracy warning when the vote down button is clicked', () => {
    renderComponentWithState(<AIAccuracyWarning />, emailMarketingInitialState);

    const downVoteDownButton = screen.getByLabelText('Vote down button');
    fireEvent.click(downVoteDownButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: true,
    });
  });

  it('removes up vote on the AI accuracy warning when the remove vote up button is clicked', () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyUp: true,
    });

    const removeUpVoteButton = screen.getByLabelText('Remove vote up button');
    fireEvent.click(removeUpVoteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: false,
    });
  });

  it('removes down vote on the AI accuracy warning when the remove vote down button is clicked', () => {
    renderComponentWithState(<AIAccuracyWarning />, {
      ...emailMarketingInitialState,
      votedAIAccuracyDown: true,
    });

    const removeDownVoteButton = screen.getByLabelText(
      'Remove vote down button',
    );
    fireEvent.click(removeDownVoteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: false,
    });
  });
});
