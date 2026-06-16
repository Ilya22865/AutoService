using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoService.Migrations
{
    /// <inheritdoc />
    public partial class AddScheduledDateAndEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedEmployeeId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ScheduledDate",
                table: "Orders",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AssignedEmployeeId",
                table: "Orders",
                column: "AssignedEmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_AssignedEmployeeId",
                table: "Orders",
                column: "AssignedEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_AssignedEmployeeId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AssignedEmployeeId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AssignedEmployeeId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ScheduledDate",
                table: "Orders");
        }
    }
}
