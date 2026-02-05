using Cinema.Application.Common.Config;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.LiqPayDtos;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Cinema.Application.Services;
using Microsoft.Extensions.Options;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

public class LiqPayGateway : IPaymentGateway
{
    private readonly LiqPaySettings _settings;
    public LiqPayGateway(IOptions<LiqPaySettings> settings)
    {
        _settings = settings.Value;
    }
    public async Task<(string checkoutUrl, string transactionId)> CreatePaymentSessionAsync(decimal amount, int orderId)
    {
        var paramsObj = new
        {
            public_key = _settings.PublicKey,
            version = 3,
            action = "pay",
            amount = Math.Round(amount, 2),
            currency = _settings.Currency ?? "UAH",
            description = $"Payment for order #{orderId}",
            order_id = orderId.ToString(),
            sandbox = 1, 
            result_url = _settings.ResultUrl,
            server_url = _settings.CallBackServerUrl
        };

        var json = JsonSerializer.Serialize(paramsObj);
        var data = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));
        var signature = GenerateSignature(data);
        return (data, signature);
    }
    public string GenerateSignature(string data)
    {
        var signString = _settings.PrivateKey + data + _settings.PrivateKey;
        using var sha1 = SHA1.Create();
        var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(signString));
        return Convert.ToBase64String(hash);
    }
    public bool IsSignatureValid(string data, string signature)
    {
        if (string.IsNullOrEmpty(data) || string.IsNullOrEmpty(signature))
            return false;

        var expectedSignature = GenerateSignature(data);
        Console.WriteLine($"DEBUG: Received Signature: {signature}");
        Console.WriteLine($"DEBUG: Expected Signature: {expectedSignature}");
        if (signature != expectedSignature)
        {
            throw new InvalidPaymentSignatureException();
        }

        return true;
    }
}