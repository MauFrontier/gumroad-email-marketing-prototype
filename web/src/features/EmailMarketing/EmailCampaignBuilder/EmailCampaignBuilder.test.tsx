import {render, screen, within} from '@testing-library/react';
import EmailCampaignBuilder from './EmailCampaignBuilder';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../store/emailMarketingActionTypes';
import {Channels} from './emailMarketingTypes';

describe('EmailCampaignBuilder', () => {
  it('renders component', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Email campaign builder')).toBeInTheDocument();
  });

  it('renders title input', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('renders audience selection', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Audience selection')).toBeInTheDocument();
  });

  it('renders segmentation builder', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Segmentation builder')).toBeInTheDocument();
  });

  it('renders internal tools container', () => {
    render(<EmailCampaignBuilder />);
    expect(
      screen.getByLabelText('Internal tools container'),
    ).toBeInTheDocument();
  });

  it('renders channel selection', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Select channel')).toBeInTheDocument();
  });

  it('sets the selected channel when a channel is selected', async () => {
    render(<EmailCampaignBuilder />);
    const selectContainer = screen.getByLabelText('Select channel');
    const selectElement = within(selectContainer).getByRole('combobox');

    await userEvent.selectOptions(selectElement, Channels.Email);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetChannel,
      payload: Channels.Email,
    });
  });

  it('renders allow comments checkbox', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Allow comments')).toBeInTheDocument();
  });

  it('sets whether comments are allowed', async () => {
    render(<EmailCampaignBuilder />);
    const checkbox = screen.getByLabelText('Allow comments');

    await userEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetAllowComments,
      payload: false,
    });
  });
});
