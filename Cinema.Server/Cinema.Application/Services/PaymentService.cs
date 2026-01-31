using AutoMapper;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPaymentGateway _paymentGateway;

        public PaymentService(IUnitOfWork unitOfWork, IMapper mapper, IPaymentGateway paymentGateway)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _paymentGateway = paymentGateway;
        }

        public async Task<PaymentDetailsDto> InitializePaymentAsync(PaymentCreateDto dto)
        {
            var order = await _unitOfWork.Orders.GetOrderWithTicketsAsync(dto.OrderId);
            if (order == null) throw new KeyNotFoundException("Order not found");

            var (checkoutUrl, transactionId) = await _paymentGateway.CreatePaymentSessionAsync(order.TotalAmount, order.OrderId);

            var payment = new Payment
            {
                OrderId = dto.OrderId,
                Amount = order.TotalAmount,
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = PaymentStatus.Pending,
                PaymentDate = DateTime.UtcNow,
                ExternalTransactionId = transactionId,
                Order = order
            };

            await _unitOfWork.Payments.AddAsync(payment);
            await _unitOfWork.SaveChangesAsync();

            var result = _mapper.Map<PaymentDetailsDto>(payment);
            result.CheckoutUrl = checkoutUrl;

            return result;
        }

        public async Task<PaymentDetailsDto> ProcessCallbackAsync(string transactionId, int orderId)
        {
            await _unitOfWork.BeginTransactionAsync();

            try
            {
                var payment = await _unitOfWork.Payments.GetByOrderIdAsync(orderId);
                if (payment == null)
                    throw new KeyNotFoundException($"Payment for Order ID {orderId} not found.");


                var order = await _unitOfWork.Orders.GetOrderWithTicketsAsync(orderId);
                if (order == null) throw new KeyNotFoundException("Order not found");

                payment.ExternalTransactionId = transactionId;
                payment.PaymentStatus = PaymentStatus.Completed;
                payment.Order = order; 

                order.OrderStatus = OrderStatus.Completed;


                foreach (var ticket in order.Tickets)
                {
                    if (ticket.SessionSeat != null)
                    {
                        ticket.SessionSeat.SeatStatuses = SeatStatus.Sold;
                        ticket.SessionSeat.LockExpiration = null;
                        ticket.SessionSeat.LockedByUserId = null;

                    }
                }

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();

                return _mapper.Map<PaymentDetailsDto>(payment);
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        public async Task<PaymentDetailsDto> GetPaymentByOrderIdAsync(int orderId)
        {
            var payment = await _unitOfWork.Payments.GetByOrderIdAsync(orderId);
            return _mapper.Map<PaymentDetailsDto>(payment);
        }
    }
}