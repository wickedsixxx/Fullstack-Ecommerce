import { useState } from 'react';

const DiscountInput = ({ onApplyDiscount }) => {
  const [code, setCode] = useState("");

  const handleApply = () => {
    
    if (code.toUpperCase() === "SAVE10") {
      onApplyDiscount(10); 
    } else {
      alert("Invalid Code!");
      onApplyDiscount(0);
    }
  };

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <input 
        type="text" 
        placeholder="Enter Promo Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        data-testid="discount-input"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button 
        onClick={handleApply}
        data-testid="apply-discount-btn"
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Apply
      </button>
    </div>
  );
};

export default DiscountInput;