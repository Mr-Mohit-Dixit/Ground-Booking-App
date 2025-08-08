namespace GroundBooking.AdminAPI.DTOs
{
    public class GroundApprovalDto
    {
        public int GId { get; set; }
        public string GroundName { get; set; }
        public string OwnerName { get; set; }
        public string City { get; set; }
        public bool IsApproved { get; set; }
    }
}
