using Club.Core.DTOs;
using Club.Core.Repositories;
using Club.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Club.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

  
    public class PredictionController : ControllerBase
    {
        private readonly PredictionRepository _predictionRepository;

        private readonly WorldCupSyncService _syncService;

        public PredictionController(PredictionRepository predictionRepository, WorldCupSyncService syncService)
        {
            _predictionRepository = predictionRepository;

            _syncService = syncService;
        }

        [HttpPost]
        [Route("SavePrediction")]
        public IActionResult SavePrediction([FromBody] PredictionDTO obj)
        {
            DataTable dt = _predictionRepository.SavePrediction(obj);

            if (dt.Rows.Count > 0)
            {
                return Ok(new
                {
                    Status = Convert.ToInt32(dt.Rows[0]["Status"]),
                    Message = dt.Rows[0]["Message"].ToString()
                });
            }

            return BadRequest(new
            {
                Status = 0,
                Message = "Prediction Save Failed"
            });
        }

        [HttpGet("GetPredictions/{userId}")]
        public IActionResult GetPredictions(int userId)
        {
            try
            {
                DataTable dt = _predictionRepository.GetPredictions(userId);

                if (dt.Rows.Count == 0)
                {
                    return Ok(new
                    {
                        Success = false,
                        Message = "No Predictions Found",
                        Predictions = new List<PredictionDTO>()
                    });
                }

                List<PredictionDTO> predictions = new();

                foreach (DataRow row in dt.Rows)
                {
                    predictions.Add(new PredictionDTO
                    {
                        PredictionID = Convert.ToInt32(row["PredictionID"]),
                        UserID = Convert.ToInt32(row["UserID"]),
                        MatchID = Convert.ToInt32(row["MatchID"]),

                        HomeTeam = row["HomeTeam"].ToString() ?? "",

                        AwayTeam = row["AwayTeam"].ToString() ?? "",

                        HomeScore = Convert.ToInt32(row["HomeScore"]),

                        AwayScore = Convert.ToInt32(row["AwayScore"]),

                        Winner = row["Winner"].ToString() ?? "",

                        MatchDate = row["MatchDate"].ToString() ?? "",

                        MatchType = row["MatchType"].ToString() ?? "",

                        Finished = row["Finished"].ToString() ?? "",

                        CreatedDate = Convert.ToDateTime(row["CreatedDate"]),

                        UpdatedDate = row["UpdatedDate"] == DBNull.Value
                            ? null
                            : Convert.ToDateTime(row["UpdatedDate"])
                    });
                }

                return Ok(new
                {
                    Success = true,
                    Message = "Predictions Loaded Successfully",
                    Predictions = predictions
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost]
        [Route("CalculatePredictionPoints")]
        public IActionResult CalculatePredictionPoints([FromBody] PredictionPointDTO obj)
        {
            try
            {
                DataTable dt =
                    _predictionRepository.CalculatePredictionPoints(obj);

                return Ok(new
                {
                    Success = true,
                    Message = "Prediction points calculated successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("SyncFinishedMatches")]
        public async Task<IActionResult> SyncFinishedMatches()
        {
            try
            {
                await _syncService.SyncFinishedMatches();

                return Ok(new
                {
                    Success = true,
                    Message = "Finished matches synchronized successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }



        [HttpGet("GetLeaderboard")]
        public IActionResult GetLeaderboard()
        {
            try
            {
                DataTable dt = _predictionRepository.GetLeaderboard();

                if (dt.Rows.Count == 0)
                {
                    return Ok(new
                    {
                        Success = false,
                        Message = "No Leaderboard Data Found",
                        Leaderboard = new List<LeaderboardDTO>()
                    });
                }

                List<LeaderboardDTO> leaderboard = new();

                foreach (DataRow row in dt.Rows)
                {
                    leaderboard.Add(new LeaderboardDTO
                    {
                        Rank = Convert.ToInt32(row["Rank"]),

                        UserID = Convert.ToInt32(row["UserID"]),

                        UserName = row["UserName"].ToString() ?? "",

                        TotalPoints = Convert.ToInt32(row["TotalPoints"]),

                        CorrectPrediction = Convert.ToInt32(row["CorrectPrediction"]),

                        WrongPrediction = Convert.ToInt32(row["WrongPrediction"])
                    });
                }

                return Ok(new
                {
                    Success = true,
                    Message = "Leaderboard Loaded Successfully",
                    Leaderboard = leaderboard
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }




    }
}
