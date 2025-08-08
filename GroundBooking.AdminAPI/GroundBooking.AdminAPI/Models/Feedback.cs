using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Feedback
{
    public int FId { get; set; }

    public int UId { get; set; }

    public int BId { get; set; }

    public string? FText { get; set; }

    public int FRating { get; set; }

    public DateTime? FDateTime { get; set; }

    public virtual Booking BIdNavigation { get; set; } = null!;

    public virtual Users UIdNavigation { get; set; } = null!;
}
