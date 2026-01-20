var builder = WebApplication.CreateBuilder(args);

// --- 1. SERVİS KAYITLARI (DEPENDENCY INJECTION) ---

// CORS Politikası Tanımlama
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React'in çalıştığı adres
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Swagger/OpenAPI desteği (.NET 9 için)
builder.Services.AddOpenApi();

// 2. KRİTİK: CORS Ayarı
// Bu ayar, React (Frontend) ile .NET (Backend) arasındaki "güvenlik duvarını" aşmamızı sağlar.
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // React portu
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Eğer ileride cookie veya auth kullanırsan gerekli olur
    });
});

var app = builder.Build();

// --- 2. MIDDLEWARE HATTI (PIPELINE) ---
// Not: Bu bölümdeki sıralama çok önemlidir!

// Geliştirme ortamında Swagger'ı etkinleştir
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// 1. Güvenlik ve Yönlendirme
app.UseHttpsRedirection();

// 2. CORS (Daima Routing'den sonra, Authorization'dan ÖNCE gelmelidir)
app.UseCors("ReactPolicy");

app.UseAuthorization();

// 3. Endpoint Eşleştirme
app.MapControllers();

app.Run();