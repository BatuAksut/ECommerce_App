using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class img2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProductId",
                table: "AppFiles",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppFiles_ProductId",
                table: "AppFiles",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppFiles_Products_ProductId",
                table: "AppFiles",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFiles_Products_ProductId",
                table: "AppFiles");

            migrationBuilder.DropIndex(
                name: "IX_AppFiles_ProductId",
                table: "AppFiles");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "AppFiles");
        }
    }
}
