import {render, screen, within} from '@testing-library/react';
import SegmentationFilter from './SegmentationFilter';
import {
  Operand,
  SegmentationFilterSubject,
  SegmentationFilterSubjectQualifier,
  SegmentationFilterVerb,
  SegmentationFilterVerbQualifier,
} from '../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingActionTypes';
import {
  dateFilterForTests,
  locationFilterForTests,
  paymentFilterForTests,
  productFilterForTests,
} from '../../../../../../store/emailMarketingMockStateForTests';

describe('SegmentationFilter', () => {
  it('renders component', () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);
    expect(screen.getByLabelText('Filter')).toBeInTheDocument();
  });

  it('renders operand picker', () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter operand')).toBeInTheDocument();
  });

  it("sets the filter's operand when the operand picker's value changes", async () => {
    render(
      <SegmentationFilter
        segmentationFilter={{...dateFilterForTests, operand: Operand.And}}
      />,
    );

    expect(screen.getByLabelText('Filter operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Filter operand');
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
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Delete filter button')).toBeInTheDocument();
  });

  it('deletes the filter when the "Delete filter" button is clicked', async () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    const deleteFilterButton = screen.getByLabelText('Delete filter button');

    await userEvent.click(deleteFilterButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.DeleteFilter,
      payload: dateFilterForTests.id,
    });
  });

  it('renders Subject picker', () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();
  });

  it("sets the filter's subject when the Subject picker's value changes", async () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();

    const subjectContainer = screen.getByLabelText('Filter subject');
    const selectElement = within(subjectContainer).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterSubject.Date);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: dateFilterForTests.id,
        subject: SegmentationFilterSubject.Date,
      },
    });
  });

  it('renders Subject Qualifier picker if filter includes it', () => {
    render(
      <SegmentationFilter
        segmentationFilter={{
          ...dateFilterForTests,
          subject: SegmentationFilterSubject.Date,
        }}
      />,
    );

    expect(
      screen.getByLabelText('Filter subject qualifier'),
    ).toBeInTheDocument();
  });

  it("sets the FilterSubjectQualifier when subject qualifier picker's value changes", async () => {
    render(
      <SegmentationFilter
        segmentationFilter={{
          ...dateFilterForTests,
          subject: SegmentationFilterSubject.Date,
        }}
      />,
    );

    const subjectQualifierContainer = screen.getByLabelText(
      'Filter subject qualifier',
    );
    const selectElement = within(subjectQualifierContainer).getByRole(
      'combobox',
    );
    const option = screen.getByText(
      SegmentationFilterSubjectQualifier.Purchased,
    );

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterSubjectQualifier,
      payload: {
        filterId: dateFilterForTests.id,
        subjectQualifier: SegmentationFilterSubjectQualifier.Purchased,
      },
    });
  });

  it('renders Verb picker', () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter verb')).toBeInTheDocument();
  });

  it("sets the filter verb when verb picker's value changes", async () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerb.Is);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: dateFilterForTests.id,
        verb: SegmentationFilterVerb.Is,
      },
    });
  });

  it('resets the value if verb changes from Is || IsBefore || IsAfter || IsNot to IsInTheLast', async () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const optionIsInTheLast = screen.getByText(
      SegmentationFilterVerb.IsInTheLast,
    );

    await userEvent.selectOptions(selectElement, optionIsInTheLast);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: dateFilterForTests.id,
        verb: SegmentationFilterVerb.IsInTheLast,
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: dateFilterForTests.id,
        value: expect.any(Number),
      },
    });
  });

  it('resets the value if verb changes from IsInTheLast to Is || IsBefore || IsAfter || IsNot', async () => {
    render(
      <SegmentationFilter
        segmentationFilter={{
          ...dateFilterForTests,
          verb: SegmentationFilterVerb.IsInTheLast,
          value: 100,
        }}
      />,
    );

    const verbContainer = screen.getByLabelText('Filter verb');
    const selectElement = within(verbContainer).getByRole('combobox');
    const optionIs = screen.getByText(SegmentationFilterVerb.Is);

    await userEvent.selectOptions(selectElement, optionIs);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: dateFilterForTests.id,
        verb: SegmentationFilterVerb.Is,
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: dateFilterForTests.id,
        value: expect.any(String),
      },
    });
  });

  it('renders Verb Qualifier picker if filter includes it', () => {
    render(<SegmentationFilter segmentationFilter={productFilterForTests} />);

    expect(screen.getByLabelText('Filter verb qualifier')).toBeInTheDocument();
  });

  it("doesn't render Verb Qualifier picker if filter doesn't include it", () => {
    render(<SegmentationFilter segmentationFilter={locationFilterForTests} />);

    expect(screen.queryByLabelText('Filter verb qualifier')).toBeNull();
  });

  it("sets the filter's VerbQualifier when the verb qualifier picker's value changes", async () => {
    render(<SegmentationFilter segmentationFilter={productFilterForTests} />);

    const verbQualifierContainer = screen.getByLabelText(
      'Filter verb qualifier',
    );
    const selectElement = within(verbQualifierContainer).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerbQualifier.All);

    await userEvent.selectOptions(selectElement, option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterVerbQualifier,
      payload: {
        filterId: productFilterForTests.id,
        verbQualifier: SegmentationFilterVerbQualifier.All,
      },
    });
  });

  it('renders Value field', () => {
    render(<SegmentationFilter segmentationFilter={dateFilterForTests} />);

    expect(screen.getByLabelText('Filter value')).toBeInTheDocument();
  });

  it("sets the filter's value when the value field changes", async () => {
    render(<SegmentationFilter segmentationFilter={paymentFilterForTests} />);

    const valueField = screen.getByLabelText('Currency amount input');
    await userEvent.type(valueField, '0');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: paymentFilterForTests.id,
        value: paymentFilterForTests.value * 10,
      },
    });
  });

  it('disables its direct children and at least one filtering input when the disabled prop is included', () => {
    //I don't want to get this too coupled to its children's implementations,
    //and they're each getting tested on getting disabled, so we can let
    //integration tests handle that and not test all of them here.
    render(
      <SegmentationFilter
        segmentationFilter={{...dateFilterForTests, operand: Operand.And}}
        disabled={true}
      />,
    );

    const verb = screen.getByLabelText('Filter verb');
    const verbSelectElement = within(verb).getByRole('combobox');
    expect(verbSelectElement).toBeDisabled();

    const deleteFilterButton = screen.getByLabelText('Delete filter button');
    expect(deleteFilterButton).toBeDisabled();

    const operandContainer = screen.getByLabelText('Filter operand');
    const operandSelect = within(operandContainer).getByRole('combobox');
    expect(operandSelect).toBeDisabled();
  });

  it('does not disable its direct children and at least one filtering input when the disabled prop is not included', () => {
    //I don't want to get this too coupled to its children's implementations,
    //and they're each getting tested on getting disabled, so we can let
    //integration tests handle that and not test all of them here.
    render(
      <SegmentationFilter
        segmentationFilter={{...dateFilterForTests, operand: Operand.And}}
      />,
    );

    const verb = screen.getByLabelText('Filter verb');
    const verbSelectElement = within(verb).getByRole('combobox');
    expect(verbSelectElement).not.toBeDisabled();

    const deleteFilterButton = screen.getByLabelText('Delete filter button');
    expect(deleteFilterButton).not.toBeDisabled();

    const operandContainer = screen.getByLabelText('Filter operand');
    const operandSelect = within(operandContainer).getByRole('combobox');
    expect(operandSelect).not.toBeDisabled();
  });
});
