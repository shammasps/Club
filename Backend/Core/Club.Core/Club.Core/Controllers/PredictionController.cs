using Club.Core.DTOs;
using Club.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Club.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredictionController : ControllerBase
    {
        private readonly PredictionRepository _predictionRepository;

        public PredictionController(PredictionRepository predictionRepository)
        {
            _predictionRepository = predictionRepository;
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
    }
}
