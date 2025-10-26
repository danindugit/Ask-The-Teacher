using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;
using System.Text.Json.Serialization;

namespace AskTheTeacher.Models
{
    [Table("questions")]
    public class Question : BaseModel
    {
        [PrimaryKey("id", false)]
        [JsonIgnore]
        public int Id { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("studentID")]
        public int StudentID { get; set; }
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("question")]
        public string QuestionText { get; set; } = string.Empty;
    }
}