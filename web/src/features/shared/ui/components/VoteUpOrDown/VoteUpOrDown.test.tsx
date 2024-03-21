import {render, screen} from '@testing-library/react';
import VoteUpOrDown from './VoteUpOrDown';

describe('VoteUpOrDown', () => {
  it('renders the component', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote up or down buttons')).toBeVisible();
  });

  it('shows "vote up" button when votedUp is false', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote up button')).toBeVisible();
  });

  it('defaults to votedUp false', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Remove vote up button'),
    ).not.toBeInTheDocument();
  });

  it('defaults to votedUp false', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Remove vote up button'),
    ).not.toBeInTheDocument();
  });

  it('shows "remove vote up" button when votedUp is true', async () => {
    render(
      <VoteUpOrDown
        votedUp={true}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Remove vote up button')).toBeVisible();
  });

  it('shows "vote down" button when votedDown is false', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote down button')).toBeVisible();
  });

  it('defaults to votedDown false', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Remove vote down button'),
    ).not.toBeInTheDocument();
  });

  it('shows "remove vote down" button when votedDown is true', async () => {
    render(
      <VoteUpOrDown
        votedDown={true}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Remove vote down button')).toBeVisible();
  });

  it('fires onVoteUp when the vote up button is clicked', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote up button')).toBeVisible();
  });

  it('fires onRemoveVoteUp when the remove vote up button is clicked', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote up button')).toBeVisible();
  });

  it('fires onVoteDown when the vote down button is clicked', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote down button')).toBeVisible();
  });

  it('fires onRemoveVoteDown when the remove vote down button is clicked', async () => {
    render(
      <VoteUpOrDown
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote down button')).toBeVisible();
  });
});
