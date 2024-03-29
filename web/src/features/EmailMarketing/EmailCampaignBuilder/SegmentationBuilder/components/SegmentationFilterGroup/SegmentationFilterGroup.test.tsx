import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SegmentationFilterGroup from './SegmentationFilterGroup';
import {Operand as OperandEnum} from '../../../emailMarketingTypes';
import {defaultDateFilter} from '../../../emailMarketingDefaults';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../store/emailMarketingActionTypes';

jest.mock('../../../../store/useEmailMarketingState');

describe('SegmentationFilterGroup', () => {
  const baseProps = {
    segmentationFilterGroup: {
      id: 'group-id',
      operand: OperandEnum.And,
      filters: [],
    },
  };

  it('renders without filters', () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Filter group')).toBeInTheDocument();
    expect(screen.queryByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.queryAllByLabelText('Filter')).toHaveLength(0);
  });

  it('renders with filters', () => {
    const propsWithFilters = {
      ...baseProps,
      segmentationFilterGroup: {
        ...baseProps.segmentationFilterGroup,
        filters: [defaultDateFilter],
      },
    };

    render(<SegmentationFilterGroup {...propsWithFilters} />);
    expect(screen.getByLabelText('Filter group')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Filter')).toHaveLength(1);
    expect(screen.getByLabelText('Filter')).toBeInTheDocument();
  });

  it("does not display Operand field if the filter group's operand is undefined or Initial", () => {
    render(
      <SegmentationFilterGroup
        {...{
          ...baseProps,
          segmentationFilterGroup: {
            ...baseProps.segmentationFilterGroup,
            operand: undefined,
          },
        }}
      />,
    );

    expect(screen.queryAllByLabelText('Filter group operand')).toHaveLength(0);

    render(
      <SegmentationFilterGroup
        {...{
          ...baseProps,
          segmentationFilterGroup: {
            ...baseProps.segmentationFilterGroup,
            operand: OperandEnum.Initial,
          },
        }}
      />,
    );

    expect(screen.queryAllByLabelText('Filter group operand')).toHaveLength(0);
  });

  it('displays operand selector with correct value when one is provided', () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Filter group operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Filter group operand');
    const selectElement = within(operandContainer).getByRole('combobox');

    expect(selectElement).toHaveValue(OperandEnum.And);
  });

  it('displays add filter button', () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Add filter button')).toBeInTheDocument();
  });

  it('displays delete filter group button', () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(
      screen.getByLabelText('Delete filter group button'),
    ).toBeInTheDocument();
  });

  it('adds a filter when add filter button is clicked', async () => {
    const user = userEvent.setup();
    const propsWithFilters = {
      ...baseProps,
      segmentationFilterGroup: {
        ...baseProps.segmentationFilterGroup,
        filters: [],
      },
    };

    render(<SegmentationFilterGroup {...propsWithFilters} />);
    expect(screen.getByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.queryAllByLabelText('Filter')).toHaveLength(0);

    await user.click(screen.getByLabelText('Add filter button'));

    const filterWithoutOperand = {...defaultDateFilter};
    delete filterWithoutOperand.operand;

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.AddFilter,
      payload: {
        filterGroupId: propsWithFilters.segmentationFilterGroup.id,
        filter: filterWithoutOperand,
      },
    });
  });

  it('deletes the filter group', async () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(
      screen.getByLabelText('Delete filter group button'),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Delete filter group button'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.DeleteFilterGroup,
      payload: baseProps.segmentationFilterGroup.id,
    });
  });

  it("sets the filter group's operand", async () => {
    render(<SegmentationFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Filter group operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Filter group operand');
    const selectElement = within(operandContainer).getByRole('combobox');

    await userEvent.selectOptions(selectElement, ['Or']);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterGroupOperand,
      payload: {
        filterGroupId: baseProps.segmentationFilterGroup.id,
        operand: OperandEnum.Or,
      },
    });
  });

  it('disables its direct children and at least one filtering input when the disabled prop is included', () => {
    //I don't want to get this too coupled to its children's implementations,
    //and they're each getting tested on getting disabled, so we can let
    //integration tests handle that and not test all of them here.
    render(
      <SegmentationFilterGroup
        {...baseProps}
        segmentationFilterGroup={{
          ...baseProps.segmentationFilterGroup,
          filters: [defaultDateFilter],
        }}
        disabled={true}
      />,
    );

    const verb = screen.getByLabelText('Filter verb');
    const verbSelectElement = within(verb).getByRole('combobox');
    expect(verbSelectElement).toBeDisabled();

    const deleteFilterButton = screen.getByLabelText(
      'Delete filter group button',
    );
    expect(deleteFilterButton).toBeDisabled();

    const operandContainer = screen.getByLabelText('Filter group operand');
    const operandSelect = within(operandContainer).getByRole('combobox');
    expect(operandSelect).toBeDisabled();
  });
});
