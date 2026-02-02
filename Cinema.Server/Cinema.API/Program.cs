using Cinema.API.Middleware;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Cinema.Application.Interfaces.Services;
using Cinema.Application.Mappings;
using Cinema.Application.Services;
using Cinema.Application.Validators.Sessions;
using Cinema.Persistence;
using Cinema.Persistence.Context;
using Cinema.Persistence.ExternalServices;
using Cinema.Persistence.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
//hangfire
builder.Services.AddHangfire(config => config
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();
// Add services to the container.
builder.Services.AddControllers(options =>
{
    options.Filters.Add<Cinema.API.Filters.AsyncValidationFilter>();
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>();
//mapper
builder.Services.AddAutoMapper(typeof(SessionMapper).Assembly);
//repo
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<ISessionRepository, SessionRepository>();
builder.Services.AddScoped<IActorRepository, ActorRepository>();
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IHallRepository, HallRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISeatRepository, SeatRepository>();
builder.Services.AddScoped<ISessionSeatRepository, SessionSeatRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ITicketTypeRepository, TicketTypeRepository>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<ISeatTypeRepository, SeatTypeRepository>();

//services  
builder.Services.AddScoped<ISessionSeatService, SessionSeatService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPaymentGateway, PaymentGateway>();
builder.Services.AddScoped<IBookingCleanupService, BookingCleanupService>();
builder.Services.AddScoped<IHallService, HallService>();
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
//swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//validation

builder.Services.AddValidatorsFromAssemblyContaining<SessionCreateValidator>();
// Allow CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();
//exeption middleware
app.UseMiddleware<ExceptionMiddleware>();
//hangfire
app.UseHangfireDashboard();
using (var scope = app.Services.CreateScope())
{
    var recurringJobManager = scope.ServiceProvider.GetRequiredService<IRecurringJobManager>();

    recurringJobManager.AddOrUpdate<IBookingCleanupService>(
        "cleanup-bookings",
        service => service.CleanupExpiredBookingsAsync(),
        Cron.Minutely
    );
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
