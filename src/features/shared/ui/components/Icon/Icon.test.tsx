import {render, screen} from '@testing-library/react';
import Icon from './Icon';
import {IconType} from './iconLibrary';

describe('Icon', () => {
  it('renders the icon', () => {
    render(<Icon type={IconType.X} label="Icon" />);
    expect(screen.getByLabelText('Icon')).toBeInTheDocument();
  });

  it('renders the icon with a custom aria-label', () => {
    render(<Icon type={IconType.X} label="My icon" />);
    expect(screen.getByLabelText('My icon')).toBeInTheDocument();
  });

  it('renders the icon with a custom aria-hidden', () => {
    render(<Icon type={IconType.X} label="First icon" ariaHidden={false} />);
    const iconElement = screen.getByLabelText('First icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.getAttribute('aria-hidden')).toBe('false');

    render(
      <Icon type={IconType.Check} label="Second icon" ariaHidden={true} />,
    );
    const secondIconElement = screen.getByLabelText('Second icon');
    expect(secondIconElement).toBeInTheDocument();
    expect(secondIconElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders the icon with a custom size', () => {
    render(<Icon type={IconType.X} label="Icon" size={10} />);
    const iconElement = screen.getByLabelText('Icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.classList).toContain('icon-10');
  });

  it('renders the icon with a custom className', () => {
    render(<Icon type={IconType.X} label="Icon" className="my-custom-class" />);
    const iconElement = screen.getByLabelText('Icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.classList).toContain('my-custom-class');
  });
});
