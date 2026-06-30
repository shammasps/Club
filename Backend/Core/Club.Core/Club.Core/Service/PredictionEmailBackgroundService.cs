using Microsoft.Extensions.Hosting;

namespace Club.Core.Service
{
    public class PredictionEmailBackgroundService 
        //: BackgroundService
    {
        //private readonly IServiceProvider _serviceProvider;

        //public PredictionEmailBackgroundService(
        //    IServiceProvider serviceProvider)
        //{
        //    _serviceProvider = serviceProvider;
        //}

        //protected override async Task ExecuteAsync(
        //    CancellationToken stoppingToken)
        //{
        //    while (!stoppingToken.IsCancellationRequested)
        //    {
        //        try
        //        {
        //            Console.WriteLine(
        //                $"Checking Prediction Emails : {DateTime.Now}");

        //            using var scope =
        //                _serviceProvider.CreateScope();

        //            var emailService =
        //                scope.ServiceProvider
        //                .GetRequiredService<PredictionEmailService>();

        //            await emailService
        //                .CheckPredictionEmailAsync();

        //            Console.WriteLine(
        //                "Prediction Email Check Completed.");
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine(
        //                $"Prediction Email Error : {ex.Message}");
        //        }

        //        // Check every 1 minute
        //        await Task.Delay(
        //            TimeSpan.FromMinutes(1),
        //            stoppingToken);
        //    }
        //}
    }
}