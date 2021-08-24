import React from 'react';

import Avatar from '../Avatar';
import configureStore from 'redux/store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import enMessages from 'translations/en.json';
import flattenMessages from 'services/i18n/intl';
import * as avatartHooks from 'redux/Avatar/hooks';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  Link: () => null,
}));

describe('<Avatar />', () => {
  const initialState = {
    avatar: {
      username: 'Username',
      userAvatarUrl: 'userAvatarUrl',
    },
  };
  const { store } = configureStore(initialState);
  const dispatch = jest.fn();
  store.dispatch = dispatch;
  const fetchUser = jest.fn();

  describe('render', () => {
    beforeEach(() => {
      jest
        .spyOn(avatartHooks, 'useFetchUser')
        .mockImplementation(() => [{ loading: false }, fetchUser]);
      render(
        <IntlProvider locale="en" messages={flattenMessages(enMessages)}>
          <Provider store={store}>
            <Avatar />
          </Provider>
        </IntlProvider>,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call onInputChange when writing in the text input', () => {
      expect(screen.getByTestId('github-avatar-input')).toBeTruthy();
      fireEvent.change(screen.getByTestId('github-avatar-input'), {
        target: { value: 'MyUsername' },
      });
      expect(dispatch).toHaveBeenCalledWith({
        meta: undefined,
        type: 'Avatar/updateUsername',
        payload: 'MyUsername',
      });
    });

    it('should call fetchUser when clicking submitting form', () => {
      expect(screen.getByRole('form')).toBeTruthy();
      fireEvent.submit(screen.getByRole('form'));
      expect(fetchUser).toHaveBeenCalled();
    });

    it('should display an image if userAvatarUrl is set', () => {
      const image = screen.getByRole('img');
      expect(image).toBeTruthy();
      expect(image).toHaveAttribute('src', 'userAvatarUrl');
    });
  });
});
