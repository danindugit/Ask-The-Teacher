using Supabase;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(provider =>
{
    var url = "https://lerenrdkevxavfrctiiz.supabase.co";
    var key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcmVucmRrZXZ4YXZmcmN0aWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY5OTAsImV4cCI6MjA3Njg5Mjk5MH0.EswqHmwUfAeidxx2YFPy32uLIx9cA6enVypfcpAVI3Y";
    var supabase = new Client(url, key);
    supabase.InitializeAsync().Wait();
    return supabase;
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
