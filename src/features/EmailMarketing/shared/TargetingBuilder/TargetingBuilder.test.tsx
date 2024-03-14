import {render, screen} from '@testing-library/react';
import TargetingBuilder from './TargetingBuilder';
import {renderComponentWithState} from '../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../store/emailMarketingStatePresets';

describe('TargetingBuilder', () => {
  it('renders component', () => {
    render(<TargetingBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it("renders TargetingBuilder's components", () => {
    render(<TargetingBuilder />);
    expect(
      screen.getByLabelText('Targeting builder header'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();
  });

  it('displays every filter group', () => {
    renderComponentWithState(<TargetingBuilder />, emailMarketingInitialState);
    expect(screen.getAllByRole('group')).toHaveLength(
      emailMarketingInitialState.targeting.filterGroups.length,
    );
  });
});
