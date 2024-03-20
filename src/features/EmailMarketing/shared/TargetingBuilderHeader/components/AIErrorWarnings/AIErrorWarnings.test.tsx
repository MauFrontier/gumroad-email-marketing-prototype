import {fireEvent, render, screen} from '@testing-library/react';
import AIErrorWarnings from './AIErrorWarnings';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {renderComponentWithState} from '../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../store/emailMarketingInitialState';

describe('AIErrorWarnings', () => {
  const mockErrors = [
    {
      id: '1',
      error: 'error 1',
      isVisible: true,
    },
    {
      id: '2',
      error: 'error 2',
      isVisible: true,
    },
    {
      id: '3',
      error: 'error 3',
      isVisible: false,
    },
  ];

  it('renders component', () => {
    render(<AIErrorWarnings />);
    expect(screen.getByLabelText('AI error warnings')).toBeInTheDocument();
  });

  it('displays every visible error warning', () => {
    renderComponentWithState(<AIErrorWarnings />, {
      ...emailMarketingInitialState,
      aiErrors: mockErrors,
    });
    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(screen.getAllByLabelText('AI error warning')).toHaveLength(2);

    const error1 = screen.getByText(mockErrors[0].error);
    const error2 = screen.getByText(mockErrors[1].error);

    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
  });

  it('does not display an error warning when isVisible is false', () => {
    renderComponentWithState(<AIErrorWarnings />, {
      ...emailMarketingInitialState,
      aiErrors: [...mockErrors],
    });

    expect(screen.getByText(mockErrors[0].error)).toBeInTheDocument();
    expect(screen.getByText(mockErrors[1].error)).toBeInTheDocument();
    expect(screen.queryByText(mockErrors[2].error)).not.toBeInTheDocument();
  });

  it('hides an error warning when the close button is clicked', async () => {
    renderComponentWithState(<AIErrorWarnings />, {
      ...emailMarketingInitialState,
      aiErrors: mockErrors,
    });

    const closeButtons = screen.getAllByLabelText('Close warning button');
    expect(closeButtons).toHaveLength(2);

    fireEvent.click(closeButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: EmailMarketingActionType.SetErrorVisibility,
        payload: expect.objectContaining({
          id: mockErrors[0].id,
          isVisible: false,
        }),
      }),
    );
  });
});
