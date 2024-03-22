import {render, screen, within} from '@testing-library/react';
import WorkflowBuilder from './WorkflowBuilder';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../store/emailMarketingActionTypes';
import {Channels} from './emailMarketingTypes';

describe('WorkflowBuilder', () => {
  it('renders component', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Workflow builder')).toBeInTheDocument();
  });

  it('renders title input', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('renders audience selection', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Audience selection')).toBeInTheDocument();
  });

  it('renders targeting builder', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it('renders internal tools container', () => {
    render(<WorkflowBuilder />);
    expect(
      screen.getByLabelText('Internal tools container'),
    ).toBeInTheDocument();
  });

  it('renders channel selection', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Select channel')).toBeInTheDocument();
  });

  it('sets the selected channel when a channel is selected', async () => {
    render(<WorkflowBuilder />);
    const selectContainer = screen.getByLabelText('Select channel');
    const selectElement = within(selectContainer).getByRole('combobox');

    await userEvent.selectOptions(selectElement, Channels.Email);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetChannel,
      payload: Channels.Email,
    });
  });

  it('renders allow comments checkbox', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Allow comments')).toBeInTheDocument();
  });

  it('sets whether comments are allowed', async () => {
    render(<WorkflowBuilder />);
    const checkbox = screen.getByLabelText('Allow comments');

    await userEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetAllowComments,
      payload: false,
    });
  });
});
