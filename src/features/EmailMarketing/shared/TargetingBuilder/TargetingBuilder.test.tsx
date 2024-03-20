import {render, screen, within} from '@testing-library/react';
import TargetingBuilder from './TargetingBuilder';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';

describe('TargetingBuilder', () => {
  it('renders component', () => {
    render(<TargetingBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it("renders TargetingBuilder's components", () => {
    render(<TargetingBuilder />);
    expect(
      screen.getByLabelText('Targeting builder header'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();
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

});
