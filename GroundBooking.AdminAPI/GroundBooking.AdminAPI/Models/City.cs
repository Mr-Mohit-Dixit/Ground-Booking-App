using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class City
{
    public int CId { get; set; }

    public string CName { get; set; } = null!;

    public virtual ICollection<Ground> Ground { get; set; } = new List<Ground>();

    public virtual ICollection<Users> Users { get; set; } = new List<Users>();
}
