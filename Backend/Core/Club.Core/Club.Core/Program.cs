using Club.Core.DAL;
using Club.Core.DTOs;
using Club.Core.Repositories;
using Club.Core.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;
//using Club.Core.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DBConnection>();
builder.Services.AddScoped<AuthRepository>();
builder.Services.AddScoped<ProfileRepository>();
builder.Services.AddScoped<PredictionRepository>();


builder.Services.AddHttpClient();
builder.Services.AddScoped<WorldCupSyncService>();
builder.Services.AddHostedService<MatchBackgroundService>();


//builder.Services.AddScoped<PredictionEmailService>();
builder.Services.AddScoped<ExcelService>();



//builder.Services.Configure<MailSettings>(
//    builder.Configuration.GetSection("MailSettings"));

//builder.Services.AddScoped<MailService>();
//builder.Services.AddHostedService<PredictionEmailBackgroundService>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseSwagger();
//app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAngular");

app.MapControllers();

app.Run();
