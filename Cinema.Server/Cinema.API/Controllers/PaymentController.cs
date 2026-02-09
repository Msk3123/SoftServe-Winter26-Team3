using AutoMapper;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PaymentController : ApiBaseController
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService, IMapper mapper) : base(mapper)
        {
            _paymentService = paymentService;
        }


        [HttpPost("initialize")]
        public async Task<IActionResult> InitializePayment([FromBody] PaymentCreateDto dto)
        {
            var result = await _paymentService.InitializePaymentAsync(dto);
            return Ok(result);
        }

        [HttpPost("callback")]
        [Consumes("application/x-www-form-urlencoded")]
        [AllowAnonymous]
        public async Task<IActionResult> PaymentCallback([FromForm] string data, [FromForm] string signature)
        {
            Console.WriteLine("-----------------------------");
            var result = await _paymentService.HandlePaymentCallbackAsync(data, signature);

            return Ok(result);
        }
        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var result = await _paymentService.GetPaymentByOrderIdAsync(orderId);
            return Ok(result);
        }
    }

    
}