using System;
using System.Collections.Generic;

namespace GroundBooking.AdminAPI.Models;

public partial class Queryanswer
{
    public int QaId { get; set; }

    public int QId { get; set; }

    public int UId { get; set; }

    public string QaAnsText { get; set; } = null!;

    public DateTime? QaAnsDateTime { get; set; }

    public virtual Queries QIdNavigation { get; set; } = null!;

    public virtual Users UIdNavigation { get; set; } = null!;
}
