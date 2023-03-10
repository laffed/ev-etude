/* eslint-disable @typescript-eslint/consistent-type-assertions -- mocks */
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { NavigationContainerRef } from '@react-navigation/native';
import noop from 'lodash/noop';
import { RefObject } from 'react';

import { useNavigationDevTools } from '../useNavigationDevTools';


jest.mock('@react-navigation/devtools');
jest.mock('lodash/noop');

const mockUseReduxDevToolsExtension = useReduxDevToolsExtension as jest.MockedFunction<
  typeof useReduxDevToolsExtension
>;
const mockLodashNoop = noop as jest.MockedFunction<typeof noop>;

describe('useNavigationDevTools test suite', () => {
  it('enables if in development environment', () => {
    expect.assertions(2);
    // mocked hook param is irrelevant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- okay
    const dummyRef = 0 as unknown as RefObject<NavigationContainerRef<any>>;

    useNavigationDevTools()(dummyRef);
    expect(mockUseReduxDevToolsExtension).toHaveBeenCalledTimes(1);
    expect(mockLodashNoop).toHaveBeenCalledTimes(0);
  });
});

/* eslint-enable @typescript-eslint/consistent-type-assertions -- mocks*/
