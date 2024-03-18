import {render, screen, within} from '@testing-library/react';
import TargetingFilter from './TargetingFilter';
import {
  Operand,
  TargetingFilterSubject,
} from '../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';
import {dateFilterForTests} from '../../../../../../store/emailMarketingMockStateForTests';

describe('TargetingFilter', () => {
  it('renders component', () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);
    expect(screen.getByLabelText('Filter')).toBeInTheDocument();
  });

  it('renders operand picker', () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Operand')).toBeInTheDocument();
  });

  it('dispatches SetFilterOperand action when operand changes', async () => {
    render(
      <TargetingFilter
        targetingFilter={{...dateFilterForTests, operand: Operand.And}}
      />,
    );

    expect(screen.getByLabelText('Operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Operand');
    const selectElement = within(operandContainer).getByRole('combobox');

    await userEvent.selectOptions(selectElement, ['Or']);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterOperand,
      payload: {
        filterId: dateFilterForTests.id,
        operand: Operand.Or,
      },
    });
  });

  it('renders Subject picker', () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();
  });

  it('dispatches SetFilterSubject action when subject changes', async () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();

    const subjectContainer = screen.getByLabelText('Filter subject');
    const selectElement = within(subjectContainer).getByRole('combobox');
    const option = screen.getByText('Date');

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: dateFilterForTests.id,
        subject: TargetingFilterSubject.Date,
      },
    });
  });
});
