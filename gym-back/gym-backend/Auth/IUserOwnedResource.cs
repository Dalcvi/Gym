namespace GymApi.Auth
{
    public interface IUserOwnedResource
    {
        public string UserId { get; set; }
        public string ClientId { get; set; }
        public string TrainerId { get; set; }
    }
}
