import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import DiscountInput from './DiscountInput';

test('should call onApplyDiscount with 10 when SAVE10 is entered', () => {
  const mockApply = vi.fn();
  render(<DiscountInput onApplyDiscount={mockApply} />);

  const input = screen.getByTestId('discount-input');
  const btn = screen.getByTestId('apply-discount-btn');

  // Input'a yazı yazma simülasyonu
  fireEvent.change(input, { target: { value: 'SAVE10' } });
  fireEvent.click(btn);

  expect(mockApply).toHaveBeenCalledWith(10);
});