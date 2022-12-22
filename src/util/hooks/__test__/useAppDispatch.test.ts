// eslint-disable-next-line no-restricted-imports -- only file
import { useDispatch } from 'react-redux';

import { useAppDispatch } from '../useAppDispatch';


jest.mock('react-redux');
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- mock
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe('useAppDispatch redeclaration', () => {
  it('should return useDispatch from react-redux', () => {
    expect.assertions(1);
    useAppDispatch();
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });
});
