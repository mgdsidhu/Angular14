import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logOut, logOutFaliure, logOutSuccess, register, registerFailure, registerSuccess, setStoreData } from '../actions/auth.actions';
import { UserInferface } from './../../models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInferface | null;
  error: any
  status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: '',
  status: 'pending'
};

export const authReducer = createReducer(
  //Supply the initial state
  initialState,
  on(login, (state, { email, password }) => ({ ...state, status: 'loading' as const })),
  on(register, (state, { email, username, password }) => ({ ...state, status: 'loading' as const })),
  on(loginSuccess, (state, { username, email, token, expiresIn, isLogged }) =>
  ({
    ...state,
    isAuthenticated: true,
    user: { email: email, username: username, token: token, expiresIn: expiresIn, isLogged: isLogged },
    status: 'success' as const
  })
  ),
  on(registerSuccess, (state, { username, email, accessToken, expiresIn, isLogged }) =>
  ({
    ...state,
    isAuthenticated: true,
    user: { email: email, username: username, token: accessToken, expiresIn: expiresIn, isLogged: isLogged },
    status: 'success' as const
  })
  ),
  on(loginFailure, (state, { error }) =>
  ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: error,
    status: 'error' as const
  })
  ),
  on(registerFailure, (state, { error }) =>
  ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: error,
    status: 'error' as const
  })
  ),
  on(logOut, (state, { accessToken, email }) =>
  ({
    ...state,
    status: 'loading' as const
  })
  ),
  on(logOutSuccess, (state, { message }) =>
  ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: null,
    status: 'success' as const
  })
  ),
  on(logOutFaliure, (state, { error }) =>
  ({
    ...state,
    error: error,
    status: 'error' as const
  })
  ),
  on(setStoreData, (state, { username, email, token, expiresIn, isLogged }) =>
  ({
    ...state,
    isAuthenticated: true,
    user: { email: email, username: username, token: token, expiresIn: expiresIn, isLogged: isLogged },
    status: 'success' as const
  })
  ),
)
