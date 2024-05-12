namespace DPM.Domain.Exceptions
{
    public class ConflictException : HttpException
    {
        public ConflictException(string name) : base("t:Message.AlreadyExists", 409, new() { { "name", $"t:Subject.{name}" }, })
        { }
    }
}
