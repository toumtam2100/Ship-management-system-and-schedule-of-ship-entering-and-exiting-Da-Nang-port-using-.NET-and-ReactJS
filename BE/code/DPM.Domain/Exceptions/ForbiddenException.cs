
namespace DPM.Domain.Exceptions
{
    public class ForbiddenException : HttpException
    {
        public ForbiddenException() : base("t:Message.Forbidden", 403, new())
        { }
    }
}
