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

        // GET: api/questions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestionById(int id)
        {
            var response = await _supabase.From<Question>()
                .Where(q => q.Id == id)
                .Get();

            var question = response.Models.FirstOrDefault();

            if (question == null)
                return NotFound();

            var questionDto = new QuestionDto
            {
                Id = question.Id,
                CreatedAt = question.CreatedAt,
                StudentId = question.StudentID,
                title = question.Title,
                Text = question.QuestionText
            };

            return Ok(questionDto);
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> CreateQuestion(QuestionDto questionDto)
        {
            var newQuestion = new Question
            {
                CreatedAt = DateTime.UtcNow,
                StudentID = questionDto.StudentId,
                Title = questionDto.title,
                QuestionText = questionDto.Text,
            };

            var response = await _supabase.From<Question>().Insert(newQuestion);

            var createdQuestion = response.Models.First();
            if (createdQuestion == null)
                return BadRequest("Failed to create question.");

            var createdQuestionDto = new QuestionDto
            {
                Id = createdQuestion.Id,
                CreatedAt = createdQuestion.CreatedAt,
                StudentId = createdQuestion.StudentID,
                title = createdQuestion.Title,
                Text = createdQuestion.QuestionText
            };

            return Ok(createdQuestionDto);
        }

        // PUT: api/Questions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, QuestionDto questionDto)
        {
            var existingReponse = await _supabase.From<Question>()
                .Where(q => q.Id == id)
                .Get();

            var existingQuestion = existingReponse.Models.FirstOrDefault();
            if (existingQuestion == null)
                return NotFound();

            // Update fields
            existingQuestion.Title = questionDto.title;
            existingQuestion.QuestionText = questionDto.Text;

            await _supabase.From<Question>().Update(existingQuestion);

            var updatedResponse = await _supabase.From<Question>()
                .Where(q => q.Id == id)
                .Get();

            existingQuestion = updatedResponse.Models.FirstOrDefault();
            if (existingQuestion == null)
                return BadRequest("Failed to update question.");

            var updatedQuestionDto = new QuestionDto
            {
                Id = existingQuestion.Id,
                CreatedAt = existingQuestion.CreatedAt,
                StudentId = existingQuestion.StudentID,
                title = existingQuestion.Title,
                Text = existingQuestion.QuestionText
            };

            return Ok(updatedQuestionDto);
        }

        // DELETE: api/Questions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var response = await _supabase.From<Question>()
                .Where(q => q.Id == id)
                .Get();

            var question = response.Models.FirstOrDefault();
            if (question == null)
                return NotFound();

            await _supabase.From<Question>().Delete(question);
            return NoContent();
        }
    }
}