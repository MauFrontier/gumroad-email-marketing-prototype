import {render, screen, within} from '@testing-library/react';
import TargetingFilterSubject from './TargetingFilterSubject';
import {TargetingFilterSubject as TargetingFilterSubjectEnum} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('TargetingFilterSubject', () => {
  it('renders component', () => {
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();
  });

  it('shows subject options', () => {
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  it('selects the passed value', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={onChange}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');
    const option = screen.getByText(TargetingFilterSubjectEnum.Date);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterSubjectEnum.Date);
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={onChange}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');
    const option = screen.getByText(TargetingFilterSubjectEnum.Payment);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterSubjectEnum.Payment);
  });

  it('disables Select component when disabled prop is true', () => {
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={jest.fn()}
        disabled={true}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');

    expect(selectElement).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(
      <TargetingFilterSubject
        value={TargetingFilterSubjectEnum.Date}
        onChange={jest.fn()}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');

    expect(selectElement).not.toBeDisabled();
  });
});
