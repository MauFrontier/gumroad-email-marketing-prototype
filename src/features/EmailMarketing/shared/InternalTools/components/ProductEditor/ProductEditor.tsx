import {useState} from 'react';
import Button from '../../../../../shared/ui/Button/Button';
import Icon from '../../../../../shared/ui/Icon/Icon';
import './ProductEditor.scss';
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import productsFromServer from '../../../../api/productsFromServer';
import {IconType} from '../../../../../shared/ui/Icon/iconLibrary';

const ProductEditor = () => {
  const {state, dispatch} = useEmailMarketingState();

  const [customProducts, setCustomProducts] = useState<string>(
    JSON.stringify(state.products, null, 2),
  );
  const [customProductsError, setCustomProductsError] =
    useState<boolean>(false);

  const [customProductsSuccess, setCustomProductsSuccess] =
    useState<boolean>(false);

  const handleProductsTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustomProductsError(false);
    setCustomProducts(event.target.value);
  };

  const resetProducts = () => {
    dispatch({
      type: EmailMarketingActionType.SetProducts,
      payload: productsFromServer,
    });

    setCustomProducts(JSON.stringify(productsFromServer, null, 2));
  };

  const setProducts = () => {
    try {
      const parsedProducts = JSON.parse(customProducts);
      dispatch({
        type: EmailMarketingActionType.SetProducts,
        payload: parsedProducts,
      });

      setCustomProductsSuccess(true);

      setTimeout(() => {
        setCustomProductsSuccess(false);
      }, 800);
    } catch (error) {
      setCustomProductsError(true);

      setTimeout(() => {
        setCustomProductsError(false);
      }, 800);
      console.error(error);
    }
  };

  const customProductsStatusIndicator = customProductsError
    ? 'error'
    : customProductsSuccess
      ? 'success'
      : '';

  return (
    <div aria-label="Edit products">
      <h3>Products in the account</h3>
      <textarea
        value={customProducts}
        className={`code-block ${customProductsStatusIndicator}`}
        aria-label="Custom products"
        onChange={handleProductsTextareaChange}></textarea>
      <Button
        className={`dark  ${customProductsStatusIndicator}`}
        onClick={setProducts}
        label="Save custom products">
        <Icon type={IconType.Check} />
        Save
      </Button>
      <Button onClick={resetProducts} label="Reset products">
        <Icon type={IconType.Trash} />
        Reset to defaults
      </Button>
    </div>
  );
};

export default ProductEditor;
