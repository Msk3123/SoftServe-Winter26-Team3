using Cinema.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Movie> Movies => Set<Movie>();
        public DbSet<Genre> Genres => Set<Genre>();
        public DbSet<GenreMovie> GenreMovies => Set<GenreMovie>();
        public DbSet<Hall> Halls => Set<Hall>();
        public DbSet<Seat> Seats => Set<Seat>();
        public DbSet<Session> Sessions => Set<Session>();
        public DbSet<User> Customers => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<News> News => Set<News>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CinemaDb;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Вимикаємо каскадне видалення для зв'язку Seat -> Ticket
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Seat)
                .WithMany(s => s.Tickets)
                .HasForeignKey(t => t.seat_id)
                .OnDelete(DeleteBehavior.Restrict); // Або ClientSetNull

            // Також рекомендується зробити це для зв'язку Booking -> Ticket, 
            // якщо помилка повториться для іншого шляху
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Order)
                .WithMany(b => b.Tickets)
                .HasForeignKey(t => t.order_id)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
