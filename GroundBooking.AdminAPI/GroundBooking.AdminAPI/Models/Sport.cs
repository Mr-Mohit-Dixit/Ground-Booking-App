using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Sport
{
    public int SId { get; set; }

    public string SName { get; set; } = null!;

    public decimal SRate { get; set; }

    public virtual ICollection<Ground> Ground { get; set; } = new List<Ground>();
}
