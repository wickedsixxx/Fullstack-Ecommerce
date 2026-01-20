// src/components/ProductCard.jsx
const ProductCard = ({ productName, price, icon, quantity, onQuantityChange }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px", width: "200px", textAlign: "center" }}>
      <div style={{ fontSize: "40px" }}>{icon}</div>
      <h3>{productName}</h3>
      <p>{price} TL</p>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <button onClick={() => onQuantityChange(quantity - 1)} data-testid="decrease-btn">-</button>
        <span data-testid="quantity-display">{quantity}</span>
        <button onClick={() => onQuantityChange(quantity + 1)} data-testid="increase-btn">+</button>
      </div>
    </div>
  );
};

export default ProductCard; 