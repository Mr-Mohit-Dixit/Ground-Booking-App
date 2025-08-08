using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Roles
{
    public int RId { get; set; }

    public string RName { get; set; } = null!;

    public virtual ICollection<Users> Users { get; set; } = new List<Users>();
}
