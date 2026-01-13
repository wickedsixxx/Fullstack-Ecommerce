using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CheckoutController(IConfiguration configuration)
        {
            _configuration = configuration;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        [HttpPost("create-session")]
        public async Task<IActionResult> Create([FromBody] CheckoutRequest request) // Liste yerine Obje (Request) bekliyoruz
        {
            if (request == null || request.Items == null || request.Items.Count == 0)
            {
                return BadRequest(new { message = "Sepet boş olamaz." });
            }

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment",
                SuccessUrl = "http://localhost:5173/success",
                CancelUrl = "http://localhost:5173/cancel",
            };

            // React'ten gelen her ürünü Stripe formatına ekliyoruz
            foreach (var item in request.Items)
            {
                options.LineItems.Add(new SessionLineItemOptions
                {
                    // PriceData yerine doğrudan Price (Price ID) kullanmak daha güvenlidir
                    Price = item.StripePriceId, 
                    Quantity = item.Quantity,
                });
            }

            try
            {
                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                return Ok(new { url = session.Url });
            }
            catch (StripeException e)
            {
                return BadRequest(new { message = e.StripeError.Message });
            }
        }
    }

    // --- DTO Modelleri (React Payload ile birebir aynı olmalı) ---

    public class CheckoutRequest
    {
        // React'teki "items" anahtarı buraya dolar
        public List<CartItemDto> Items { get; set; }
        
        // React'teki "discount" anahtarı buraya dolar
        public decimal Discount { get; set; }
    }

    public class CartItemDto
    {
        // React'teki "stripePriceId" ile eşleşir
        public string StripePriceId { get; set; }
        public int Quantity { get; set; }
    }
}