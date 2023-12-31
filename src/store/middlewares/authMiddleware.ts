import {AxiosResponse} from 'axios';

import {updateToken} from '../auth/actionCreators';
import {AppDispatch, RootState} from 'store';
import {setAuthHeader} from 'services/api';
import {refreshToken} from 'services/api/auth';

export const authMiddleware = async (
  request: () => Promise<AxiosResponse>,
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'The access token expired') {
        try {
          await initTokenRefreshing(dispatch, getState);
          return await request();
        } catch {
          throw error;
        }
      }
      throw error;
    }
    throw error;
  }
};

const initTokenRefreshing = async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const {refreshToken: token} = getState().auth;

  if (!token) {
    throw new Error('No refresh token');
  }
  try {
    const response = await refreshToken(token);
    const {access_token, refresh_token} = response.data;

    setAuthHeader(access_token);

    dispatch(updateToken({token: access_token, refreshToken: refresh_token}));
  } catch (error) {
    throw error;
  }
};
