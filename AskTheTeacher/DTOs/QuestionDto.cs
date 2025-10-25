namespace AskTheTeacher.DTOs
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int StudentId { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
