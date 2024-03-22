import {fireEvent, render, screen} from '@testing-library/react';
import SegmentationBuilderHeader from './SegmentationBuilderHeader';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../store/emailMarketingActionTypes';
import {renderComponentWithState} from '../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../store/emailMarketingInitialState';

describe('SegmentationBuilderHeader', () => {
  it('renders component', () => {
    render(<SegmentationBuilderHeader />);
    expect(
      screen.getByLabelText('Segmentation builder header'),
    ).toBeInTheDocument();
  });

  it('renders recipients count', () => {
    render(<SegmentationBuilderHeader />);
    expect(screen.getByText(/Recipients/)).toBeInTheDocument();
  });

  it('renders Generate with AI button', () => {
    render(<SegmentationBuilderHeader />);
    expect(screen.getByText(/Generate with AI/)).toBeInTheDocument();
  });

  it('shows Generate with AI dialog when Generate with AI button is clicked', () => {
    render(<SegmentationBuilderHeader />);
    const button = screen.getByText(/Generate with AI/);

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
    });
  });

  it('should generate a (fake) recipient count based on the segmentation', () => {
    renderComponentWithState(
      <SegmentationBuilderHeader />,
      emailMarketingInitialState,
    );

    const countString = screen.getByLabelText(
      'Number of recipients',
    ).textContent;

    const countNumber = countString !== null ? parseInt(countString, 10) : -1;

    expect(countNumber).toBeGreaterThan(0);
    expect(countNumber).toBeLessThan(5000);
  });

  it('should default to 5000 recipients if segmentation is empty', () => {
    renderComponentWithState(<SegmentationBuilderHeader />, {
      ...emailMarketingInitialState,
      segmentation: {
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
