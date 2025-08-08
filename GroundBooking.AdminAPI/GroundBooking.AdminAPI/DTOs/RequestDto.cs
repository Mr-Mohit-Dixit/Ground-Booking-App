namespace GroundBooking.AdminAPI.DTOs
{
    public class RequestDto
    {
        public int RqId { get; set; }
        public string GroundName { get; set; }
        public string SportName { get; set; }
        public string UserName { get; set; }
        public DateTime? RequestDateTime { get; set; }
        public string Status { get; set; }
    }

}
