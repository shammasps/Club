using Microsoft.Extensions.Hosting;
using Club.Core.Service;

namespace Club.Core.Service
{
    public class MatchBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public MatchBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        //protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        //{
        //    while (!stoppingToken.IsCancellationRequested)
        //    {
        //        using (var scope = _serviceProvider.CreateScope())
        //        {
        //            var syncService =
        //                scope.ServiceProvider.GetRequiredService<WorldCupSyncService>();

        //            await syncService.SyncFinishedMatches();
        //        }

        //        // Run every 5 minutes
        //        await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        //    }
        //}

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    Console.WriteLine($"Checking matches : {DateTime.Now}");

                    using var scope = _serviceProvider.CreateScope();

                    var syncService =
                        scope.ServiceProvider.GetRequiredService<WorldCupSyncService>();

                    await syncService.SyncFinishedMatches();

                    Console.WriteLine("Finished checking.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }


    }
}
