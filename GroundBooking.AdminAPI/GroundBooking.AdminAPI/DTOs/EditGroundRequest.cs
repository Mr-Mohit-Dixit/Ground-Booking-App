namespace GroundBooking.AdminAPI.DTOs
{
    public class EditGroundRequest
    {
        public string GName { get; set; }
        public string GDescription { get; set; }
        public string Address { get; set; }
        public decimal GPrice { get; set; }
        public string GStatus { get; set; }  // "Active" or "Inactive"
        public int CId { get; set; }         // Category ID
    }
}
