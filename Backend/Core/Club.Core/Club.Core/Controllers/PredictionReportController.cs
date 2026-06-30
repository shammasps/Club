using Club.Core.DTOs;
using Club.Core.Repositories;
using Club.Core.Service;
using Microsoft.AspNetCore.Mvc;

namespace Club.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredictionReportController : ControllerBase
    {
        private readonly PredictionRepository _repository;
        private readonly ExcelService _excelService;

        public PredictionReportController(
            PredictionRepository repository,
            ExcelService excelService)
        {
            _repository = repository;
            _excelService = excelService;
        }

        //---------------------------------------------------------
        // GET STARTED MATCHES
        //---------------------------------------------------------

        [HttpGet("GetStartedMatches")]
        public IActionResult GetStartedMatches()
        {
            try
            {
                List<StartedMatchDTO> list =
                    _repository.GetStartedMatches();

                return Ok(new
                {
                    Success = true,
                    Message = "Started Matches Loaded Successfully",
                    Matches = list
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

        //---------------------------------------------------------
        // DOWNLOAD EXCEL
        //---------------------------------------------------------

        [HttpGet("DownloadExcel/{matchId}")]
        public IActionResult DownloadExcel(int matchId)
        {
            try
            {
                List<PredictionEmailDTO> predictions =
                    _repository.GetPredictionReportList(matchId);

                if (predictions.Count == 0)
                {
                    return BadRequest(new
                    {
                        Success = false,
                        Message = "No Predictions Found"
                    });
                }

                string filePath =
                    _excelService.GeneratePredictionExcel(predictions);

                byte[] fileBytes =
                    System.IO.File.ReadAllBytes(filePath);

                string fileName =
                    Path.GetFileName(filePath);

                return File(
                    fileBytes,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileName);
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