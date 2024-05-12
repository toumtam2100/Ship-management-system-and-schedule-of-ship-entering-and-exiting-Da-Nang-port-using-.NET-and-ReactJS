using FluentValidation.Results;

namespace DPM.Domain.Exceptions
{
    public class ValidationException : BadRequestException
    {
        public ValidationException() : base("ValidationError") { }

        public ValidationException(IEnumerable<ValidationFailure> failures)
          : this()
        {
            Errors = failures
              .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
              .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }

        public IDictionary<string, string[]> Errors { get; } = new Dictionary<string, string[]>();
    }
}
