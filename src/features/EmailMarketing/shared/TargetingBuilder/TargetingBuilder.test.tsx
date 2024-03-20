import {fireEvent, render, screen, within} from '@testing-library/react';
import TargetingBuilder from './TargetingBuilder';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';
import {EmailMarketingActionType} from '../../store/emailMarketingStoreTypes';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {Operand} from '../emailMarketingTypes';

describe('TargetingBuilder', () => {
  it('renders component', () => {
    render(<TargetingBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it('renders targeting builder header, filter groups, and Add filter group button', () => {
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);

    expect(
      screen.getByLabelText('Targeting builder header'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();

    expect(screen.getAllByLabelText('Filter group').length > 0).toBe(true);
  });

  it('displays every filter group', () => {
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);
    expect(screen.getAllByRole('group')).toHaveLength(
      emailMarketingInitialState.targeting.filterGroups.length,
    );
  });

  it('disables AddFilterGroupButton and the filter groups while AI is loading', () => {
    renderComponentWithState(<TargetingBuilder />, {
      ...emailMarketingInitialState,
      isAILoading: true,
    });

    expect(screen.getByLabelText('Add filter group button')).toBeDisabled();

    const operand = screen.getByLabelText('Filter group operand');
    const operandSelect = within(operand).getByRole('combobox');
    expect(operandSelect).toBeDisabled();
  });

  it('does not disable AddFilterGroupButton and the filter groups while AI is not loading', () => {
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);

    expect(screen.getByLabelText('Add filter group button')).not.toBeDisabled();

    const operand = screen.getByLabelText('Filter group operand');
    const operandSelect = within(operand).getByRole('combobox');
    expect(operandSelect).not.toBeDisabled();
  });

  it('adds a new filter group when AddFilterGroupButton is clicked', () => {
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);

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
    renderComponentWithState(<TargetingBuilder />, {
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
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);

    expect(screen.queryByLabelText('AI error warning')).not.toBeInTheDocument();
  });

  it('displays the AI accuracy warning when it is visible', () => {
    renderComponentWithState(<TargetingBuilder />, {
      ...emailMarketingInitialState,
      showAIAccuracyWarning: true,
    });

    expect(screen.getByLabelText('AI accuracy warning')).toBeInTheDocument();
  });

  it('does not display the AI accuracy warning when it is not visible', () => {
    renderComponentWithState(<TargetingBuilder />, {
      ...emailMarketingInitialState,
      showAIAccuracyWarning: false,
    });

    expect(
      screen.queryByLabelText('AI accuracy warning'),
    ).not.toBeInTheDocument();
  });
});
