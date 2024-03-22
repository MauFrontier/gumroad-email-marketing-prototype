import {render, screen} from '@testing-library/react';
import AudienceSelection from './AudienceSelection';
import {emailMarketingInitialState} from '../../store/emailMarketingInitialState';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {AudienceType} from '../emailMarketingTypes';
import userEvent from '@testing-library/user-event';
import {mockDispatch} from '../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';

describe('AudienceSelection', () => {
  it('renders component', () => {
    render(<AudienceSelection />);
    expect(screen.getByLabelText('Audience selection')).toBeInTheDocument();
  });

  it('presses an audience button', async () => {
    renderComponentWithState(<AudienceSelection />, emailMarketingInitialState);
    const initialAudience = emailMarketingInitialState.selectedAudience;
    const newAudience = AudienceType.Affiliates;

    const initialAudienceButton = screen.getByLabelText(
      initialAudience + ' audience',
    );

    expect(initialAudienceButton).toBeInTheDocument();
    expect(initialAudienceButton).toHaveAttribute('aria-pressed', 'true');

    const newAudienceButton = screen.getByLabelText(newAudience + ' audience');

    expect(newAudienceButton).toBeInTheDocument();
    expect(newAudienceButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(newAudienceButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SelectAudience,
      payload: newAudience,
    });
  });
});
