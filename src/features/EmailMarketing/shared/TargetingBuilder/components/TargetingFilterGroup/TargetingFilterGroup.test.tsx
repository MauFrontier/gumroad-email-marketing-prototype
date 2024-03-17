import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TargetingFilterGroup from './TargetingFilterGroup';
import {Operand as OperandEnum} from '../../../emailMarketingTypes';
import {defaultDateFilter} from '../../../emailMarketingDefaults';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';

jest.mock('../../../../store/useEmailMarketingState');

describe('TargetingFilterGroup', () => {
  const baseProps = {
    targetingFilterGroup: {
      id: 'group-id',
      operand: OperandEnum.And,
      filters: [],
    },
  };

  it('renders without filters', () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Filter group')).toBeInTheDocument();
    expect(screen.queryByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.queryAllByLabelText('Filter')).toHaveLength(0);
  });

  it('renders with filters', () => {
    const propsWithFilters = {
      ...baseProps,
      targetingFilterGroup: {
        ...baseProps.targetingFilterGroup,
        filters: [defaultDateFilter],
      },
    };

    render(<TargetingFilterGroup {...propsWithFilters} />);
    expect(screen.getByLabelText('Filter group')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Filter')).toHaveLength(1);
    expect(screen.getByLabelText('Filter')).toBeInTheDocument();
  });

  it("does not display Operand field if the filter group's operand is undefined or Initial", () => {
    render(
      <TargetingFilterGroup
        {...{
          ...baseProps,
          targetingFilterGroup: {
            ...baseProps.targetingFilterGroup,
            operand: undefined,
          },
        }}
      />,
    );

    expect(screen.queryAllByLabelText('Operand')).toHaveLength(0);

    render(
      <TargetingFilterGroup
        {...{
          ...baseProps,
          targetingFilterGroup: {
            ...baseProps.targetingFilterGroup,
            operand: OperandEnum.Initial,
          },
        }}
      />,
    );

    expect(screen.queryAllByLabelText('Operand')).toHaveLength(0);
  });

  it('displays operand selector with correct value when one is provided', () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Operand');
    const selectElement = within(operandContainer).getByRole('combobox');

    expect(selectElement).toHaveValue(OperandEnum.And);
  });

  it('displays add filter button', () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Add filter button')).toBeInTheDocument();
  });

  it('displays delete filter group button', () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(
      screen.getByLabelText('Delete filter group button'),
    ).toBeInTheDocument();
  });

  it('dispatches AddFilter action', async () => {
    const user = userEvent.setup();
    const propsWithFilters = {
      ...baseProps,
      targetingFilterGroup: {
        ...baseProps.targetingFilterGroup,
        filters: [],
      },
    };

    render(<TargetingFilterGroup {...propsWithFilters} />);
    expect(screen.getByLabelText('Filter group filters')).toBeInTheDocument();
    expect(screen.queryAllByLabelText('Filter')).toHaveLength(0);

    await user.click(screen.getByLabelText('Add filter button'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.AddFilter,
      payload: {
        filterGroupId: propsWithFilters.targetingFilterGroup.id,
        filter: {
          ...defaultDateFilter,
          operand: OperandEnum.Initial,
        },
      },
    });
  });

  it('dispatches DeleteFilterGroup action', async () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(
      screen.getByLabelText('Delete filter group button'),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Delete filter group button'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.DeleteFilterGroup,
      payload: baseProps.targetingFilterGroup.id,
    });
  });

  it('dispatches SetFilterGroupOperand action', async () => {
    render(<TargetingFilterGroup {...baseProps} />);
    expect(screen.getByLabelText('Operand')).toBeInTheDocument();

    const operandContainer = screen.getByLabelText('Operand');
    const selectElement = within(operandContainer).getByRole('combobox');

    await userEvent.selectOptions(selectElement, ['Or']);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetFilterGroupOperand,
      payload: {
        filterGroupId: baseProps.targetingFilterGroup.id,
        operand: OperandEnum.Or,
      },
    });
  });
});
