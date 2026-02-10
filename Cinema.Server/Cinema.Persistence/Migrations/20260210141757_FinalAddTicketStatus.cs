using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FinalAddTicketStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Створюємо колонку (цей рядок EF вже мав згенерувати сам)
            migrationBuilder.AddColumn<int>(
                name: "TicketStatus",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 1);

            // 2. Оновлюємо старі квитки (якщо ордер Confirmed(4) -> статус квитка Active(2))
            migrationBuilder.Sql(
                @"UPDATE t 
          SET t.TicketStatus = 2 
          FROM Tickets t 
          INNER JOIN Orders o ON t.OrderId = o.OrderId 
          WHERE o.OrderStatus = 4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Має бути тут, щоб Update-Database міг відкотитися назад без помилок
            migrationBuilder.DropColumn(
                name: "TicketStatus",
                table: "Tickets");
        }
    }
}
