import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';

import '@/utils/mocks/mocks';

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});
