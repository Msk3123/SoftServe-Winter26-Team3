using System.Net;
using System.Text.Json;
using Cinema.Application.Common.Models;
using FluentValidation;
namespace Cinema.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);

                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var statusCode = HttpStatusCode.InternalServerError;
            object responseBody = null; 

            switch (exception)
            {
                case ValidationException valEx: 
                    statusCode = HttpStatusCode.BadRequest;
                    var validationErrors = valEx.Errors
                        .GroupBy(e => e.PropertyName)
                        .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

                    responseBody = new { statusCode = 400, message = "Validation failed", errors = validationErrors };
                    break;

                case System.Collections.Generic.KeyNotFoundException:
                    statusCode = HttpStatusCode.NotFound;
                    responseBody = new ErrorResponse { StatusCode = 404, Message = "The requested resource was not found." };
                    break;

                case Microsoft.EntityFrameworkCore.DbUpdateException dbUpdateEx: 
                    statusCode = HttpStatusCode.BadRequest;
                    var dbMessage = "Database integrity error.";
                    if (dbUpdateEx.InnerException is Microsoft.Data.SqlClient.SqlException sqlEx && (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                    {
                        dbMessage = "This record already exists. Please use unique values.";
                    }
                    responseBody = new ErrorResponse { StatusCode = 400, Message = dbMessage };
                    break;

                default:
                    responseBody = new ErrorResponse
                    {
                        StatusCode = 500,
                        Message = $"Real Error: {exception.Message}",
                        Details = exception.InnerException?.Message
                    };
                    break;
            }

            context.Response.StatusCode = (int)statusCode;
            await context.Response.WriteAsync(JsonSerializer.Serialize(responseBody, options));
        }
    }
}