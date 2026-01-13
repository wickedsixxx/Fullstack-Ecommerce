// src/components/ProductCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ProductCard from './ProductCard'; // İsmin doğru olduğundan emin ol

test('should call onQuantityChange when buttons are clicked', () => {
  const mockOnChange = vi.fn();
  
  render(
    <ProductCard 
      productName="iPhone" 
      price={1000} 
      quantity={0} 
      onQuantityChange={mockOnChange} 
    />
  );

  const increaseBtn = screen.getByTestId('increase-btn');
  fireEvent.click(increaseBtn);

  expect(mockOnChange).toHaveBeenCalledWith(1);
});