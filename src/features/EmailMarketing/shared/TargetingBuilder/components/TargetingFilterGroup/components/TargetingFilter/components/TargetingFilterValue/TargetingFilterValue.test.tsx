import {fireEvent, render, screen, within} from '@testing-library/react';
import TargetingFilterValue from './TargetingFilterValue';
import {
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterVerb,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import productsFromServer from '../../../../../../../../api/productsFromServer';

describe('TargetingFilterValue', () => {
  it('renders component', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsBefore}
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter value')).toBeInTheDocument();
  });

  it('Shows a currency input field when the subject is Payment', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Payment}
        verb={TargetingFilterVerb.IsMoreThan}
        value={300}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Currency amount input')).toBeInTheDocument();
  });

  it('Shows a date input field when the subject is Date and the verb is IsBefore, IsAfter, Is, and IsNot', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsBefore}
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
      />,
    );

    const dateInput = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
  });

  it('Shows a text input field when the subject is Date and the verb is IsInTheLast', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsInTheLast}
        value={30}
        onChange={jest.fn()}
      />,
    );

    const inputElement = screen.getByLabelText('Filter value');
    expect(inputElement).toBeInTheDocument();

    const dateInput = inputElement.querySelector('input[type="date"]');
    expect(dateInput).not.toBeInTheDocument();
  });

  it('Shows a select field when the subject is Location', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Location}
        verb={TargetingFilterVerb.Is}
        value={'CR'}
        onChange={jest.fn()}
      />,
    );

    const value = screen.getByLabelText('Filter value');
    const selectElement = within(value).getByRole('combobox');

    expect(selectElement).toBeInTheDocument();
  });

  it('Shows a ComboBox field when the subject is Product', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Product}
        verb={TargetingFilterVerb.HasBought}
        value={[]}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('ComboBox input')).toBeInTheDocument();
  });

  it('Calls onChange with new value when the subject is Payment', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Payment}
        verb={TargetingFilterVerb.IsMoreThan}
        value={300}
        onChange={onChange}
      />,
    );

    const inputElement = screen.getByLabelText('Currency amount input');
    await userEvent.type(inputElement, '0');

    expect(onChange).toHaveBeenCalledWith(3000);
  });

  it('Calls onChange with new value when the subject is Date and the verb is IsBefore, IsAfter, Is, and IsNot', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsBefore}
        value={'2021-01-01T00:00:00.000Z'}
        onChange={onChange}
      />,
    );

    const dateInputElement = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="date"]');

    if (dateInputElement) {
      fireEvent.change(dateInputElement, {target: {value: '2022-01-01'}});
    }

    expect(onChange).toHaveBeenCalledWith('2022-01-01');
  });

  it('Calls onChange with new value when the subject is Date and the verb is IsInTheLast', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsInTheLast}
        value={30}
        onChange={onChange}
      />,
    );

    const inputElement = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="number"]');

    if (inputElement) {
      await userEvent.type(inputElement, '0');
    }

    expect(onChange).toHaveBeenCalledWith(300);
  });

  it('Calls onChange with new value when the subject is Location', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Location}
        verb={TargetingFilterVerb.Is}
        value={'CR'}
        onChange={onChange}
      />,
    );

    const filerValueElement = screen.getByLabelText('Filter value');
    const selectElement = within(filerValueElement).getByRole('combobox');
    await userEvent.selectOptions(selectElement, 'US');

    expect(onChange).toHaveBeenCalledWith('US');
  });

  it('Calls onChange with new value when the subject is Product', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Product}
        verb={TargetingFilterVerb.HasBought}
        value={[]}
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText('ComboBox input');

    await userEvent.click(input);

    //TODO: If this becomes anything other than just a demo, figure out a generic way to click one of the suggestions without coupling this to the mock product list.
    await userEvent.click(screen.getByText(productsFromServer[0].value));

    expect(onChange).toHaveBeenCalledWith([productsFromServer[0].value]);
  });

  it('Uses the passed value when the subject is Payment', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Payment}
        verb={TargetingFilterVerb.IsMoreThan}
        value={300}
        onChange={jest.fn()}
      />,
    );

    const inputElement = screen.getByLabelText(
      'Currency amount input',
    ) as HTMLInputElement;

    expect(inputElement.value).toBe('300');
  });

  it('Uses the passed value when the subject is Date and the verb is IsBefore, IsAfter, Is, or IsNot', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsBefore}
        value={'2021-02-03T00:00:00.000Z'}
        onChange={jest.fn()}
      />,
    );

    const dateInputElement = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="date"]') as HTMLInputElement;

    expect(dateInputElement.value).toBe('2021-02-03');
  });

  it('Uses the passed value when the subject is Date and the verb is IsInTheLast', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsInTheLast}
        value={30}
        onChange={jest.fn()}
      />,
    );

    const inputElement = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="number"]') as HTMLInputElement;

    expect(inputElement.value).toBe('30');
  });

  it('Uses the passed value when the subject is Location', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Location}
        verb={TargetingFilterVerb.Is}
        value={'CR'}
        onChange={jest.fn()}
      />,
    );

    const filerValueElement = screen.getByLabelText('Filter value');
    const selectElement = within(filerValueElement).getByRole('combobox');

    expect(selectElement).toHaveValue('CR');
  });

  it('Uses the passed value when the subject is Product', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Product}
        verb={TargetingFilterVerb.HasBought}
        value={[productsFromServer[0].value]}
        onChange={jest.fn()}
      />,
    );

    const product = screen.getByText(productsFromServer[0].value);
    expect(product).toBeInTheDocument();
  });

  it('Formats date for display in the date field', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Date}
        verb={TargetingFilterVerb.IsBefore}
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
      />,
    );

    const dateInputElement = screen
      .getByLabelText('Filter value')
      .querySelector('input[type="date"]') as HTMLInputElement;

    expect(dateInputElement?.value).toBe('2021-01-01');
  });

  it('Shows Location options when the subject is Location', () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Location}
        verb={TargetingFilterVerb.Is}
        value={'CR'}
        onChange={jest.fn()}
      />,
    );

    const selectElement = screen.getByLabelText('Filter value');
    const option = selectElement.querySelector('option[value="US"]');

    expect(option).toBeInTheDocument();
  });

  it('Shows Product options when the subject is Product', async () => {
    render(
      <TargetingFilterValue
        subject={TargetingFilterSubjectEnum.Product}
        verb={TargetingFilterVerb.HasBought}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByLabelText('ComboBox input');

    await userEvent.click(input);

    const product1 = screen.getByText(productsFromServer[0].value);
    const product2 = screen.getByText(productsFromServer[1].value);

    expect(input).toBeInTheDocument();
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});