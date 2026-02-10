namespace Cinema.Application.Common.Exceptions
{
    [Serializable]
    public class EntityNotFoundException : Exception
    {
        private string v;
        private int newTypeId;

        public EntityNotFoundException()
        {
        }

        public EntityNotFoundException(string? message) : base(message)
        {
        }

        public EntityNotFoundException(string v, int newTypeId)
            :base($"Entity '{v}' with ID '{newTypeId}' was not found.")
        {
            this.v = v;
            this.newTypeId = newTypeId;
        }

        public EntityNotFoundException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}