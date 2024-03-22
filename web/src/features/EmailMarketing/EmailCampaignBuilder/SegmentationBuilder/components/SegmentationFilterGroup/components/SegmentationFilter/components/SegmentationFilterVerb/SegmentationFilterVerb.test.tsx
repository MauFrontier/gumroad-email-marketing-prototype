import {render, screen, within} from '@testing-library/react';
import SegmentationFilterVerb from './SegmentationFilterVerb';
import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterVerb as SegmentationFilterVerbEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('SegmentationFilterVerb', () => {
  it('renders component', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter verb')).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Date subject', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${SegmentationFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsNot),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsAfter),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsBefore),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsInTheLast),
    ).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Payment subject', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Payment}
        value={SegmentationFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${SegmentationFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsNot),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsMoreThan),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsLessThan),
    ).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Location subject', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Location}
        value={SegmentationFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${SegmentationFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(
      screen.getByText(SegmentationFilterVerbEnum.IsNot),
    ).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Product subject', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByText(SegmentationFilterVerbEnum.HasBought),
    ).toBeInTheDocument();
    expect(
      screen.getByText(SegmentationFilterVerbEnum.HasNotYetBought),
    ).toBeInTheDocument();
  });

  it('selects the passed value', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterVerbEnum.Is}
        onChange={onChange}
      />,
    );
    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerbEnum.Is);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(SegmentationFilterVerbEnum.Is);
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Date}
        value={SegmentationFilterVerbEnum.Is}
        onChange={onChange}
      />,
    );
    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    const option = screen.getByText(SegmentationFilterVerbEnum.IsNot);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(SegmentationFilterVerbEnum.IsNot);
  });

  it('disables the verb select when the disabled prop is true', () => {
    render(
      <SegmentationFilterVerb
        subject={SegmentationFilterSubjectEnum.Product}
        value={SegmentationFilterVerbEnum.Is}
        disabled={true}
        onChange={jest.fn()}
      />,
    );

    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });
});
