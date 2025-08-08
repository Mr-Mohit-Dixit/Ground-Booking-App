using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Request
{
    public int RqId { get; set; }

    public int UId { get; set; }

    public int GId { get; set; }

    public DateTime? RqDateTime { get; set; }

    public string? RqStatus { get; set; }

    public virtual Ground GIdNavigation { get; set; } = null!;

    public virtual Users UIdNavigation { get; set; } = null!;
}
