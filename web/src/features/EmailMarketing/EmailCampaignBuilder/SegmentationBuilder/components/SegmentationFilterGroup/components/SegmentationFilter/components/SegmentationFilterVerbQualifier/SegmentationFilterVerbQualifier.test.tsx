import {render, screen, within} from '@testing-library/react';
import SegmentationFilterVerbQualifier from './SegmentationFilterVerbQualifier';
import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterVerbQualifier as SegmentationFilterVerbQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('SegmentationFilterVerbQualifier', () => {
  it('renders component', () => {
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter verb qualifier')).toBeInTheDocument();
  });

  it("Won't display if it's not product", () => {
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.queryByLabelText('Filter verb qualifier'),
    ).not.toBeInTheDocument();
  });

  it("show options all and any when it's product.", () => {
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbQualifierEnum.Any}
        onChange={jest.fn()}
      />,
    );

    const selectElement = screen.getByLabelText('Filter verb qualifier');
    const anyOption = selectElement.querySelector(
      `option[value="${SegmentationFilterVerbQualifierEnum.Any}"]`,
    );
    expect(anyOption).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbQualifierEnum.All),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbQualifierEnum.Any),
    ).toBeInTheDocument();
  });

  it('selects the passed value', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbQualifierEnum.Any}
        onChange={onChange}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerbQualifierEnum.All);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(
      SegmentationFilterVerbQualifierEnum.All,
    );
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbQualifierEnum.Any}
        onChange={onChange}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerbQualifierEnum.All);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(
      SegmentationFilterVerbQualifierEnum.All,
    );
  });

  it('uses Any if value is not provided', () => {
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        onChange={jest.fn()}
      />,
    );

    const option = screen.getByText(SegmentationFilterVerbQualifierEnum.Any);

    expect(option).toBeInTheDocument();
  });

  it('disables the select if the disabled prop is true', () => {
    render(
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
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
      <SegmentationFilterVerbQualifier
        subject={SegmentationFilterSubjectEnum.Product}
        onChange={jest.fn()}
      />,
    );

    const verbQualifier = screen.getByLabelText('Filter verb qualifier');
    const selectElement = within(verbQualifier).getByRole('combobox');
    expect(selectElement).not.toBeDisabled();
  });
});
