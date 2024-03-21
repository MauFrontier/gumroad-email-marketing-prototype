import {fireEvent, render, screen} from '@testing-library/react';
import Warning from './Warning';

describe('Warning', () => {
  it('renders the component', async () => {
    render(<Warning message="This is a warning" onCloseWarning={jest.fn()} />);

    expect(screen.getByRole('alert')).toBeVisible();
  });

  it('renders the component with the correct message', async () => {
    render(<Warning message="This is a warning" onCloseWarning={jest.fn()} />);

    expect(screen.getByText('This is a warning')).toBeVisible();
  });

  it('renders the component with the correct label', async () => {
    render(
      <Warning
        label="This is a warning"
        message="Warning text"
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('This is a warning')).toBeVisible();
  });

  it('defaults to Warning as the label', async () => {
    render(<Warning message="This is a warning" onCloseWarning={jest.fn()} />);

    expect(screen.getByLabelText('Warning')).toBeVisible();
  });

  it('closes the warning when the close button is clicked', async () => {
    const onCloseWarning = jest.fn();
    render(
      <Warning message="This is a warning" onCloseWarning={onCloseWarning} />,
    );

    const closeButton = screen.getByLabelText('Close warning button');
    fireEvent.click(closeButton);

    expect(onCloseWarning).toHaveBeenCalled();
  });

  it('shows "vote up" button when votedUp is false', async () => {
    render(
      <Warning
        message="This is a warning"
        votedUp={false}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote up button')).toBeVisible();
  });

  it('defaults to votedUp false', async () => {
    render(
      <Warning
        message="This is a warning"
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Remove vote up button'),
    ).not.toBeInTheDocument();
  });

  it('shows "remove vote up" button when votedUp is true', async () => {
    render(
      <Warning
        message="This is a warning"
        votedUp={true}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Remove vote up button')).toBeVisible();
  });

  it('shows "vote down" button when votedDown is false', async () => {
    render(
      <Warning
        message="This is a warning"
        votedDown={false}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Vote down button')).toBeVisible();
  });

  it('defaults to votedDown false', async () => {
    render(
      <Warning
        message="This is a warning"
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Remove vote down button'),
    ).not.toBeInTheDocument();
  });

  it('shows "remove vote down" button when votedDown is true', async () => {
    render(
      <Warning
        message="This is a warning"
        votedDown={true}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Remove vote down button')).toBeVisible();
  });

  it('fires onVoteUp when the vote up button is clicked', async () => {
    const onVoteUp = jest.fn();
    render(
      <Warning
        message="This is a warning"
        onVoteUp={onVoteUp}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    const voteUpButton = screen.getByLabelText('Vote up button');
    fireEvent.click(voteUpButton);

    expect(onVoteUp).toHaveBeenCalled();
  });

  it('fires onRemoveVoteUp when the remove vote up button is clicked', async () => {
    const onRemoveVoteUp = jest.fn();
    render(
      <Warning
        message="This is a warning"
        votedUp={true}
        onVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteUp={onRemoveVoteUp}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    const removeVoteUpButton = screen.getByLabelText('Remove vote up button');
    fireEvent.click(removeVoteUpButton);

    expect(onRemoveVoteUp).toHaveBeenCalled();
  });

  it('fires onVoteDown when the vote down button is clicked', async () => {
    const onVoteDown = jest.fn();
    render(
      <Warning
        message="This is a warning"
        onVoteUp={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onVoteDown={onVoteDown}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    const voteDownButton = screen.getByLabelText('Vote down button');
    fireEvent.click(voteDownButton);

    expect(onVoteDown).toHaveBeenCalled();
  });

  it('fires onRemoveVoteDown when the remove vote down button is clicked', async () => {
    const onRemoveVoteDown = jest.fn();
    render(
      <Warning
        message="This is a warning"
        votedDown={true}
        onVoteUp={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={onRemoveVoteDown}
        onCloseWarning={jest.fn()}
      />,
    );

    const removeVoteDownButton = screen.getByLabelText(
      'Remove vote down button',
    );
    fireEvent.click(removeVoteDownButton);

    expect(onRemoveVoteDown).toHaveBeenCalled();
  });

  it('marks this as error if isError is true', async () => {
    render(
      <Warning
        message="This is a warning"
        isError={true}
        onVoteUp={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Warning')).toHaveClass('error');
  });

  it('defaults to isError false', async () => {
    render(
      <Warning
        message="This is a warning"
        onVoteUp={jest.fn()}
        onRemoveVoteUp={jest.fn()}
        onVoteDown={jest.fn()}
        onRemoveVoteDown={jest.fn()}
        onCloseWarning={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Warning')).not.toHaveClass('error');
  });
});
