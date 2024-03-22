import {render, screen, within} from '@testing-library/react';
import SegmentationFilterSubject from './SegmentationFilterSubject';
import {SegmentationFilterSubject as SegmentationFilterSubjectEnum} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('SegmentationFilterSubject', () => {
  it('renders component', () => {
    render(
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter subject')).toBeInTheDocument();
  });

  it('shows subject options', () => {
    render(
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
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
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
        onChange={onChange}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterSubjectEnum.Date);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(SegmentationFilterSubjectEnum.Date);
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
        onChange={onChange}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterSubjectEnum.Payment);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(
      SegmentationFilterSubjectEnum.Payment,
    );
  });

  it('disables Select component when disabled prop is true', () => {
    render(
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
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
      <SegmentationFilterSubject
        value={SegmentationFilterSubjectEnum.Date}
        onChange={jest.fn()}
      />,
    );
    const subject = screen.getByLabelText('Filter subject');
    const selectElement = within(subject).getByRole('combobox');

    expect(selectElement).not.toBeDisabled();
  });
});
