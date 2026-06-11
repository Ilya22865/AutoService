using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoService.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailConfirmation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "EmailVerificationToken",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "VerificationTokenExpires",
                table: "Users",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailVerificationToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VerificationTokenExpires",
                table: "Users");
        }
    }
}
