namespace GymApi.Dtos
{
    public record CreateBookingDto(DateTime DateFrom, DateTime DateTo, string ClientId, string TrainerId);
    public record UpdateBookingDto(DateTime DateFrom, DateTime DateTo);
}
