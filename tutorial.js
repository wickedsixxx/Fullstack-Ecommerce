// --- ES6+ JAVASCRIPT PRATİK ŞABLONU ---

// ---------------------------------------------------------
// HAZIR VERİ (Bunu bir API'den gelmiş gibi düşün)
// ---------------------------------------------------------
const orders = [
  { id: 1, customer: "Ahmet", total: 150, delivered: true, items: ["Mouse", "Klavye"] },
  { id: 2, customer: "Ayşe", total: 550, delivered: false, items: ["Monitör"] },
  { id: 3, customer: "Mehmet", total: 40, delivered: true, items: ["USB Kablo"] },
  { id: 4, customer: "Fatma", total: 200, delivered: false, items: ["Kulaklık", "Mousepad"] },
];

// ---------------------------------------------------------
// GÖREV 1: ARROW FUNCTIONS (Ok Fonksiyonları)
// ---------------------------------------------------------
// Aşağıdaki klasik fonksiyonu "Arrow Function"a çevir.
// İpucu: const topla = ...

function calculateTax(amount) {
    return amount * 0.18;
}

// SENİN KODUN BURAYA:
const calculateTaxArrow = (amount) => amount * 0.18

console.log("Görev 1 Sonuç:", calculateTaxArrow(100)); // Beklenen: 18


// ---------------------------------------------------------
// GÖREV 2: ARRAY METHODS (.map, .filter, .find)
// ---------------------------------------------------------

// A) .filter() kullanarak SADECE teslim edilmemiş (delivered: false) siparişleri bul.
const undeliveredOrders = orders.filter(order => {
    // Burayı doldur (return ...)
    return order.delivered=== false;
});

console.log("Görev 2-A (Teslim Edilmeyenler):", undeliveredOrders);


// B) .map() kullanarak sadece müşteri isimlerinden oluşan bir liste oluştur.
// Beklenen: ["Ahmet", "Ayşe", "Mehmet", "Fatma"]

    // Burayı doldur
    const  customerNames = orders.map(order => order.customer);


console.log("Görev 2-B (Müşteri İsimleri):", customerNames);


// C) .find() kullanarak ID'si 3 olan siparişi bul.

    // Burayı doldur
    const specificOrder = orders.find(order => order.id ===3 );


console.log("Görev 2-C (ID 3):", specificOrder);


// ---------------------------------------------------------
// GÖREV 3: DESTRUCTURING (Parçalama)
// ---------------------------------------------------------
const userProfile = {
    username: "kodcu_kedi",
    email: "kedi@code.com",
    stats: {
        commits: 500,
        streak: 10
    }
};

// Aşağıdaki satırda "username" ve stats içindeki "commits" bilgisini tek satırda çıkar.
// İpucu: const { ... } = userProfile;

// SENİN KODUN BURAYA:

const {username , stats:{commits}} = userProfile;

 console.log("Görev 3:", username, commits); // Beklenen: kodcu_kedi, 500


// ---------------------------------------------------------
// GÖREV 4: ASYNC / AWAIT & PROMISES
// ---------------------------------------------------------
// Bu fonksiyon sahte bir veri çekme işlemini simüle eder. (Dokunma)
const fetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 99, name: "Zeynep", role: "Admin" });
        }, 2000); // 2 saniye bekler
    });
};

// Aşağıdaki fonksiyonu "async" yap ve içinde "await" kullanarak veriyi bekle.
// Veri gelince konsola "Kullanıcı yüklendi: Zeynep" yazdır.

const getUserData = () => { // Buraya async ekle
    console.log("Veri bekleniyor...");
    
    // const user = ... (burada await kullan)
    
    // console.log("Kullanıcı yüklendi:", user.name);
};

// Fonksiyonu çalıştır
getUserData();