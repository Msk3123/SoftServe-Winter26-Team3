using Cinema.API.Middleware;
using Cinema.Application.Common.Config;
using Cinema.Application.Common.Configurations;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Cinema.Application.Interfaces.Services;
using Cinema.Application.Mappings;
using Cinema.Application.Services;
using Cinema.Application.Validators.Sessions;
using Cinema.Persistence;
using Cinema.Persistence.Context;
using Cinema.Persistence.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
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

var jwtKey = builder.Configuration["Jwt:Key"] 
    ?? throw new InvalidOperationException("JWT Key is missing! Check your User Secrets.");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();
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
builder.Services.AddScoped<IMovieService, MovieService>();
//services  
builder.Services.AddScoped<ISessionSeatService, SessionSeatService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPaymentGateway, LiqPayGateway>();
builder.Services.AddScoped<IBookingCleanupService, BookingCleanupService>();
builder.Services.AddScoped<IHallService, HallService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISeatTypeService, SeatTypeService>();

builder.Services.Configure<CinemaSettings>(builder.Configuration.GetSection("CinemaSettings"));
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

//liqpay
builder.Services.Configure<LiqPaySettings>(builder.Configuration.GetSection("LiqPaySettings"));
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

    // Дістаємо налаштування
    var settings = builder.Configuration.GetSection("CinemaSettings").Get<CinemaSettings>();

    // Реєструємо джоби, використовуючи значення з конфігу
    recurringJobManager.AddOrUpdate<IBookingCleanupService>(
        "cleanup-bookings",
        service => service.CleanupExpiredBookingsAsync(),
        settings?.BookingCleanupCron
    );

    recurringJobManager.AddOrUpdate<IBookingCleanupService>(
        "archive-finished-sessions",
        service => service.ArchiveFinishedSessionsSeatsAsync(),
        settings?.SessionArchiveCron
    );
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
