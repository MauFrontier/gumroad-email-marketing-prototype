import {render, screen, within} from '@testing-library/react';
import TargetingFilterSubjectQualifier from './TargetingFilterSubjectQualifier';
import {
  SegmentationFilterSubject as TargetingFilterSubjectEnum,
  SegmentationFilterSubjectQualifier as TargetingFilterSubjectQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('TargetingFilterSubjectQualifier', () => {
  it('renders component', () => {
    render(
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
      />,
    );
    expect(
      screen.getByLabelText('Filter subject qualifier'),
    ).toBeInTheDocument();
  });

  it('sets the right value', () => {
    render(
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
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
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
        onChange={onChange}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');
    const option = screen.getByText(
      TargetingFilterSubjectQualifierEnum.Purchased,
    );

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(
      TargetingFilterSubjectQualifierEnum.Purchased,
    );
  });

  it("doesn't display if subject isn't Date", () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Payment}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
        onChange={onChange}
      />,
    );
    expect(
      screen.queryByLabelText('Filter subject qualifier'),
    ).not.toBeInTheDocument();
  });

  it('disables Select component when disabled prop is true', () => {
    render(
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
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
      <TargetingFilterSubjectQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterSubjectQualifierEnum.Purchased}
        onChange={jest.fn()}
      />,
    );

    const subjectQualifier = screen.getByLabelText('Filter subject qualifier');
    const selectElement = within(subjectQualifier).getByRole('combobox');

    expect(selectElement).not.toBeDisabled();
  });
});
