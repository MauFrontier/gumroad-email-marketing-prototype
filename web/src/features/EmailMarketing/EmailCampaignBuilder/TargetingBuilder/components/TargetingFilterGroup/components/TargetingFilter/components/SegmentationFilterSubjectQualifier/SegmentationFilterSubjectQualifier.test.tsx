import {render, screen, within} from '@testing-library/react';
import SegmentationFilterSubjectQualifier from './SegmentationFilterSubjectQualifier';
import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterSubjectQualifier as SegmentationFilterSubjectQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('SegmentationFilterSubjectQualifier', () => {
  it('renders component', () => {
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
      />,
    );
    expect(
      screen.getByLabelText('Filter subject qualifier'),
    ).toBeInTheDocument();
  });

  it('sets the right value', () => {
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');

    expect(selectElement).toHaveValue('Purchased');
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={onChange}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');
    const option = screen.getByText(
      SegmentationFilterSubjectQualifierEnum.Purchased,
    );

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(
      SegmentationFilterSubjectQualifierEnum.Purchased,
    );
  });

  it("doesn't display if subject isn't Date", () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Payment}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={onChange}
      />,
    );
    expect(
      screen.queryByLabelText('Filter subject qualifier'),
    ).not.toBeInTheDocument();
  });

  it('disables Select component when disabled prop is true', () => {
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
        disabled={true}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');

    expect(selectElement).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(
      <SegmentationFilterSubjectQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');

    expect(selectElement).not.toBeDisabled();
  });
});
