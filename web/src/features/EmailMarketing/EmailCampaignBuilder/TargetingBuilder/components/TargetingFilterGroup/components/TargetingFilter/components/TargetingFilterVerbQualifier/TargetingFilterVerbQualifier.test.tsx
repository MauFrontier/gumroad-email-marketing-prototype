import {render, screen, within} from '@testing-library/react';
import TargetingFilterVerbQualifier from './TargetingFilterVerbQualifier';
import {
  SegmentationFilterSubject as TargetingFilterSubjectEnum,
  SegmentationFilterVerbQualifier as TargetingFilterVerbQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('TargetingFilterVerbQualifier', () => {
  it('renders component', () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter verb qualifier')).toBeInTheDocument();
  });

  it("Won't display if it's not product", () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Filter verb qualifier'),
    ).not.toBeInTheDocument();
  });

  it("show options all and any when it's product.", () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );

    const selectElement = screen.getByLabelText('Filter verb qualifier');
    const anyOption = selectElement.querySelector(
      `option[value="${TargetingFilterVerbQualifierEnum.Any}"]`,
    );
    expect(anyOption).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbQualifierEnum.All),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbQualifierEnum.Any),
    ).toBeInTheDocument();
  });

  it('selects the passed value', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbQualifierEnum.Any}
        onChange={onChange}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerbQualifierEnum.All);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterVerbQualifierEnum.All);
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbQualifierEnum.Any}
        onChange={onChange}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerbQualifierEnum.All);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterVerbQualifierEnum.All);
  });

  it('uses Any if value is not provided', () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        onChange={jest.fn()}
      />,
    );

    const option = screen.getByText(TargetingFilterVerbQualifierEnum.Any);

    expect(option).toBeInTheDocument();
  });

  it('disables the select if the disabled prop is true', () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        disabled
        onChange={jest.fn()}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });

  it('does not disable the select by default if the disabled prop is not present', () => {
    render(
      <TargetingFilterVerbQualifier
        subject={TargetingFilterSubjectEnum.Product}
        onChange={jest.fn()}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    expect(selectElement).not.toBeDisabled();
  });
});
