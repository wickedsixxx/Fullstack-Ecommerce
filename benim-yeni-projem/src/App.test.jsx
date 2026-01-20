import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('should update total basket price when an item is added', () => {
  render(<App />);
  const totalDisplay = screen.getByTestId('total-cart-price');
  const increaseButtons = screen.getAllByTestId('increase-btn');
  fireEvent.click(increaseButtons[0]);
  expect(totalDisplay.textContent).toContain('55000');
});

test('should complete checkout process and reset basket', async () => {
  render(<App />);
  
  
  const increaseButtons = screen.getAllByTestId('increase-btn');
  fireEvent.click(increaseButtons[0]);


  const checkoutBtn = screen.getByTestId('checkout-btn');
  fireEvent.click(checkoutBtn);

  
  expect(checkoutBtn).toHaveTextContent(/Processing/i);

  
  await waitFor(() => {
    const status = screen.getByTestId('order-status');
    expect(status).toHaveTextContent(/Successful/i);
  }, { timeout: 3000 });

  
  const totalDisplay = screen.getByTestId('total-cart-price');
  expect(totalDisplay.textContent).toContain('0');
});