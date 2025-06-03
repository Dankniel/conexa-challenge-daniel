import authReducer, { setLoading, setUserToken } from '../../../src/store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    userToken: null,
    isLoading: true,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setLoading', () => {
    const actualState = authReducer(initialState, setLoading(false));
    expect(actualState.isLoading).toBe(false);

    const actualStateTrue = authReducer({ ...initialState, isLoading: false }, setLoading(true));
    expect(actualStateTrue.isLoading).toBe(true);
  });

  it('should handle setUserToken', () => {
    const token = 'test-token';
    const actualState = authReducer(initialState, setUserToken(token));
    expect(actualState.userToken).toBe(token);

    const actualStateNull = authReducer({ ...initialState, userToken: token }, setUserToken(null));
    expect(actualStateNull.userToken).toBe(null);
  });
}); 