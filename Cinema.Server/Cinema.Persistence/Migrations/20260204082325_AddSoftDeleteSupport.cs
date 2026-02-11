using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftDeleteSupport : Migration
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

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Sessions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Movies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Actors_ActorId",
                table: "News",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "ActorId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Movies_MovieId",
                table: "News",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.SetNull);
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

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Movies");

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
    }
}
