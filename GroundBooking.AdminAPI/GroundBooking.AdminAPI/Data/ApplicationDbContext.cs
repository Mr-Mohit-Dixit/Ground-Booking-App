using System;
using System.Collections.Generic;
using GroundBooking.AdminAPI.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace GroundBooking.AdminAPI.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Booking { get; set; }

    public virtual DbSet<City> City { get; set; }

    public virtual DbSet<Feedback> Feedback { get; set; }

    public virtual DbSet<Ground> Ground { get; set; }

    public virtual DbSet<Queries> Queries { get; set; }

    public virtual DbSet<Queryanswer> Queryanswer { get; set; }

    public virtual DbSet<Request> Request { get; set; }

    public virtual DbSet<Roles> Roles { get; set; }

    public virtual DbSet<Slots> Slots { get; set; }

    public virtual DbSet<Sport> Sport { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=p27_groundbookingapp;user=root;password=root", ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BId).HasName("PRIMARY");

            entity.ToTable("booking");

            entity.HasIndex(e => e.GId, "gId");

            entity.HasIndex(e => e.UId, "uId");

            entity.Property(e => e.BId).HasColumnName("bId");
            entity.Property(e => e.BAmt)
                .HasPrecision(10, 2)
                .HasColumnName("bAmt");
            entity.Property(e => e.BDateTime).HasColumnName("bDateTime");
            entity.Property(e => e.GId).HasColumnName("gId");
            entity.Property(e => e.TimeFrom)
                .HasColumnType("time")
                .HasColumnName("timeFrom");
            entity.Property(e => e.TimeTo)
                .HasColumnType("time")
                .HasColumnName("timeTo");
            entity.Property(e => e.UId).HasColumnName("uId");

            entity.HasOne(d => d.GIdNavigation).WithMany(p => p.Booking)
                .HasForeignKey(d => d.GId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("booking_ibfk_2");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Booking)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("booking_ibfk_1");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CId).HasName("PRIMARY");

            entity.ToTable("city");

            entity.HasIndex(e => e.CName, "cName").IsUnique();

            entity.Property(e => e.CId).HasColumnName("cId");
            entity.Property(e => e.CName)
                .HasMaxLength(100)
                .HasColumnName("cName");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FId).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.HasIndex(e => e.BId, "bId");

            entity.HasIndex(e => e.UId, "uId");

            entity.Property(e => e.FId).HasColumnName("fId");
            entity.Property(e => e.BId).HasColumnName("bId");
            entity.Property(e => e.FDateTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("fDateTime");
            entity.Property(e => e.FRating).HasColumnName("fRating");
            entity.Property(e => e.FText)
                .HasColumnType("text")
                .HasColumnName("fText");
            entity.Property(e => e.UId).HasColumnName("uId");

            entity.HasOne(d => d.BIdNavigation).WithMany(p => p.Feedback)
                .HasForeignKey(d => d.BId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("feedback_ibfk_2");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Feedback)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("feedback_ibfk_1");
        });

        modelBuilder.Entity<Ground>(entity =>
        {
            entity.HasKey(e => e.GId).HasName("PRIMARY");

            entity.ToTable("ground");

            entity.HasIndex(e => e.CId, "cId");

            entity.HasIndex(e => e.SId, "sId");

            entity.HasIndex(e => e.UId, "uId");

            entity.Property(e => e.GId).HasColumnName("gId");
            entity.Property(e => e.Address)
                .HasColumnType("text")
                .HasColumnName("address");
            entity.Property(e => e.CId).HasColumnName("cId");
            entity.Property(e => e.GDescription)
                .HasColumnType("text")
                .HasColumnName("gDescription");
            entity.Property(e => e.GImages)
                .HasColumnType("text")
                .HasColumnName("gImages");
            entity.Property(e => e.GName)
                .HasMaxLength(100)
                .HasColumnName("gName");
            entity.Property(e => e.GStatus)
                .HasDefaultValueSql("'Active'")
                .HasColumnType("enum('Active','Inactive','Blocked')")
                .HasColumnName("gStatus");
            entity.Property(e => e.SId).HasColumnName("sId");
            entity.Property(e => e.UId).HasColumnName("uId");

            entity.HasOne(d => d.CIdNavigation).WithMany(p => p.Ground)
                .HasForeignKey(d => d.CId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ground_ibfk_1");

            entity.HasOne(d => d.SIdNavigation).WithMany(p => p.Ground)
                .HasForeignKey(d => d.SId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ground_ibfk_3");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Ground)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ground_ibfk_2");
        });

        modelBuilder.Entity<Queries>(entity =>
        {
            entity.HasKey(e => e.QId).HasName("PRIMARY");

            entity.ToTable("queries");

            entity.HasIndex(e => e.BId, "bId");

            entity.Property(e => e.QId).HasColumnName("qId");
            entity.Property(e => e.BId).HasColumnName("bId");
            entity.Property(e => e.QDateTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("qDateTime");
            entity.Property(e => e.QStatus)
                .HasDefaultValueSql("'New'")
                .HasColumnType("enum('New','In Progress','Resolved')")
                .HasColumnName("qStatus");
            entity.Property(e => e.QText)
                .HasColumnType("text")
                .HasColumnName("qText");
            entity.Property(e => e.QType)
                .HasMaxLength(50)
                .HasColumnName("qType");

            entity.HasOne(d => d.BIdNavigation).WithMany(p => p.Queries)
                .HasForeignKey(d => d.BId)
                .HasConstraintName("queries_ibfk_1");
        });

        modelBuilder.Entity<Queryanswer>(entity =>
        {
            entity.HasKey(e => e.QaId).HasName("PRIMARY");

            entity.ToTable("queryanswer");

            entity.HasIndex(e => e.QId, "qId");

            entity.HasIndex(e => e.UId, "uId");

            entity.Property(e => e.QaId).HasColumnName("qaId");
            entity.Property(e => e.QId).HasColumnName("qId");
            entity.Property(e => e.QaAnsDateTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("qaAnsDateTime");
            entity.Property(e => e.QaAnsText)
                .HasColumnType("text")
                .HasColumnName("qaAnsText");
            entity.Property(e => e.UId).HasColumnName("uId");

            entity.HasOne(d => d.QIdNavigation).WithMany(p => p.Queryanswer)
                .HasForeignKey(d => d.QId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("queryanswer_ibfk_1");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Queryanswer)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("queryanswer_ibfk_2");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RqId).HasName("PRIMARY");

            entity.ToTable("request");

            entity.HasIndex(e => e.GId, "gId");

            entity.HasIndex(e => e.UId, "uId");

            entity.Property(e => e.RqId).HasColumnName("rqId");
            entity.Property(e => e.GId).HasColumnName("gId");
            entity.Property(e => e.RqDateTime)
                .HasColumnType("datetime")
                .HasColumnName("rqDateTime");
            entity.Property(e => e.RqStatus)
                .HasDefaultValueSql("'Pending'")
                .HasColumnType("enum('Approved','Pending','Denied')")
                .HasColumnName("rqStatus");
            entity.Property(e => e.UId).HasColumnName("uId");

            entity.HasOne(d => d.GIdNavigation).WithMany(p => p.Request)
                .HasForeignKey(d => d.GId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("request_ibfk_2");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Request)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("request_ibfk_1");
        });

        modelBuilder.Entity<Roles>(entity =>
        {
            entity.HasKey(e => e.RId).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.HasIndex(e => e.RName, "rName").IsUnique();

            entity.Property(e => e.RId).HasColumnName("rId");
            entity.Property(e => e.RName)
                .HasMaxLength(50)
                .HasColumnName("rName");
        });

        modelBuilder.Entity<Slots>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PRIMARY");

            entity.ToTable("slots");

            entity.HasIndex(e => e.SlotTime, "slotTime").IsUnique();

            entity.Property(e => e.SlotId).HasColumnName("slotId");
            entity.Property(e => e.SlotTime)
                .HasColumnType("time")
                .HasColumnName("slotTime");
        });

        modelBuilder.Entity<Sport>(entity =>
        {
            entity.HasKey(e => e.SId).HasName("PRIMARY");

            entity.ToTable("sport");

            entity.HasIndex(e => e.SName, "sName").IsUnique();

            entity.Property(e => e.SId).HasColumnName("sId");
            entity.Property(e => e.SName)
                .HasMaxLength(100)
                .HasColumnName("sName");
            entity.Property(e => e.SRate)
                .HasPrecision(10, 2)
                .HasColumnName("sRate");
        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(e => e.UId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Aadhar, "aadhar").IsUnique();

            entity.HasIndex(e => e.CId, "cId");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.RId, "rId");

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.UId).HasColumnName("uId");
            entity.Property(e => e.Aadhar)
                .HasMaxLength(12)
                .HasColumnName("aadhar");
            entity.Property(e => e.CId).HasColumnName("cId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Passwords)
                .HasMaxLength(255)
                .HasColumnName("passwords");
            entity.Property(e => e.RId).HasColumnName("rId");
            entity.Property(e => e.UAddress)
                .HasColumnType("text")
                .HasColumnName("uAddress");
            entity.Property(e => e.UName)
                .HasMaxLength(100)
                .HasColumnName("uName");
            entity.Property(e => e.UPhoneNo)
                .HasMaxLength(15)
                .HasColumnName("uPhoneNo");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");

            entity.HasOne(d => d.CIdNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.CId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_ibfk_2");

            entity.HasOne(d => d.RIdNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.RId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
