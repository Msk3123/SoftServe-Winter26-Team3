using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Actors_actor_id",
                table: "ActorMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Movies_movie_id",
                table: "ActorMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_GenreMovies_Genres_genre_id",
                table: "GenreMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_GenreMovies_Movies_movie_id",
                table: "GenreMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Movies_movie_id",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Sessions_session_id",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_user_id",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_order_id",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Halls_hall_id",
                table: "Seats");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Halls_hall_id",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Movies_movie_id",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Seats_seat_id",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Sessions_session_id",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Users_locked_by_user_id",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Orders_order_id",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SessionSeats_session_seat_id",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_role_id",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Orders_session_id",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "Users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "Users",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "refresh_token",
                table: "Users",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "password_hash",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "full_name",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "expires_at",
                table: "Users",
                newName: "ExpiresAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Users",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_role_id",
                table: "Users",
                newName: "IX_Users_RoleId");

            migrationBuilder.RenameColumn(
                name: "ticket_type",
                table: "Tickets",
                newName: "TicketTypes");

            migrationBuilder.RenameColumn(
                name: "session_seat_id",
                table: "Tickets",
                newName: "SessionSeatId");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "Tickets",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "ticket_id",
                table: "Tickets",
                newName: "TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_session_seat_id",
                table: "Tickets",
                newName: "IX_Tickets_SessionSeatId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_order_id",
                table: "Tickets",
                newName: "IX_Tickets_OrderId");

            migrationBuilder.RenameColumn(
                name: "session_id",
                table: "SessionSeats",
                newName: "SessionId");

            migrationBuilder.RenameColumn(
                name: "seat_status",
                table: "SessionSeats",
                newName: "SeatStatuses");

            migrationBuilder.RenameColumn(
                name: "seat_id",
                table: "SessionSeats",
                newName: "SeatId");

            migrationBuilder.RenameColumn(
                name: "locked_by_user_id",
                table: "SessionSeats",
                newName: "LockedByUserId");

            migrationBuilder.RenameColumn(
                name: "session_seat_id",
                table: "SessionSeats",
                newName: "SessionSeatId");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_session_id",
                table: "SessionSeats",
                newName: "IX_SessionSeats_SessionId");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_seat_id",
                table: "SessionSeats",
                newName: "IX_SessionSeats_SeatId");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_locked_by_user_id",
                table: "SessionSeats",
                newName: "IX_SessionSeats_LockedByUserId");

            migrationBuilder.RenameColumn(
                name: "session_time",
                table: "Sessions",
                newName: "SessionTime");

            migrationBuilder.RenameColumn(
                name: "session_date",
                table: "Sessions",
                newName: "SessionDate");

            migrationBuilder.RenameColumn(
                name: "movie_id",
                table: "Sessions",
                newName: "MovieId");

            migrationBuilder.RenameColumn(
                name: "hall_id",
                table: "Sessions",
                newName: "HallId");

            migrationBuilder.RenameColumn(
                name: "session_id",
                table: "Sessions",
                newName: "SessionId");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_movie_id",
                table: "Sessions",
                newName: "IX_Sessions_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_hall_id",
                table: "Sessions",
                newName: "IX_Sessions_HallId");

            migrationBuilder.RenameColumn(
                name: "seat_type",
                table: "Seats",
                newName: "SeatType");

            migrationBuilder.RenameColumn(
                name: "seat_no",
                table: "Seats",
                newName: "SeatNo");

            migrationBuilder.RenameColumn(
                name: "hall_id",
                table: "Seats",
                newName: "HallId");

            migrationBuilder.RenameColumn(
                name: "seat_id",
                table: "Seats",
                newName: "SeatId");

            migrationBuilder.RenameIndex(
                name: "IX_Seats_hall_id",
                table: "Seats",
                newName: "IX_Seats_HallId");

            migrationBuilder.RenameColumn(
                name: "role_name",
                table: "Roles",
                newName: "RoleName");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "Roles",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "Payments",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "payment_status",
                table: "Payments",
                newName: "PaymentStatuses");

            migrationBuilder.RenameColumn(
                name: "payment_method",
                table: "Payments",
                newName: "PaymentMethods");

            migrationBuilder.RenameColumn(
                name: "payment_date",
                table: "Payments",
                newName: "PaymentDate");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "Payments",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "payment_id",
                table: "Payments",
                newName: "PaymentId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_order_id",
                table: "Payments",
                newName: "IX_Payments_OrderId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "total_amount",
                table: "Orders",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Orders",
                newName: "SessionId");

            migrationBuilder.RenameColumn(
                name: "session_id",
                table: "Orders",
                newName: "OrderStatuses");

            migrationBuilder.RenameColumn(
                name: "order_date",
                table: "Orders",
                newName: "OrderDate");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "Orders",
                newName: "OrderIid");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                newName: "IX_Orders_UserId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "News",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "published_date",
                table: "News",
                newName: "PublishedDate");

            migrationBuilder.RenameColumn(
                name: "news_content",
                table: "News",
                newName: "NewsContent");

            migrationBuilder.RenameColumn(
                name: "movie_id",
                table: "News",
                newName: "TagId");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "News",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "image_url",
                table: "News",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "news_id",
                table: "News",
                newName: "NewsId");

            migrationBuilder.RenameIndex(
                name: "IX_News_movie_id",
                table: "News",
                newName: "IX_News_TagId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Movies",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "Movies",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "language",
                table: "Movies",
                newName: "Language");

            migrationBuilder.RenameColumn(
                name: "duration",
                table: "Movies",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Movies",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "trailer_url",
                table: "Movies",
                newName: "TrailerUrl");

            migrationBuilder.RenameColumn(
                name: "start_date",
                table: "Movies",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "release_date",
                table: "Movies",
                newName: "ReleaseDate");

            migrationBuilder.RenameColumn(
                name: "poster_url",
                table: "Movies",
                newName: "PosterUrl");

            migrationBuilder.RenameColumn(
                name: "end_date",
                table: "Movies",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "movie_id",
                table: "Movies",
                newName: "MovieId");

            migrationBuilder.RenameColumn(
                name: "capacity",
                table: "Halls",
                newName: "Capacity");

            migrationBuilder.RenameColumn(
                name: "hall_name",
                table: "Halls",
                newName: "HallName");

            migrationBuilder.RenameColumn(
                name: "hall_id",
                table: "Halls",
                newName: "HallId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Genres",
                newName: "GenreName");

            migrationBuilder.RenameColumn(
                name: "genre_id",
                table: "Genres",
                newName: "GenreId");

            migrationBuilder.RenameColumn(
                name: "movie_id",
                table: "GenreMovies",
                newName: "MovieId");

            migrationBuilder.RenameColumn(
                name: "genre_id",
                table: "GenreMovies",
                newName: "GenreId");

            migrationBuilder.RenameColumn(
                name: "genre_movie_id",
                table: "GenreMovies",
                newName: "GenreMovieId");

            migrationBuilder.RenameIndex(
                name: "IX_GenreMovies_movie_id",
                table: "GenreMovies",
                newName: "IX_GenreMovies_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_GenreMovies_genre_id",
                table: "GenreMovies",
                newName: "IX_GenreMovies_GenreId");

            migrationBuilder.RenameColumn(
                name: "birthday",
                table: "Actors",
                newName: "Birthday");

            migrationBuilder.RenameColumn(
                name: "biography",
                table: "Actors",
                newName: "Biography");

            migrationBuilder.RenameColumn(
                name: "photo_url",
                table: "Actors",
                newName: "PhotoUrl");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "Actors",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "Actors",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "actor_id",
                table: "Actors",
                newName: "ActorId");

            migrationBuilder.RenameColumn(
                name: "movie_id",
                table: "ActorMovies",
                newName: "MovieId");

            migrationBuilder.RenameColumn(
                name: "actor_id",
                table: "ActorMovies",
                newName: "ActorId");

            migrationBuilder.RenameColumn(
                name: "actor_movie_id",
                table: "ActorMovies",
                newName: "ActorMovieId");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovies_movie_id",
                table: "ActorMovies",
                newName: "IX_ActorMovies_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovies_actor_id",
                table: "ActorMovies",
                newName: "IX_ActorMovies_ActorId");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ActorId",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MovieId",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MovieIid",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    TagId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.TagId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SessionId",
                table: "Orders",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_News_ActorId",
                table: "News",
                column: "ActorId");

            migrationBuilder.CreateIndex(
                name: "IX_News_MovieId",
                table: "News",
                column: "MovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Actors_ActorId",
                table: "ActorMovies",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "ActorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Movies_MovieId",
                table: "ActorMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GenreMovies_Genres_GenreId",
                table: "GenreMovies",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "GenreId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GenreMovies_Movies_MovieId",
                table: "GenreMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "ActorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Tags_TagId",
                table: "News",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "TagId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Sessions_SessionId",
                table: "Orders",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "SessionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_OrderId",
                table: "Payments",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderIid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Halls_HallId",
                table: "Seats",
                column: "HallId",
                principalTable: "Halls",
                principalColumn: "HallId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Halls_HallId",
                table: "Sessions",
                column: "HallId",
                principalTable: "Halls",
                principalColumn: "HallId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Movies_MovieId",
                table: "Sessions",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Seats_SeatId",
                table: "SessionSeats",
                column: "SeatId",
                principalTable: "Seats",
                principalColumn: "SeatId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Sessions_SessionId",
                table: "SessionSeats",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "SessionId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Users_LockedByUserId",
                table: "SessionSeats",
                column: "LockedByUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Orders_OrderId",
                table: "Tickets",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderIid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_SessionSeats_SessionSeatId",
                table: "Tickets",
                column: "SessionSeatId",
                principalTable: "SessionSeats",
                principalColumn: "SessionSeatId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Actors_ActorId",
                table: "ActorMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_ActorMovies_Movies_MovieId",
                table: "ActorMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_GenreMovies_Genres_GenreId",
                table: "GenreMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_GenreMovies_Movies_MovieId",
                table: "GenreMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Tags_TagId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Sessions_SessionId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_OrderId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Halls_HallId",
                table: "Seats");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Halls_HallId",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Movies_MovieId",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Seats_SeatId",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Sessions_SessionId",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Users_LockedByUserId",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Orders_OrderId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SessionSeats_SessionSeatId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SessionId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_News_ActorId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_MovieId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ActorId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "MovieIid",
                table: "News");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Users",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "Users",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "Users",
                newName: "refresh_token");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "password_hash");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "full_name");

            migrationBuilder.RenameColumn(
                name: "ExpiresAt",
                table: "Users",
                newName: "expires_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Users",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Users",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                newName: "IX_Users_role_id");

            migrationBuilder.RenameColumn(
                name: "TicketTypes",
                table: "Tickets",
                newName: "ticket_type");

            migrationBuilder.RenameColumn(
                name: "SessionSeatId",
                table: "Tickets",
                newName: "session_seat_id");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Tickets",
                newName: "order_id");

            migrationBuilder.RenameColumn(
                name: "TicketId",
                table: "Tickets",
                newName: "ticket_id");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_SessionSeatId",
                table: "Tickets",
                newName: "IX_Tickets_session_seat_id");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_OrderId",
                table: "Tickets",
                newName: "IX_Tickets_order_id");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "SessionSeats",
                newName: "session_id");

            migrationBuilder.RenameColumn(
                name: "SeatStatuses",
                table: "SessionSeats",
                newName: "seat_status");

            migrationBuilder.RenameColumn(
                name: "SeatId",
                table: "SessionSeats",
                newName: "seat_id");

            migrationBuilder.RenameColumn(
                name: "LockedByUserId",
                table: "SessionSeats",
                newName: "locked_by_user_id");

            migrationBuilder.RenameColumn(
                name: "SessionSeatId",
                table: "SessionSeats",
                newName: "session_seat_id");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_SessionId",
                table: "SessionSeats",
                newName: "IX_SessionSeats_session_id");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_SeatId",
                table: "SessionSeats",
                newName: "IX_SessionSeats_seat_id");

            migrationBuilder.RenameIndex(
                name: "IX_SessionSeats_LockedByUserId",
                table: "SessionSeats",
                newName: "IX_SessionSeats_locked_by_user_id");

            migrationBuilder.RenameColumn(
                name: "SessionTime",
                table: "Sessions",
                newName: "session_time");

            migrationBuilder.RenameColumn(
                name: "SessionDate",
                table: "Sessions",
                newName: "session_date");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "Sessions",
                newName: "movie_id");

            migrationBuilder.RenameColumn(
                name: "HallId",
                table: "Sessions",
                newName: "hall_id");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "Sessions",
                newName: "session_id");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_MovieId",
                table: "Sessions",
                newName: "IX_Sessions_movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_HallId",
                table: "Sessions",
                newName: "IX_Sessions_hall_id");

            migrationBuilder.RenameColumn(
                name: "SeatType",
                table: "Seats",
                newName: "seat_type");

            migrationBuilder.RenameColumn(
                name: "SeatNo",
                table: "Seats",
                newName: "seat_no");

            migrationBuilder.RenameColumn(
                name: "HallId",
                table: "Seats",
                newName: "hall_id");

            migrationBuilder.RenameColumn(
                name: "SeatId",
                table: "Seats",
                newName: "seat_id");

            migrationBuilder.RenameIndex(
                name: "IX_Seats_HallId",
                table: "Seats",
                newName: "IX_Seats_hall_id");

            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "Roles",
                newName: "role_name");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "Roles",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Payments",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "PaymentStatuses",
                table: "Payments",
                newName: "payment_status");

            migrationBuilder.RenameColumn(
                name: "PaymentMethods",
                table: "Payments",
                newName: "payment_method");

            migrationBuilder.RenameColumn(
                name: "PaymentDate",
                table: "Payments",
                newName: "payment_date");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Payments",
                newName: "order_id");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "Payments",
                newName: "payment_id");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                newName: "IX_Payments_order_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Orders",
                newName: "total_amount");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "Orders",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "OrderStatuses",
                table: "Orders",
                newName: "session_id");

            migrationBuilder.RenameColumn(
                name: "OrderDate",
                table: "Orders",
                newName: "order_date");

            migrationBuilder.RenameColumn(
                name: "OrderIid",
                table: "Orders",
                newName: "order_id");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                newName: "IX_Orders_user_id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "News",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "News",
                newName: "movie_id");

            migrationBuilder.RenameColumn(
                name: "PublishedDate",
                table: "News",
                newName: "published_date");

            migrationBuilder.RenameColumn(
                name: "NewsContent",
                table: "News",
                newName: "news_content");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "News",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "News",
                newName: "image_url");

            migrationBuilder.RenameColumn(
                name: "NewsId",
                table: "News",
                newName: "news_id");

            migrationBuilder.RenameIndex(
                name: "IX_News_TagId",
                table: "News",
                newName: "IX_News_movie_id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Movies",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Movies",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Language",
                table: "Movies",
                newName: "language");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Movies",
                newName: "duration");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Movies",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "TrailerUrl",
                table: "Movies",
                newName: "trailer_url");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Movies",
                newName: "start_date");

            migrationBuilder.RenameColumn(
                name: "ReleaseDate",
                table: "Movies",
                newName: "release_date");

            migrationBuilder.RenameColumn(
                name: "PosterUrl",
                table: "Movies",
                newName: "poster_url");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Movies",
                newName: "end_date");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "Movies",
                newName: "movie_id");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Halls",
                newName: "capacity");

            migrationBuilder.RenameColumn(
                name: "HallName",
                table: "Halls",
                newName: "hall_name");

            migrationBuilder.RenameColumn(
                name: "HallId",
                table: "Halls",
                newName: "hall_id");

            migrationBuilder.RenameColumn(
                name: "GenreName",
                table: "Genres",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "Genres",
                newName: "genre_id");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "GenreMovies",
                newName: "movie_id");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "GenreMovies",
                newName: "genre_id");

            migrationBuilder.RenameColumn(
                name: "GenreMovieId",
                table: "GenreMovies",
                newName: "genre_movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_GenreMovies_MovieId",
                table: "GenreMovies",
                newName: "IX_GenreMovies_movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_GenreMovies_GenreId",
                table: "GenreMovies",
                newName: "IX_GenreMovies_genre_id");

            migrationBuilder.RenameColumn(
                name: "Birthday",
                table: "Actors",
                newName: "birthday");

            migrationBuilder.RenameColumn(
                name: "Biography",
                table: "Actors",
                newName: "biography");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Actors",
                newName: "photo_url");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Actors",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Actors",
                newName: "first_name");

            migrationBuilder.RenameColumn(
                name: "ActorId",
                table: "Actors",
                newName: "actor_id");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "ActorMovies",
                newName: "movie_id");

            migrationBuilder.RenameColumn(
                name: "ActorId",
                table: "ActorMovies",
                newName: "actor_id");

            migrationBuilder.RenameColumn(
                name: "ActorMovieId",
                table: "ActorMovies",
                newName: "actor_movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovies_MovieId",
                table: "ActorMovies",
                newName: "IX_ActorMovies_movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_ActorMovies_ActorId",
                table: "ActorMovies",
                newName: "IX_ActorMovies_actor_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_session_id",
                table: "Orders",
                column: "session_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Actors_actor_id",
                table: "ActorMovies",
                column: "actor_id",
                principalTable: "Actors",
                principalColumn: "actor_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActorMovies_Movies_movie_id",
                table: "ActorMovies",
                column: "movie_id",
                principalTable: "Movies",
                principalColumn: "movie_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GenreMovies_Genres_genre_id",
                table: "GenreMovies",
                column: "genre_id",
                principalTable: "Genres",
                principalColumn: "genre_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GenreMovies_Movies_movie_id",
                table: "GenreMovies",
                column: "movie_id",
                principalTable: "Movies",
                principalColumn: "movie_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Movies_movie_id",
                table: "News",
                column: "movie_id",
                principalTable: "Movies",
                principalColumn: "movie_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Sessions_session_id",
                table: "Orders",
                column: "session_id",
                principalTable: "Sessions",
                principalColumn: "session_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_user_id",
                table: "Orders",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_order_id",
                table: "Payments",
                column: "order_id",
                principalTable: "Orders",
                principalColumn: "order_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Halls_hall_id",
                table: "Seats",
                column: "hall_id",
                principalTable: "Halls",
                principalColumn: "hall_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Halls_hall_id",
                table: "Sessions",
                column: "hall_id",
                principalTable: "Halls",
                principalColumn: "hall_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Movies_movie_id",
                table: "Sessions",
                column: "movie_id",
                principalTable: "Movies",
                principalColumn: "movie_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Seats_seat_id",
                table: "SessionSeats",
                column: "seat_id",
                principalTable: "Seats",
                principalColumn: "seat_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Sessions_session_id",
                table: "SessionSeats",
                column: "session_id",
                principalTable: "Sessions",
                principalColumn: "session_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Users_locked_by_user_id",
                table: "SessionSeats",
                column: "locked_by_user_id",
                principalTable: "Users",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Orders_order_id",
                table: "Tickets",
                column: "order_id",
                principalTable: "Orders",
                principalColumn: "order_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_SessionSeats_session_seat_id",
                table: "Tickets",
                column: "session_seat_id",
                principalTable: "SessionSeats",
                principalColumn: "session_seat_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_role_id",
                table: "Users",
                column: "role_id",
                principalTable: "Roles",
                principalColumn: "role_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
