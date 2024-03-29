import {fireEvent, render, screen, within} from '@testing-library/react';
import SegmentationBuilder from './SegmentationBuilder';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {Operand} from '../emailMarketingTypes';

describe('SegmentationBuilder', () => {
  it('renders component', () => {
    render(<SegmentationBuilder />);
    expect(screen.getByLabelText('Segmentation builder')).toBeInTheDocument();
  });

  it('renders segmentation builder header, filter groups, and Add filter group button', () => {
    renderComponentWithState(
      <SegmentationBuilder />,
      emailMarketingInitialState,
    );

    expect(
      screen.getByLabelText('Segmentation builder header'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();

    expect(screen.getAllByLabelText('Filter group').length > 0).toBe(true);
  });

  it('displays every filter group', () => {
    renderComponentWithState(
      <SegmentationBuilder />,
      emailMarketingInitialState,
    );
    expect(screen.getAllByRole('group')).toHaveLength(
      emailMarketingInitialState.segmentation.filterGroups.length,
    );
  });

  it('disables AddFilterGroupButton and the filter groups while AI is loading', () => {
    renderComponentWithState(<SegmentationBuilder />, {
      ...emailMarketingInitialState,
      isAILoading: true,
    });

    expect(screen.getByLabelText('Add filter group button')).toBeDisabled();

    const operand = screen.getByLabelText('Filter group operand');
    const operandSelect = within(operand).getByRole('combobox');
    expect(operandSelect).toBeDisabled();
  });

  it('does not disable AddFilterGroupButton and the filter groups while AI is not loading', () => {
    renderComponentWithState(
      <SegmentationBuilder />,
      emailMarketingInitialState,
    );

    expect(screen.getByLabelText('Add filter group button')).not.toBeDisabled();

    const operand = screen.getByLabelText('Filter group operand');
    const operandSelect = within(operand).getByRole('combobox');
    expect(operandSelect).not.toBeDisabled();
  });

  it('adds a new filter group when AddFilterGroupButton is clicked', () => {
    renderComponentWithState(
      <SegmentationBuilder />,
      emailMarketingInitialState,
    );

    const button = screen.getByLabelText('Add filter group button');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.AddFilterGroup,
      payload: {
        id: expect.any(String),
        operand: Operand.And,
        filters: [],
      },
    });
  });

  it('displays the error warnings when any are present', () => {
    renderComponentWithState(<SegmentationBuilder />, {
      ...emailMarketingInitialState,
      aiErrors: [
        {id: 'test-id-1', isVisible: true, error: 'test error 1'},
        {id: 'test-id-2', isVisible: true, error: 'test error 2'},
      ],
    });

    expect(screen.getAllByLabelText('AI error warning').length > 0).toBe(true);
    expect(screen.queryByText('test error 1')).toBeInTheDocument();
    expect(screen.queryByText('test error 2')).toBeInTheDocument();
  });

  it('does not display the error warnings when none are present', () => {
    renderComponentWithState(
      <SegmentationBuilder />,
      emailMarketingInitialState,
    );

    expect(screen.queryByLabelText('AI error warning')).not.toBeInTheDocument();
  });

  it('displays the AI accuracy warning when it is visible', () => {
    renderComponentWithState(<SegmentationBuilder />, {
      ...emailMarketingInitialState,
      showAIAccuracyWarning: true,
    });

    expect(screen.getByLabelText('AI accuracy warning')).toBeInTheDocument();
  });

  it('does not display the AI accuracy warning when it is not visible', () => {
    renderComponentWithState(<SegmentationBuilder />, {
      ...emailMarketingInitialState,
      showAIAccuracyWarning: false,
    });

    expect(
      screen.queryByLabelText('AI accuracy warning'),
    ).not.toBeInTheDocument();
  });
});
