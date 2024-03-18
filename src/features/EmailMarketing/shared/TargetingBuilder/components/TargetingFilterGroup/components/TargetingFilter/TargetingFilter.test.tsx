import {render, screen, within} from '@testing-library/react';
import TargetingFilter from './TargetingFilter';
import {
  Operand,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from '../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';
import {
  dateFilterForTests,
  locationFilterForTests,
  productFilterForTests,
} from '../../../../../../store/emailMarketingMockStateForTests';

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

    await userEvent.selectOptions(selectElement, [Operand.Or]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterOperand,
      payload: {
        filterId: dateFilterForTests.id,
        operand: Operand.Or,
      },
    });
  });

  it('renders Delete filter button', () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Delete filter button')).toBeInTheDocument();
  });

  it('dispatches DeleteFilter action when Delete filter button is clicked', async () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    const deleteFilterButton = screen.getByLabelText('Delete filter button');

    await userEvent.click(deleteFilterButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.DeleteFilter,
      payload: dateFilterForTests.id,
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
    const option = screen.getByText(TargetingFilterSubject.Date);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: dateFilterForTests.id,
        subject: TargetingFilterSubject.Date,
      },
    });
  });

  it('renders Subject Qualifier picker if filter includes it', () => {
    render(
      <TargetingFilter
        targetingFilter={{
          ...dateFilterForTests,
          subject: TargetingFilterSubject.Date,
        }}
      />,
    );

    expect(
      screen.getByLabelText('Filter subject qualifier'),
    ).toBeInTheDocument();
  });

  it('dispatches SetFilterSubjectQualifier action when subject qualifier changes', async () => {
    render(
      <TargetingFilter
        targetingFilter={{
          ...dateFilterForTests,
          subject: TargetingFilterSubject.Date,
        }}
      />,
    );

    const subjectQualifierContainer = screen.getByLabelText(
      'Filter subject qualifier',
    );
    const selectElement = within(subjectQualifierContainer).getByRole(
      'combobox',
    );
    const option = screen.getByText(TargetingFilterSubjectQualifier.Purchased);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterSubjectQualifier,
      payload: {
        filterId: dateFilterForTests.id,
        subjectQualifier: TargetingFilterSubjectQualifier.Purchased,
      },
    });
  });

  it('renders Verb picker', () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter verb')).toBeInTheDocument();
  });

  it('dispatches SetFilterVerb action when verb changes', async () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerb.Is);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: dateFilterForTests.id,
        verb: TargetingFilterVerb.Is,
      },
    });
  });

  it('resets the value if verb changes from Is || IsBefore || IsAfter || IsNot to IsInTheLast', async () => {
    render(<TargetingFilter targetingFilter={dateFilterForTests} />);

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const optionIsInTheLast = screen.getByText(TargetingFilterVerb.IsInTheLast);

    await userEvent.selectOptions(selectElement, optionIsInTheLast);

    expect(mockDispatch.mock.calls[mockDispatch.mock.calls.length - 2]).toEqual(
      [
        {
          type: EmailMarketingActionType.SetFilterVerb,
          payload: {
            filterId: dateFilterForTests.id,
            verb: TargetingFilterVerb.IsInTheLast,
          },
        },
      ],
    );

    expect(mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1]).toEqual(
      [
        {
          type: EmailMarketingActionType.SetFilterValue,
          payload: {
            filterId: dateFilterForTests.id,
            value: expect.any(Number),
          },
        },
      ],
    );
  });

  it('resets the value if verb changes from IsInTheLast to Is || IsBefore || IsAfter || IsNot', async () => {
    render(
      <TargetingFilter
        targetingFilter={{
          ...dateFilterForTests,
          verb: TargetingFilterVerb.IsInTheLast,
          value: 100,
        }}
      />,
    );

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const optionIs = screen.getByText(TargetingFilterVerb.Is);

    await userEvent.selectOptions(selectElement, optionIs);

    expect(mockDispatch.mock.calls[mockDispatch.mock.calls.length - 2]).toEqual(
      [
        {
          type: EmailMarketingActionType.SetFilterVerb,
          payload: {
            filterId: dateFilterForTests.id,
            verb: TargetingFilterVerb.Is,
          },
        },
      ],
    );

    expect(mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1]).toEqual(
      [
        {
          type: EmailMarketingActionType.SetFilterValue,
          payload: {
            filterId: dateFilterForTests.id,
            value: expect.any(String),
          },
        },
      ],
    );
  });

  it('renders Verb Qualifier picker if filter includes it', () => {
    render(<TargetingFilter targetingFilter={productFilterForTests} />);

    expect(screen.getByLabelText('Filter verb qualifier')).toBeInTheDocument();
  });

  it("doesn't render Verb Qualifier picker if filter doesn't include it", () => {
    render(<TargetingFilter targetingFilter={locationFilterForTests} />);

    expect(screen.queryByLabelText('Filter verb qualifier')).toBeNull();
  });

  it('dispatches SetFilterVerbQualifier action when verb qualifier changes', async () => {
    render(<TargetingFilter targetingFilter={productFilterForTests} />);

    const verbQualifierContainer = screen.getByLabelText(
      'Filter verb qualifier',
    );
    const selectElement = within(verbQualifierContainer).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerbQualifier.All);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerbQualifier,
      payload: {
        filterId: productFilterForTests.id,
        verbQualifier: TargetingFilterVerbQualifier.All,
      },
    });
  });
});
