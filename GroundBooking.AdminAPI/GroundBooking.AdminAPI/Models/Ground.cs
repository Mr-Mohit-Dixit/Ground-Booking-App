using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Ground
{
    public int GId { get; set; }

    public string GName { get; set; } = null!;

    public string GDescription { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int CId { get; set; }

    public int UId { get; set; }

    public int SId { get; set; }

    public string? GStatus { get; set; }

    public string GImages { get; set; } = null!;

    public virtual ICollection<Booking> Booking { get; set; } = new List<Booking>();

    public virtual City CIdNavigation { get; set; } = null!;

    public virtual ICollection<Request> Request { get; set; } = new List<Request>();

    public virtual Sport SIdNavigation { get; set; } = null!;

    public virtual Users UIdNavigation { get; set; } = null!;
}
