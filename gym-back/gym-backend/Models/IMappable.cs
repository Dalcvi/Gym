namespace GymApi.Models
{
    public interface IMappable<DTO>
    {
        public DTO MapToDto();
    }
}
