using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLockExpirationToSessionSeat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Sessions_SessionId",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Users_LockedByUserId",
                table: "SessionSeats");

            migrationBuilder.AddColumn<DateTime>(
                name: "LockExpiration",
                table: "SessionSeats",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Sessions_SessionId",
                table: "SessionSeats",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "SessionId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSeats_Users_LockedByUserId",
                table: "SessionSeats",
                column: "LockedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Sessions_SessionId",
                table: "SessionSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionSeats_Users_LockedByUserId",
                table: "SessionSeats");

            migrationBuilder.DropColumn(
                name: "LockExpiration",
                table: "SessionSeats");

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
        }
    }
}
