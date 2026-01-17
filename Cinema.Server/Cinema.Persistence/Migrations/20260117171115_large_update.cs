using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class large_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_customer_id",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Orders_order_id",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seats_seat_id",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_seat_id",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "seat_id",
                table: "Tickets",
                newName: "ticket_type");

            migrationBuilder.RenameColumn(
                name: "customer_id",
                table: "Orders",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_customer_id",
                table: "Orders",
                newName: "IX_Orders_user_id");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "News",
                newName: "news_content");

            migrationBuilder.AddColumn<int>(
                name: "session_seat_id",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "payment_method",
                table: "Payments",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                table: "Payments",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "payment_status",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<decimal>(
                name: "total_amount",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<decimal>(
                name: "rating",
                table: "Movies",
                type: "decimal(3,1)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "duration",
                table: "Movies",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "end_date",
                table: "Movies",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "language",
                table: "Movies",
                type: "char(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "poster_url",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "release_date",
                table: "Movies",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "start_date",
                table: "Movies",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "trailer_url",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Actors",
                columns: table => new
                {
                    actor_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    biography = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    photo_url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actors", x => x.actor_id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role_name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "ActorMovies",
                columns: table => new
                {
                    actor_movie_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    movie_id = table.Column<int>(type: "int", nullable: false),
                    actor_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActorMovies", x => x.actor_movie_id);
                    table.ForeignKey(
                        name: "FK_ActorMovies_Actors_actor_id",
                        column: x => x.actor_id,
                        principalTable: "Actors",
                        principalColumn: "actor_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActorMovies_Movies_movie_id",
                        column: x => x.movie_id,
                        principalTable: "Movies",
                        principalColumn: "movie_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role_id = table.Column<int>(type: "int", nullable: false),
                    full_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    refresh_token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    expires_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_role_id",
                        column: x => x.role_id,
                        principalTable: "Roles",
                        principalColumn: "role_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionSeats",
                columns: table => new
                {
                    session_seat_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    session_id = table.Column<int>(type: "int", nullable: false),
                    seat_id = table.Column<int>(type: "int", nullable: false),
                    locked_by_user_id = table.Column<int>(type: "int", nullable: true),
                    seat_status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionSeats", x => x.session_seat_id);
                    table.ForeignKey(
                        name: "FK_SessionSeats_Seats_seat_id",
                        column: x => x.seat_id,
                        principalTable: "Seats",
                        principalColumn: "seat_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionSeats_Sessions_session_id",
                        column: x => x.session_id,
                        principalTable: "Sessions",
                        principalColumn: "session_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SessionSeats_Users_locked_by_user_id",
                        column: x => x.locked_by_user_id,
                        principalTable: "Users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_session_seat_id",
                table: "Tickets",
                column: "session_seat_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActorMovies_actor_id",
                table: "ActorMovies",
                column: "actor_id");

            migrationBuilder.CreateIndex(
                name: "IX_ActorMovies_movie_id",
                table: "ActorMovies",
                column: "movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_SessionSeats_locked_by_user_id",
                table: "SessionSeats",
                column: "locked_by_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_SessionSeats_seat_id",
                table: "SessionSeats",
                column: "seat_id");

            migrationBuilder.CreateIndex(
                name: "IX_SessionSeats_session_id",
                table: "SessionSeats",
                column: "session_id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_role_id",
                table: "Users",
                column: "role_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_user_id",
                table: "Orders",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Restrict);

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_user_id",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Orders_order_id",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SessionSeats_session_seat_id",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "ActorMovies");

            migrationBuilder.DropTable(
                name: "SessionSeats");

            migrationBuilder.DropTable(
                name: "Actors");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_session_seat_id",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "session_seat_id",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "payment_status",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "end_date",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "language",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "poster_url",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "release_date",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "start_date",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "trailer_url",
                table: "Movies");

            migrationBuilder.RenameColumn(
                name: "ticket_type",
                table: "Tickets",
                newName: "seat_id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Orders",
                newName: "customer_id");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                newName: "IX_Orders_customer_id");

            migrationBuilder.RenameColumn(
                name: "news_content",
                table: "News",
                newName: "content");

            migrationBuilder.AlterColumn<string>(
                name: "payment_method",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "amount",
                table: "Payments",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "total_amount",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "rating",
                table: "Movies",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,1)");

            migrationBuilder.AlterColumn<double>(
                name: "duration",
                table: "Movies",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    full_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.customer_id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_seat_id",
                table: "Tickets",
                column: "seat_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_customer_id",
                table: "Orders",
                column: "customer_id",
                principalTable: "Customers",
                principalColumn: "customer_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Orders_order_id",
                table: "Tickets",
                column: "order_id",
                principalTable: "Orders",
                principalColumn: "order_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seats_seat_id",
                table: "Tickets",
                column: "seat_id",
                principalTable: "Seats",
                principalColumn: "seat_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
