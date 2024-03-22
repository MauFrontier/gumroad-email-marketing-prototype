import {render, screen, within} from '@testing-library/react';
import TargetingFilterVerb from './TargetingFilterVerb';
import {
  SegmentationFilterSubject as TargetingFilterSubjectEnum,
  SegmentationFilterVerb as TargetingFilterVerbEnum,
} from '../../../../../../../emailMarketingTypes';
import userEvent from '@testing-library/user-event';

describe('TargetingFilterVerb', () => {
  it('renders component', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Filter verb')).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Date subject', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${TargetingFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(screen.getByText(TargetingFilterVerbEnum.IsNot)).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.IsAfter),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.IsBefore),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.IsInTheLast),
    ).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Payment subject', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Payment}
        value={TargetingFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${TargetingFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(screen.getByText(TargetingFilterVerbEnum.IsNot)).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.IsMoreThan),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.IsLessThan),
    ).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Location subject', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Location}
        value={TargetingFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    //We'd get a partial match for 'Is' in all the other options,
    //so we'll be more specific just on this one.
    const selectElement = screen.getByLabelText('Filter verb');
    const isOption = selectElement.querySelector(
      `option[value="${TargetingFilterVerbEnum.Is}"]`,
    );
    expect(isOption).toBeInTheDocument();

    expect(screen.getByText(TargetingFilterVerbEnum.IsNot)).toBeInTheDocument();
  });

  it('shows options that are appropriate for the Product subject', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbEnum.Is}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByText(TargetingFilterVerbEnum.HasBought),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TargetingFilterVerbEnum.HasNotYetBought),
    ).toBeInTheDocument();
  });

  it('selects the passed value', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterVerbEnum.Is}
        onChange={onChange}
      />,
    );
    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerbEnum.Is);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterVerbEnum.Is);
  });

  it('calls onChange with new value when selection changes', async () => {
    const onChange = jest.fn();
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Date}
        value={TargetingFilterVerbEnum.Is}
        onChange={onChange}
      />,
    );
    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    const option = screen.getByText(TargetingFilterVerbEnum.IsNot);

    await userEvent.selectOptions(selectElement, option);

    expect(onChange).toHaveBeenCalledWith(TargetingFilterVerbEnum.IsNot);
  });

  it('disables the verb select when the disabled prop is true', () => {
    render(
      <TargetingFilterVerb
        subject={TargetingFilterSubjectEnum.Product}
        value={TargetingFilterVerbEnum.Is}
        disabled={true}
        onChange={jest.fn()}
      />,
    );

    const verb = screen.getByLabelText('Filter verb');
    const selectElement = within(verb).getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });
});
