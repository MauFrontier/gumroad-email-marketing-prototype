import {render, screen} from '@testing-library/react';
import TriggerSelection from './TriggerSelection';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {TriggerType} from '../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../store/emailMarketingStoreTypes';

describe('TriggerSelection', () => {
  it('renders component', () => {
    render(<TriggerSelection />);
    expect(screen.getByLabelText('Trigger selection')).toBeInTheDocument();
  });

  it('Presses a trigger button', async () => {
    renderComponentWithState(<TriggerSelection />, emailMarketingInitialState);
    const initialTrigger = emailMarketingInitialState.selectedTrigger;
    const newTrigger = TriggerType.NewAffiliate;

    const initialTriggerButton = screen.getByLabelText(
      initialTrigger + ' trigger',
    );

    expect(initialTriggerButton).toBeInTheDocument();
    expect(initialTriggerButton).toHaveAttribute('aria-pressed', 'true');

    const newTriggerButton = screen.getByLabelText(newTrigger + ' trigger');

    expect(newTriggerButton).toBeInTheDocument();
    expect(newTriggerButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(newTriggerButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SelectTrigger,
      payload: newTrigger,
    });
  });
});
