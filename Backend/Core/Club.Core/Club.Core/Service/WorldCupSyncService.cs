using Club.Core.DTOs;
using Club.Core.Repositories;
using Newtonsoft.Json.Linq;

namespace Club.Core.Service
{
    public class WorldCupSyncService
    {

        private readonly PredictionRepository _repository;
        private readonly HttpClient _httpClient;

        public WorldCupSyncService(
            PredictionRepository repository,
            HttpClient httpClient)
        {
            _repository = repository;
            _httpClient = httpClient;
        }

        public async Task SyncFinishedMatches()
        {
            Console.WriteLine("Downloading matches...");

            var json = await _httpClient.GetStringAsync(
                "https://worldcup26.ir/get/games");

            JObject obj = JObject.Parse(json);

            var games = obj["games"];

            foreach (var game in games!)
            {
                if (game["finished"]?.ToString() != "TRUE")
                    continue;

                Console.WriteLine(
                    $"Processing Match {game["id"]}");

                int homeScore =
                    Convert.ToInt32(game["home_score"]);

                int awayScore =
                    Convert.ToInt32(game["away_score"]);

                string winner = "Draw";

                if (homeScore > awayScore)
                    winner = game["home_team_name_en"]!.ToString();

                else if (awayScore > homeScore)
                    winner = game["away_team_name_en"]!.ToString();

                PredictionPointDTO dto = new PredictionPointDTO
                {
                    MatchID = Convert.ToInt32(game["id"]),
                    HomeScore = homeScore,
                    AwayScore = awayScore,
                    Winner = winner
                };

                _repository.CalculatePredictionPoints(dto);

                Console.WriteLine($"Updated Match {dto.MatchID}");
            }

            Console.WriteLine("Sync Complete.");
        }


    }
}
