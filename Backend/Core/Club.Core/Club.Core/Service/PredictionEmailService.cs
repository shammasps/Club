using Club.Core.DTOs;
using Microsoft.Extensions.Options;
using Club.Core.Repositories;
using Newtonsoft.Json.Linq;
using System.Globalization;
using TimeZoneConverter;

namespace Club.Core.Service
{
    public class PredictionEmailService
    {

//        private readonly PredictionRepository _repository;
//        private readonly HttpClient _httpClient;
//        private readonly ExcelService _excelService;
//        private readonly MailService _mailService;
//        private readonly MailSettings _mailSettings;

//        public PredictionEmailService(
//            PredictionRepository repository,
//            HttpClient httpClient,
//            ExcelService excelService,
//            MailService mailService,
//            IOptions<MailSettings> mailSettings)
//        {
//            _repository = repository;
//            _httpClient = httpClient;
//            _excelService = excelService;
//            _mailService = mailService;
//            _mailSettings = mailSettings.Value;
//        }

//        private readonly Dictionary<int, string> stadiumTimeZones = new()
//        {
//            {1,"America/Mexico_City"},
//            {2,"America/Mexico_City"},
//            {3,"America/Monterrey"},

//            {4,"America/Chicago"},
//            {5,"America/Chicago"},
//            {6,"America/Chicago"},

//            {7,"America/New_York"},
//            {8,"America/New_York"},
//            {9,"America/New_York"},
//            {10,"America/New_York"},
//            {11,"America/New_York"},

//            {12,"America/Toronto"},

//            {13,"America/Vancouver"},

//            {14,"America/Los_Angeles"},
//            {15,"America/Los_Angeles"},
//            {16,"America/Los_Angeles"}
//        };

//        private DateTime ConvertToIndiaTime(
//            string localDate,
//            int stadiumId)
//        {
//            string zone =
//                stadiumTimeZones.ContainsKey(stadiumId)
//                ? stadiumTimeZones[stadiumId]
//                : "America/New_York";

//            var sourceZone =
//                TZConvert.GetTimeZoneInfo(zone);

//            var indiaZone =
//                TZConvert.GetTimeZoneInfo("Asia/Kolkata");

//            //DateTime stadiumTime =
//            //    DateTime.ParseExact(
//            //        localDate,
//            //        "MM/dd/yyyy HH:mm",
//            //        CultureInfo.InvariantCulture);

//            //return TimeZoneInfo.ConvertTime(
//            //    stadiumTime,
//            //    sourceZone,
//            //    indiaZone);

//            DateTime stadiumTime =
//    DateTime.SpecifyKind(
//        DateTime.ParseExact(
//            localDate,
//            "MM/dd/yyyy HH:mm",
//            CultureInfo.InvariantCulture),
//        DateTimeKind.Unspecified);

//            return TimeZoneInfo.ConvertTime(
//                stadiumTime,
//                sourceZone,
//                indiaZone);
//        }

//        public async Task CheckPredictionEmailAsync()
//        {
//            Console.WriteLine("Checking prediction emails...");

//            var json = await _httpClient.GetStringAsync(
//                "https://worldcup26.ir/get/games");

//            JObject obj = JObject.Parse(json);

//            var games = obj["games"];

//            foreach (var game in games!)
//            {
//                int matchId =
//                    Convert.ToInt32(game["id"]);

//                int stadiumId =
//                    Convert.ToInt32(game["stadium_id"]);

//                DateTime kickoff =
//                    ConvertToIndiaTime(
//                        game["local_date"]!.ToString(),
//                        stadiumId);

//                //Console.WriteLine(
//                //    $"Match {matchId} Kickoff : {kickoff:dd-MMM-yyyy hh:mm tt}");


//                Console.WriteLine();
//                Console.WriteLine("==============================================================");
//                Console.WriteLine($"Match ID          : {matchId}");
//                //Console.WriteLine($"Match             : {homeTeam} vs {awayTeam}");
//                Console.WriteLine($"Stadium ID        : {stadiumId}");
//                //Console.WriteLine($"API Local Time    : {apiTime}");
//                Console.WriteLine($"India Time (IST)  : {kickoff:dd-MMM-yyyy hh:mm:ss tt}");
//                Console.WriteLine($"Current Time IST  : {DateTime.Now:dd-MMM-yyyy hh:mm:ss tt}");
//                Console.WriteLine($"Minutes Remaining : {(kickoff - DateTime.Now).TotalMinutes:F2}");
//                Console.WriteLine($"Match Started     : {DateTime.Now >= kickoff}");
//                Console.WriteLine("==============================================================");
//                Console.WriteLine();

//                // Match not started yet
//                if (DateTime.Now < kickoff)
//                {
//                    Console.WriteLine(
//                        $"Waiting... Match {matchId} has not started yet.");
//                    continue;
//                }

//                // Already emailed?
//                if (_repository.IsPredictionEmailSent(matchId))
//                {
//                    Console.WriteLine(
//                        $"Prediction report already sent for Match {matchId}");
                    

//                    continue;
//                }

//                // Get Predictions
//                List<PredictionEmailDTO> predictions =
//                    _repository.GetPredictionReportList(matchId);

//                if (predictions.Count == 0)
//                {
//                    Console.WriteLine(
//                        $"No predictions found for Match {matchId}");

//                    continue;
//                }

//                string excelFile = "";

//                try
//                {
//                    // Generate Excel
//                    excelFile =
//                        _excelService.GeneratePredictionExcel(predictions);

//                    Console.WriteLine(
//                        $"Excel Generated : {excelFile}");

//                    string subject =
//                        $"Prediction Report - {predictions.First().HomeTeam} vs {predictions.First().AwayTeam}";

//                    string body =
//        $@"
//<h2>FIFA World Cup 2026 Prediction Report</h2>

//<p>
//The match has started successfully.
//</p>

//<table border='1'
//       cellpadding='8'
//       cellspacing='0'
//       style='border-collapse:collapse;'>

//<tr>
//    <td><b>Match</b></td>
//    <td>{predictions.First().HomeTeam} vs {predictions.First().AwayTeam}</td>
//</tr>

//<tr>
//    <td><b>Match Type</b></td>
//    <td>{predictions.First().MatchType}</td>
//</tr>

//<tr>
//    <td><b>Kick Off (IST)</b></td>
//    <td>{kickoff:dd-MMM-yyyy hh:mm tt}</td>
//</tr>

//<tr>
//    <td><b>Total Predictions</b></td>
//    <td>{predictions.Count}</td>
//</tr>

//</table>

//<br/>

//<p>
//Please find the attached Excel file containing all user predictions.
//</p>

//<br/>

//<b>This email was generated automatically by the FIFA World Cup Predictor System.</b>
//";

//                    Console.WriteLine(
//                        $"Sending Email ({predictions.Count} predictions)...");

//                    await _mailService.SendPredictionReportAsync(
//                        _mailSettings.AdminEmail,
//                        subject,
//                        body,
//                        excelFile);

//                    Console.WriteLine("Email Sent Successfully.");

//                    _repository.MarkPredictionEmailSent(matchId);

//                    Console.WriteLine(
//                        $"Database Updated : Match {matchId}");
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine(
//                        $"Mail Error : {ex.Message}");
//                }
//                finally
//                {
//                    if (!string.IsNullOrWhiteSpace(excelFile) &&
//                        File.Exists(excelFile))
//                    {
//                        try
//                        {
//                            File.Delete(excelFile);

//                            Console.WriteLine(
//                                "Temporary Excel Deleted.");
//                        }
//                        catch (Exception ex)
//                        {
//                            Console.WriteLine(
//                                $"Unable to delete Excel : {ex.Message}");
//                        }
//                    }
//                }
//            }

//            Console.WriteLine(
//                "Prediction Email Check Finished.");
//        }

    }
}
