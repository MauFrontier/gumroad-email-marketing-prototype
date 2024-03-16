import {fireEvent, render, screen} from '@testing-library/react';
import Operand from './Operand';
import {Operand as OperandEnum} from '../../../../../emailMarketingTypes';

describe('Operand', () => {
  it('renders Select component for non-initial values', () => {
    render(<Operand value={OperandEnum.And} onChange={jest.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onChange with new operand when selection changes', () => {
    const handleChange = jest.fn();
    render(<Operand value={OperandEnum.And} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: OperandEnum.Or},
    });
    expect(handleChange).toHaveBeenCalledWith(OperandEnum.Or);
  });

  it('renders default text when value is initial', () => {
    render(<Operand value={OperandEnum.Initial} onChange={jest.fn()} />);
    expect(screen.getByText('Where:')).toBeInTheDocument();
  });

  it('renders default text when value is undefined', () => {
    render(<Operand onChange={jest.fn()} />);
    expect(screen.getByText('Where:')).toBeInTheDocument();
  });
});
