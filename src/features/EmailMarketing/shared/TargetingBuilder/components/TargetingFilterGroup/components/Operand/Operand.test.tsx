import {fireEvent, render, screen} from '@testing-library/react';
import Operand from './Operand';
import {Operand as OperandEnum} from '../../../../../emailMarketingTypes';

describe('Operand', () => {
  it('renders Select component for non-initial values', () => {
    render(<Operand value={OperandEnum.And} onChange={jest.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('Uses prop label if present', () => {
    render(
      <Operand value={OperandEnum.And} onChange={jest.fn()} label="Test" />,
    );
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });

  it('displays the right options', () => {
    render(<Operand value={OperandEnum.And} onChange={jest.fn()} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent(OperandEnum.And);
    expect(options[1]).toHaveTextContent(OperandEnum.Or);
  });

  it('Uses default label if prop label is not present', () => {
    render(<Operand value={OperandEnum.And} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Operand')).toBeInTheDocument();
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

  it('disables Select component when disabled prop is true', () => {
    render(
      <Operand value={OperandEnum.And} onChange={jest.fn()} disabled={true} />,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(<Operand value={OperandEnum.And} onChange={jest.fn()} />);
    expect(screen.getByRole('combobox')).not.toBeDisabled();
  });
});
