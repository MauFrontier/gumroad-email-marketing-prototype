import {fireEvent, render, screen} from '@testing-library/react';
import TargetingBuilderHeader from './TargetingBuilderHeader';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';

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

  it('should generate a (fake) recipient count based on the targeting', () => {
    renderComponentWithState(
      <TargetingBuilderHeader />,
      emailMarketingInitialState,
    );

    const countString = screen.getByLabelText(
      'Number of recipients',
    ).textContent;

    const countNumber = countString !== null ? parseInt(countString, 10) : -1;

    expect(countNumber).toBeGreaterThan(0);
    expect(countNumber).toBeLessThan(5000);
  });

  it('should default to 5000 recipients if targeting is empty', () => {
    renderComponentWithState(<TargetingBuilderHeader />, {
      ...emailMarketingInitialState,
      targeting: {
        filterGroups: [],
      },
    });

    const countString = screen.getByLabelText(
      'Number of recipients',
    ).textContent;

    const countNumber = countString !== null ? parseInt(countString, 10) : -1;

    expect(countNumber).toBe(5000);
  });
});
