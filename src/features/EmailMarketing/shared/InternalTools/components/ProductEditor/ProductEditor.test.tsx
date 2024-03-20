import {fireEvent, render, screen} from '@testing-library/react';
import ProductEditor from './ProductEditor';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {renderComponentWithState} from '../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../store/emailMarketingInitialState';
import {KeyValuePair} from '../../../../../shared/sharedTypes';
import productsFromServer from '../../../../api/productsFromServer';
import userEvent from '@testing-library/user-event';

describe('ProductEditor', () => {
  const exampleCustomProducts: KeyValuePair[] = [
    {
      key: 'example-product-1',
      value: 'Example product 1',
    },
    {
      key: 'example-product-2',
      value: 'Example product 2',
    },
  ];

  it('renders the component', async () => {
    render(<ProductEditor />);

    expect(screen.getByLabelText('Edit products')).toBeVisible();
  });

  it('sets the products, and it signals that it was successful', async () => {
    renderComponentWithState(<ProductEditor />, {
      ...emailMarketingInitialState,
      products: exampleCustomProducts,
    });

    const productsField = screen.getByLabelText('Custom products');
    fireEvent.change(productsField, {
      target: {value: JSON.stringify(exampleCustomProducts)},
    });

    const saveButton = screen.getByLabelText('Save custom products');
    await userEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetProducts,
      payload: exampleCustomProducts,
    });
    expect(productsField).not.toHaveClass('error');
    expect(productsField).toHaveClass('success');
  });

  it('does not set the products if the field does not contain valid JSON, and it signals that there was an error', async () => {
    renderComponentWithState(<ProductEditor />, {
      ...emailMarketingInitialState,
      products: exampleCustomProducts,
    });

    const productsField = screen.getByLabelText('Custom products');
    fireEvent.change(productsField, {
      target: {value: '{invalid JSON'},
    });

    const saveButton = screen.getByLabelText('Save custom products');
    await userEvent.click(saveButton);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(productsField).toHaveClass('error');
    expect(productsField).not.toHaveClass('success');
  });

  it('resets the products', async () => {
    renderComponentWithState(<ProductEditor />, {
      ...emailMarketingInitialState,
      products: exampleCustomProducts,
    });

    const productsField = screen.getByLabelText('Custom products');
    fireEvent.reset(productsField);
    fireEvent.change(productsField, {
      target: {value: JSON.stringify(exampleCustomProducts)},
    });

    const resetProductsButton = screen.getByLabelText('Reset products');
    await userEvent.click(resetProductsButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetProducts,
      payload: productsFromServer,
    });
  });
});
