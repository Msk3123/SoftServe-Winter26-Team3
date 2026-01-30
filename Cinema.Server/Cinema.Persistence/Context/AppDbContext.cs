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
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<Tag> Tags => Set<Tag>();
        public DbSet<News> News => Set<News>();
        public DbSet<Actor> Actors => Set<Actor>();
        public DbSet<ActorMovie> ActorMovies => Set<ActorMovie>();
        public DbSet<SessionSeat> SessionSeats => Set<SessionSeat>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CinemaDb;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);



            modelBuilder.Entity<Seat>()
                .HasIndex(s => new { s.HallId, s.Row, s.SeatNo })
                .IsUnique()
                .HasDatabaseName("IX_Seat_HallId_Row_Number_Unique");
            // --- Налаштування зв'язків Many-to-Many

            // Movie <-> Genre
            modelBuilder.Entity<GenreMovie>()
                .HasKey(gm => gm.GenreMovieId);
            modelBuilder.Entity<GenreMovie>()
                .HasOne(gm => gm.Movie)
                .WithMany(m => m.GenreMovies)
                .HasForeignKey(gm => gm.MovieId);
            modelBuilder.Entity<GenreMovie>()
                .HasOne(gm => gm.Genre)
                .WithMany(g => g.GenreMovies)
                .HasForeignKey(gm => gm.GenreId);

            // Movie <-> Actor
            modelBuilder.Entity<ActorMovie>()
                .HasKey(am => am.ActorMovieId);
            modelBuilder.Entity<ActorMovie>()
                .HasOne(am => am.Movie)
                .WithMany(m => m.ActorMovies)
                .HasForeignKey(am => am.MovieId);
            modelBuilder.Entity<ActorMovie>()
                .HasOne(am => am.Actor)
                .WithMany(a => a.ActorMovies)
                .HasForeignKey(am => am.ActorId);

            // --- Налаштування бронювання
            modelBuilder.Entity<SessionSeat>()
                .HasOne(ss => ss.Session)
                .WithMany(s => s.SessionSeats)
                .HasForeignKey(ss => ss.SessionId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<SessionSeat>()
                .HasOne(ss => ss.User)
                .WithMany()
                .HasForeignKey(ss => ss.LockedByUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Ticket <-> SessionSeat (One-to-One)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.SessionSeat)
                .WithOne(ss => ss.Ticket)
                .HasForeignKey<Ticket>(t => t.SessionSeatId)
                .OnDelete(DeleteBehavior.Restrict);

            // Order <-> Ticket
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Order)
                .WithMany(o => o.Tickets)
                .HasForeignKey(t => t.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order <-> User
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
