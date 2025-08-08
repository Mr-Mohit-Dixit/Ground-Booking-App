using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Users
{
    public int UId { get; set; }

    public int RId { get; set; }

    public string UName { get; set; } = null!;

    public string UPhoneNo { get; set; } = null!;

    public string Aadhar { get; set; } = null!;

    public string UAddress { get; set; } = null!;

    public int CId { get; set; }

    public string? Email { get; set; }

    public string? Username { get; set; }

    public string Passwords { get; set; } = null!;

    public virtual ICollection<Booking> Booking { get; set; } = new List<Booking>();

    public virtual City CIdNavigation { get; set; } = null!;

    public virtual ICollection<Feedback> Feedback { get; set; } = new List<Feedback>();

    public virtual ICollection<Ground> Ground { get; set; } = new List<Ground>();

    public virtual ICollection<Queryanswer> Queryanswer { get; set; } = new List<Queryanswer>();

    public virtual Roles RIdNavigation { get; set; } = null!;

    public virtual ICollection<Request> Request { get; set; } = new List<Request>();
}
