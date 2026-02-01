using AutoMapper;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ApiBaseController
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService, IMapper mapper  ) : base(mapper)
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
        public async Task<IActionResult> PaymentCallback([FromBody] PaymentCallbackDto callback)
        {
            //тут перевірка Signature
            var result = await _paymentService.ProcessCallbackAsync(callback.TransactionId, callback.OrderId);
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