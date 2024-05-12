using DPM.Domain.Entities;
using DPM.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Role = DPM.Domain.Common.Models.Role;
namespace DPM.Infrastructure.Database
{
    public class AppDbContext : IdentityDbContext<User, Role, long>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.Property(e => e.Id).IsRequired().HasColumnType("bigint").HasDefaultValueSql("generate_id()");
                entity.Property(e => e.Email).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.FullName).HasColumnType("varchar(64)");
                entity.Property(e => e.Address).HasColumnType("varchar(256)");
                entity.Property(e => e.PhoneNumber).HasColumnType("varchar(16)");
                entity.Property(e => e.Avatar).HasColumnType("varchar(256)");
                entity.Property(e => e.Gender).HasColumnType("varchar(8)").HasConversion<string>();
                entity.Property(e => e.RoleType).IsRequired().HasColumnType("varchar(16)").HasConversion<string>().HasDefaultValue(RoleType.User);
                entity.Property(e => e.IsDisabled).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("now()");
                entity.Property(e => e.UpdatedAt).IsRequired().HasDefaultValueSql("now()");

                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity
              .HasOne(e => e.Creator)
              .WithMany()
              .HasForeignKey(e => e.CreatedBy)
              .OnDelete(DeleteBehavior.SetNull);
                    entity
                      .HasOne(e => e.Updater)
                      .WithMany()
                      .HasForeignKey(e => e.UpdatedBy)
                      .OnDelete(DeleteBehavior.SetNull);
                    entity.HasQueryFilter(e => !e.IsDeleted);

                });
            modelBuilder.Entity<Boat>(entity =>
            {
                entity.ToTable("boats");
                entity.Property(e => e.Id).IsRequired().HasColumnType("bigint").HasDefaultValueSql("generate_id()");
                entity.Property(e => e.ClassNumber).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.Name).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.IMONumber).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.RegisterNumber).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.Purpose).IsRequired().HasColumnType("varchar(512)");
                entity.Property(e => e.OwnerId).IsRequired().HasColumnType("bigint");
                entity.Property(e => e.GrossTonnage).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.TotalPower).IsRequired().HasColumnType("varchar(128)");
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("now()");
                entity.Property(e => e.UpdatedAt).IsRequired().HasDefaultValueSql("now()");
                entity.Property(e => e.CreatedBy).HasColumnType("bigint");
                entity.Property(e => e.UpdatedBy).HasColumnType("bigint");
                
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.IMONumber).IsUnique();

                entity
                  .HasOne(e => e.Owner)
                  .WithOne()
                  .HasForeignKey<Boat>(e => e.OwnerId);
                entity
                  .HasOne(e => e.Creator)
                  .WithMany()
                  .HasForeignKey(e => e.CreatedBy)
                  .OnDelete(DeleteBehavior.SetNull);
                entity
                  .HasOne(e => e.Updater)
                  .WithMany()
                  .HasForeignKey(e => e.UpdatedBy)
                  .OnDelete(DeleteBehavior.SetNull);
                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<Fishermen>(entity =>
            {
                entity.ToTable("fishermens");
                entity.Property(e => e.Id).IsRequired().HasColumnType("bigint").HasDefaultValueSql("generate_id()");
                entity.Property(e => e.UserId).IsRequired().HasColumnType("bigint");
                entity.Property(e => e.IsDisabled).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("now()");
                entity.Property(e => e.UpdatedAt).IsRequired().HasDefaultValueSql("now()");
                entity.Property(e => e.CreatedBy).HasColumnType("bigint");
                entity.Property(e => e.UpdatedBy).HasColumnType("bigint");

                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.UserId ).IsUnique();

                entity
            .HasOne(e => e.Creator)
            .WithMany()
            .HasForeignKey(e => e.CreatedBy)
            .OnDelete(DeleteBehavior.SetNull);
                entity
            .HasOne(e => e.Updater)
            .WithMany()
            .HasForeignKey(e => e.UpdatedBy)
            .OnDelete(DeleteBehavior.SetNull);

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

        }
        public override int SaveChanges()
        {
            throw new NotSupportedException("Only asynchronous operations are supported.");
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            throw new NotSupportedException("Only asynchronous operations are supported.");
        }
        public override void Dispose()
        {
            GC.SuppressFinalize(this);
            base.Dispose();
        }
    }
    public class ReadOnlyAppDbContext : AppDbContext
    {
        public ReadOnlyAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException("Readonly context");
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException("Readonly context");
        }
    }
}
