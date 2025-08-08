using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Booking
{
    public int BId { get; set; }

    public int UId { get; set; }

    public int GId { get; set; }

    public DateOnly BDateTime { get; set; }

    public TimeOnly TimeFrom { get; set; }

    public TimeOnly TimeTo { get; set; }

    public decimal BAmt { get; set; }

    public virtual ICollection<Feedback> Feedback { get; set; } = new List<Feedback>();

    public virtual Ground GIdNavigation { get; set; } = null!;

    public virtual ICollection<Queries> Queries { get; set; } = new List<Queries>();

    public virtual Users UIdNavigation { get; set; } = null!;
}
