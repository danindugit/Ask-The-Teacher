using Microsoft.AspNetCore.Mvc;
using Supabase;
using AskTheTeacher.Models;
using AskTheTeacher.DTOs;

namespace AskTheTeacher.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly Client _supabase;

        public QuestionsController(Client supabase)
        {
            _supabase = supabase;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<IActionResult> GetQuestions()
        {
            var response = await _supabase.From<Question>().Get();
            var questions = response.Models
                .Select(q => new QuestionDto
                {
                    Id = q.Id,
                    CreatedAt = q.CreatedAt,
                    StudentId = q.StudentID,
                    title = q.Title,
                    Text = q.QuestionText
                })
                .ToList();

            return Ok(questions);
        }
    }
}