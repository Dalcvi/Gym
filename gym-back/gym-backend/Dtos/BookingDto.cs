namespace GymApi.Dtos
{
    public record BookingDto(UserDto Client, UserDto Trainer, DateTime DateFrom, DateTime DateTo, int Id);
    public record CreateBookingDto(DateTime DateFrom, DateTime DateTo, string ClientId, string TrainerId);
    public record UpdateBookingDto(DateTime DateFrom, DateTime DateTo);
}
