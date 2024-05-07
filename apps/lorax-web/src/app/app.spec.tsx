import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app';
import { store } from '../store/store';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
