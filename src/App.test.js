import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
// https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
