using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DPM.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, defaultValueSql: "generate_id()"),
                    CognitoSub = table.Column<string>(type: "varchar(256)", nullable: false),
                    Email = table.Column<string>(type: "varchar(128)", nullable: false),
                    Username = table.Column<string>(type: "varchar(64)", nullable: false),
                    FullName = table.Column<string>(type: "varchar(64)", nullable: true),
                    Address = table.Column<string>(type: "varchar(256)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(16)", nullable: true),
                    Gender = table.Column<string>(type: "varchar(8)", nullable: true),
                    Avatar = table.Column<string>(type: "varchar(256)", nullable: true),
                    RoleType = table.Column<string>(type: "varchar(16)", nullable: false, defaultValue: "User"),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_users_users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "boats",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, defaultValueSql: "generate_id()"),
                    Name = table.Column<string>(type: "varchar(128)", nullable: false),
                    ClassNumber = table.Column<string>(type: "varchar(128)", nullable: false),
                    IMONumber = table.Column<string>(type: "varchar(128)", nullable: false),
                    RegisterNumber = table.Column<string>(type: "varchar(128)", nullable: false),
                    Purpose = table.Column<string>(type: "varchar(512)", nullable: false),
                    GrossTonnage = table.Column<string>(type: "varchar(128)", nullable: false),
                    TotalPower = table.Column<string>(type: "varchar(128)", nullable: false),
                    OwnerId = table.Column<long>(type: "bigint", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_boats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_boats_users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_boats_users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "fishermens",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, defaultValueSql: "generate_id()"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    YearExperience = table.Column<long>(type: "bigint", nullable: false),
                    VoyageId = table.Column<long>(type: "bigint", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    BoatId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fishermens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_fishermens_boats_BoatId",
                        column: x => x.BoatId,
                        principalTable: "boats",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_fishermens_users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_fishermens_users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_fishermens_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_boats_CreatedBy",
                table: "boats",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_boats_IMONumber",
                table: "boats",
                column: "IMONumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_boats_OwnerId",
                table: "boats",
                column: "OwnerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_boats_UpdatedBy",
                table: "boats",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_fishermens_BoatId",
                table: "fishermens",
                column: "BoatId");

            migrationBuilder.CreateIndex(
                name: "IX_fishermens_CreatedBy",
                table: "fishermens",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_fishermens_UpdatedBy",
                table: "fishermens",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_fishermens_UserId",
                table: "fishermens",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_CognitoSub",
                table: "users",
                column: "CognitoSub",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_CreatedBy",
                table: "users",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_users_Email",
                table: "users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_UpdatedBy",
                table: "users",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_users_Username",
                table: "users",
                column: "Username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_boats_fishermens_OwnerId",
                table: "boats",
                column: "OwnerId",
                principalTable: "fishermens",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_boats_fishermens_OwnerId",
                table: "boats");

            migrationBuilder.DropTable(
                name: "fishermens");

            migrationBuilder.DropTable(
                name: "boats");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
