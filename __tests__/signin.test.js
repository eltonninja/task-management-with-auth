import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '@/components/auth/auth-form';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/user';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe('Sign up', () => {
  test('renders a signup page', async () => {

    const { getByRole, findByText, getByPlaceholderText, queryByText } = render(
      <Provider store={mockStore}>
        <AuthForm isSignUp={true} />
      </Provider>
    )

    const heading = getByRole('heading', { name: 'Sign Up' });
    expect(heading).toBeInTheDocument();

    const submitButton = getByRole('button', { name: 'Sign Up' });
    fireEvent.click(submitButton);

    const emailInput = getByPlaceholderText('Email address');
    expect(emailInput).toBeInTheDocument();

    let emailError = await findByText('Email is required');
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'abc' } });
    emailError = await findByText('Invalid mail address');
    expect(emailError).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'abc@ggg.com' } });
    await waitFor(() => {
      emailError = queryByText('Invalid mail address');
      expect(emailError).not.toBeInTheDocument();
    });

    const passwordInput = getByPlaceholderText('Password');

    let passwordError = await findByText('Password is required');
    expect(passwordError).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'aaa' }});
    passwordError = await findByText('At least 6 characters are required');
    expect(passwordError).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'aaaaaa' }});
    await waitFor(() => {
      passwordError = queryByText('At least 6 characters are required');
      expect(passwordError).not.toBeInTheDocument();
    });
  });
})