import { render, screen } from '@testing-library/react';

import TextInput from './TextInput';

describe('TextInput', () => {


	it('renders placeholder text', () => {
		render(<TextInput placeholder="Enter text" />);

		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});
});
