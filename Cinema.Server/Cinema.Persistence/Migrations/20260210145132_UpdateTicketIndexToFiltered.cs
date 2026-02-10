using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTicketIndexToFiltered : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tickets_SessionSeatId",
                table: "Tickets");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SessionSeatId",
                table: "Tickets",
                column: "SessionSeatId",
                unique: true,
                filter: "[TicketStatus] IN (1, 2)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tickets_SessionSeatId",
                table: "Tickets");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SessionSeatId",
                table: "Tickets",
                column: "SessionSeatId",
                unique: true);
        }
    }
}
