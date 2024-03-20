import {fireEvent, render, screen} from '@testing-library/react';
import TargetingBuilderHeader from './TargetingBuilderHeader';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../store/emailMarketingStoreTypes';

describe('TargetingBuilderHeader', () => {
  it('renders component', () => {
    render(<TargetingBuilderHeader />);
    expect(
      screen.getByLabelText('Targeting builder header'),
    ).toBeInTheDocument();
  });

  it('renders recipients count', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByText(/Recipients/)).toBeInTheDocument();
  });

  it('renders Generate with AI button', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByText(/Generate with AI/)).toBeInTheDocument();
  });

  it('shows Generate with AI dialog when Generate with AI button is clicked', () => {
    render(<TargetingBuilderHeader />);
    const button = screen.getByText(/Generate with AI/);

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
    });
  });
});
