import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';

import '@/utils/mocks/mocks';

afterEach(() => {
  jest.resetAllMocks();
  fetchMock.mockClear();
  cleanup();
});
