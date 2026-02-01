using Cinema.Application.Common.Exceptions;
using Cinema.Application.Common.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;
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

            var (statusCode, response) = exception switch
            {
                ValidationException ex => (HttpStatusCode.BadRequest, new
                {
                    statusCode = 400,
                    message = "Validation failed",
                    errors = ex.Errors.GroupBy(e => e.PropertyName)
                                      .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray())
                }),

                SeatsAlreadyTakenException or SeatAlreadySoldException =>
                    (HttpStatusCode.Conflict, CreateError(409, exception.Message)),

                SessionMismatchException or SeatNotReservedException or ReservationExpiredException =>
                    (HttpStatusCode.BadRequest, CreateError(400, exception.Message)),

                KeyNotFoundException ex =>
                    (HttpStatusCode.NotFound, CreateError(404, ex.Message)),
                SessionOverlapException ex =>
                    (HttpStatusCode.Conflict, CreateError(409, ex.Message)),

                DbUpdateException dbEx => HandleDbUpdateException(dbEx),

                _ => (HttpStatusCode.InternalServerError, new ErrorResponse
                {
                    StatusCode = 500,
                    Message = _env.IsDevelopment() ? $"Server Error: {exception.Message}" : "An unexpected error occurred.",
                    Details = _env.IsDevelopment() ? exception.InnerException?.Message : null
                })
            };

            context.Response.StatusCode = (int)statusCode;

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
        }

        private static ErrorResponse CreateError(int code, string message) =>
            new() { StatusCode = code, Message = message };

        private (HttpStatusCode, object) HandleDbUpdateException(DbUpdateException ex)
        {
            var message = "A database conflict occurred.";

            if (ex.InnerException is Microsoft.Data.SqlClient.SqlException sqlEx)
            {
                message = sqlEx.Number switch
                {
                    2601 or 2627 => "This seat is already booked or being processed.",
                    547 => "Invalid data reference (User, Seat, or Session not found).",
                    _ => "Database operation failed."
                };
            }

            return (HttpStatusCode.Conflict, CreateError(409, message));
        }
    }
}