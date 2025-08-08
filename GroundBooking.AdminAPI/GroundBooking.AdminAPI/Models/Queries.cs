using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Queries
{
    public int QId { get; set; }

    public int? BId { get; set; }

    public string QType { get; set; } = null!;

    public string QText { get; set; } = null!;

    public DateTime? QDateTime { get; set; }

    public string? QStatus { get; set; }

    public virtual Booking? BIdNavigation { get; set; }

    public virtual ICollection<Queryanswer> Queryanswer { get; set; } = new List<Queryanswer>();
}
