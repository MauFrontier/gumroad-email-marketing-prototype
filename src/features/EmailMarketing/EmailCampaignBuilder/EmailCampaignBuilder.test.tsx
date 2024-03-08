import {render, screen} from '@testing-library/react';
import EmailCampaignBuilder from './EmailCampaignBuilder';

describe('EmailCampaign additional tests', () => {
  it('renders component', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByTestId('EmailCampaign')).toBeInTheDocument();
  });
});
