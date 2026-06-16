namespace AutoService.DTOs.Order
{
    public class TimeSlotDto
    {
        public string Time { get; set; } = null!;
        public bool Available { get; set; }
    }

    public class SlotsRequest
    {
        public DateTime Date { get; set; }
    }
}
