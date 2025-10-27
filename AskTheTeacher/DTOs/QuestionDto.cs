namespace AskTheTeacher.DTOs
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string StudentId { get; set; } = string.Empty;
        public string title{ get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
    }
}
