using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoService.Migrations
{
    /// <inheritdoc />
    public partial class EditReviewsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Reviews",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                newName: "IX_Reviews_ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Clients_ClientId",
                table: "Reviews",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Clients_ClientId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "Reviews",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_ClientId",
                table: "Reviews",
                newName: "IX_Reviews_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
