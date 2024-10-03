// src/services/slices/user-slice.test.ts

import userReducer, {
  loginUser,
  registerUser,
  getUser,
  authChecked,
  userLogout,
  TUserState,
  checkUserAuth,
  logoutUserAction
} from './user-slice';
import { TUser } from '../../utils/types';
import { setCookie, deleteCookie } from '../../utils/cookie';

import { logoutApi } from '../../utils/burger-api';

// Mock the APIs and utilities
jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(() => 'mockedAccessToken')
}));

// Mock localStorage
beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });
});

jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(() => 'mockedAccessToken')
}));

describe('userSlice reducer', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    loginUserError: null,
    loginUserRequest: false,
    registerUserError: null,
    registerUserRequest: false
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const expectedState = {
      ...initialState,
      loginUserRequest: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle loginUser.fulfilled', () => {
    const user: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      }
    };
    const expectedState = {
      ...initialState,
      data: user,
      isAuthenticated: true,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'accessToken');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'refreshToken'
    );
  });

  it('should handle loginUser.rejected', () => {
    const error = 'Login failed';
    const action = { type: loginUser.rejected.type, error: { message: error } };
    const expectedState = {
      ...initialState,
      loginUserRequest: false,
      loginUserError: error,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const expectedState = {
      ...initialState,
      registerUserRequest: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle registerUser.fulfilled', () => {
    const user: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      }
    };
    const expectedState = {
      ...initialState,
      data: user,
      isAuthenticated: true,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'accessToken');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'refreshToken'
    );
  });

  it('should handle registerUser.rejected', () => {
    const error = 'Registration failed';
    const action = {
      type: registerUser.rejected.type,
      error: { message: error }
    };
    const expectedState = {
      ...initialState,
      registerUserRequest: false,
      registerUserError: error,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUser.fulfilled', () => {
    const user: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = { type: getUser.fulfilled.type, payload: { user } };
    const expectedState = {
      ...initialState,
      data: user,
      isAuthChecked: true,
      isAuthenticated: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle authChecked', () => {
    const action = { type: authChecked.type };
    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logoutUserAction thunk', async () => {
    (logoutApi as jest.Mock).mockResolvedValueOnce({});

    const dispatch = jest.fn();
    const getState = jest.fn();

    await logoutUserAction()(dispatch, getState, undefined);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(dispatch).toHaveBeenCalledWith(userLogout());
  });
});
