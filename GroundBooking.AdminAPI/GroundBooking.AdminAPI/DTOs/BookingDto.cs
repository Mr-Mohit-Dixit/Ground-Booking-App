namespace GroundBooking.AdminAPI.DTOs
{
    public class BookingDto
    {
        public int BId { get; set; }
        public string UserName { get; set; }
        public string GroundName { get; set; }
        public string City { get; set; }
        public string Sport { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan TimeFrom { get; set; }
        public TimeSpan TimeTo { get; set; }
        public decimal Amount { get; set; }
    }
}
