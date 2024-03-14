import {render, screen} from '@testing-library/react';
import EmailCampaignBuilder from './EmailCampaignBuilder';

describe('EmailCampaignBuilder', () => {
  it('renders component', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Email campaign builder')).toBeInTheDocument();
  });

  it("renders EmailCampaignBuilder's components", () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Channel')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Allow comments in your posts'),
    ).toBeInTheDocument();
  });

  it('renders targeting builder', () => {
    render(<EmailCampaignBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });
});
