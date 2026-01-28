using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNewsEntityNullableFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "MovieIid",
                table: "News");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "News",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ActorId",
                table: "News",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "ActorId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ActorId",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MovieIid",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
        }
    }
}
