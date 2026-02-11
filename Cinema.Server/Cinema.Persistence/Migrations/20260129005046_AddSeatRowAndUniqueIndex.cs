using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSeatRowAndUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Seat_HallId_SeatNo_Unique",
                table: "Seats");

            migrationBuilder.AddColumn<int>(
                name: "Row",
                table: "Seats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Seat_HallId_Row_Number_Unique",
                table: "Seats",
                columns: new[] { "HallId", "Row", "SeatNo" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Seat_HallId_Row_Number_Unique",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "Row",
                table: "Seats");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_HallId_SeatNo_Unique",
                table: "Seats",
                columns: new[] { "HallId", "SeatNo" },
                unique: true);
        }
    }
}
