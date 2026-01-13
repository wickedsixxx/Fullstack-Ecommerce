import { useState, useEffect, useMemo } from "react";
import ProductCard from "./components/ProductCard";
import DiscountInput from "./components/DiscountInput";
import "./App.css";

// Sabit verileri dışarı taşıyarak render maliyetini düşürüyoruz
const PRODUCT_LIST = [
  { id: 1, name: "iPhone 15", price: 3000, stripePriceId: 'price_1Slps5JOa0r7hJuAPezmctgj', icon: "📱" },
  { id: 2, name: "MacBook Pro", price: 5000, stripePriceId: 'price_1SlVbRJOa0r7hJuAYbsRvBIH', icon: "💻" },
  { id: 3, name: "AirPods Max", price: 1500, stripePriceId: 'price_1Slpu2JOa0r7hJuAFL1wOu34', icon: "🎧" },
];

function App() {
  // --- STATE ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("appleCart");
    return saved ? JSON.parse(saved) : {};
  });
  const [discountRate, setDiscountRate] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem("appleCart", JSON.stringify(cart));
  }, [cart]);

  // --- HESAPLAMALAR ---
  const totalAmount = useMemo(() => {
    const baseTotal = PRODUCT_LIST.reduce((total, product) => {
      return total + (cart[product.id] || 0) * product.price;
    }, 0);
    return baseTotal - (baseTotal * discountRate) / 100;
  }, [cart, discountRate]);

  // --- AKSİYONLAR ---
  const handleCheckout = async () => {
    // 1. DÖNÜŞTÜRME
    const itemsForApi = Object.keys(cart)
      .filter((id) => cart[id] > 0)
      .map((id) => {
        // HATA DÜZELTİLDİ: productList -> PRODUCT_LIST
        const product = PRODUCT_LIST.find((p) => p.id === parseInt(id));
        return {
          stripePriceId: product.stripePriceId,
          quantity: cart[id],
        };
      });

    if (itemsForApi.length === 0) {
      alert("Sepetiniz boş!");
      return;
    }

    // 2. İŞLEM BAŞLATMA
    setIsProcessing(true); // Butonu pasif yap
    setOrderStatus("Ödeme hazırlanıyor... 💳");

    const payload = {
      items: itemsForApi,
      discount: discountRate,
    };

    try {
      const response = await fetch("http://localhost:5036/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Hata Detayı:", errorData);
        setOrderStatus("Ödeme oluşturulamadı. ❌");
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      
      if (data.url || data.Url) {
        window.location.href = data.url || data.Url;
      } else {
        setOrderStatus("URL bulunamadı. ❌");
        setIsProcessing(false);
      }

    } catch (error) {
      console.error("İstek hatası:", error);
      setOrderStatus("Sunucuya bağlanılamadı. ❌");
      setIsProcessing(false);
    }
  };

  const updateQuantity = (id, qty) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, qty) }));
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "40px" }}>
      <header>
        <h1>🍎 Apple Store</h1>
        <DiscountInput onApplyDiscount={setDiscountRate} />
        <h2>Toplam: {totalAmount.toLocaleString()} TL</h2>
        
        <div style={{ margin: "20px 0" }}>
          <button 
            onClick={handleCheckout} 
            disabled={isProcessing || totalAmount === 0}
          >
            {isProcessing ? "İşleniyor..." : "Ödemeye Geç"}
          </button>
          {orderStatus && <p style={{ marginTop: "10px" }}>{orderStatus}</p>}
        </div>
      </header>

      <main style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {PRODUCT_LIST.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            quantity={cart[product.id] || 0}
            onQuantityChange={(newQty) => updateQuantity(product.id, newQty)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;