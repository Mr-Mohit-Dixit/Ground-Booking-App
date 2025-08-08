using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Slots
{
    public int SlotId { get; set; }

    public TimeOnly SlotTime { get; set; }
}
