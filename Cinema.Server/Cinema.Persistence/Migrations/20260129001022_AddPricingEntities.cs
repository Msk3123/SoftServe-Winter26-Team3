using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPricingEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TicketTypes",
                table: "Tickets",
                newName: "TicketTypeId");

            migrationBuilder.RenameColumn(
                name: "SeatType",
                table: "Seats",
                newName: "SeatTypeId");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Tickets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "SeatType",
                columns: table => new
                {
                    SeatTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BasePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeatType", x => x.SeatTypeId);
                });

            migrationBuilder.CreateTable(
                name: "TicketType",
                columns: table => new
                {
                    TicketTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Multiplier = table.Column<decimal>(type: "decimal(18,4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketType", x => x.TicketTypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TicketTypeId",
                table: "Tickets",
                column: "TicketTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_SeatTypeId",
                table: "Seats",
                column: "SeatTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_SeatType_SeatTypeId",
                table: "Seats",
                column: "SeatTypeId",
                principalTable: "SeatType",
                principalColumn: "SeatTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_TicketType_TicketTypeId",
                table: "Tickets",
                column: "TicketTypeId",
                principalTable: "TicketType",
                principalColumn: "TicketTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_SeatType_SeatTypeId",
                table: "Seats");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_TicketType_TicketTypeId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "SeatType");

            migrationBuilder.DropTable(
                name: "TicketType");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_TicketTypeId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Seats_SeatTypeId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "TicketTypeId",
                table: "Tickets",
                newName: "TicketTypes");

            migrationBuilder.RenameColumn(
                name: "SeatTypeId",
                table: "Seats",
                newName: "SeatType");
        }
    }
}
