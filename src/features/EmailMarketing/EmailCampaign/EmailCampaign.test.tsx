import {render, screen} from '@testing-library/react';
import EmailCampaign from './EmailCampaign';

describe('EmailCampaign additional tests', () => {
  it('renders component', () => {
    render(<EmailCampaign />);
    expect(screen.getByTestId('EmailCampaign')).toBeInTheDocument();
  });
});
