namespace Cinema.Application.Common.Exceptions
{
    [Serializable]
    public class ProtectedEntityException : Exception
    {
        private string v;
        private int typeIdToDelete;

        public ProtectedEntityException()
        {
        }

        public ProtectedEntityException(string? message) : base(message)
        {
        }

        public ProtectedEntityException(string v, int typeIdToDelete)
            : base($"Entity '{v}' with ID '{typeIdToDelete}' cannot be deleted because it is protected.")
        {
            this.v = v;
            this.typeIdToDelete = typeIdToDelete;
        }

        public ProtectedEntityException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}