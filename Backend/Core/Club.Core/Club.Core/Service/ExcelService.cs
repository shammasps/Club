using ClosedXML.Excel;
using Club.Core.DTOs;

namespace Club.Core.Service
{
    public class ExcelService
    {

        public string GeneratePredictionExcel(
            List<PredictionEmailDTO> predictions)
        {
            if (predictions.Count == 0)
                return "";

            string folder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "PredictionReports");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string fileName =
                $"{predictions.First().HomeTeam}_vs_{predictions.First().AwayTeam}_{DateTime.Now:yyyyMMddHHmmss}.xlsx";

            string filePath =
                Path.Combine(folder, fileName);

            using (var workbook = new XLWorkbook())
            {
                var ws =
                    workbook.Worksheets.Add("Predictions");

                ws.Cell(1, 1).Value = "Prediction Report";

                ws.Range(1, 1, 1, 10).Merge();

                ws.Cell(1, 1).Style.Font.Bold = true;

                ws.Cell(1, 1).Style.Font.FontSize = 18;

                ws.Cell(1, 1).Style.Alignment.Horizontal =
                    XLAlignmentHorizontalValues.Center;

                ws.Cell(3, 1).Value = "Home Team";
                ws.Cell(3, 2).Value = predictions.First().HomeTeam;

                ws.Cell(4, 1).Value = "Away Team";
                ws.Cell(4, 2).Value = predictions.First().AwayTeam;

                ws.Cell(5, 1).Value = "Match";
                ws.Cell(5, 2).Value =
                    $"{predictions.First().HomeTeam} vs {predictions.First().AwayTeam}";

                ws.Cell(6, 1).Value = "Match Date";
                ws.Cell(6, 2).Value =
                    predictions.First().MatchDate;

                int row = 8;

                ws.Cell(row, 1).Value = "User";

                ws.Cell(row, 2).Value = "Email";

                ws.Cell(row, 3).Value = "Home";

                ws.Cell(row, 4).Value = "Away";

                ws.Cell(row, 5).Value = "Home Score";

                ws.Cell(row, 6).Value = "Away Score";

                ws.Cell(row, 7).Value = "Home Penalty";

                ws.Cell(row, 8).Value = "Away Penalty";

                ws.Cell(row, 9).Value = "Winner";

                ws.Cell(row, 10).Value = "Prediction Time";

                ws.Range(row, 1, row, 10)
                    .Style.Font.Bold = true;

                ws.Range(row, 1, row, 10)
                    .Style.Fill.BackgroundColor =
                    XLColor.DarkBlue;

                ws.Range(row, 1, row, 10)
                    .Style.Font.FontColor =
                    XLColor.White;

                row++;

                foreach (var item in predictions)
                {
                    ws.Cell(row, 1).Value = item.UserName;

                    ws.Cell(row, 2).Value = item.Email;

                    ws.Cell(row, 3).Value = item.HomeTeam;

                    ws.Cell(row, 4).Value = item.AwayTeam;

                    ws.Cell(row, 5).Value = item.HomeScore;

                    ws.Cell(row, 6).Value = item.AwayScore;

                    ws.Cell(row, 7).Value = item.HomePenalty;

                    ws.Cell(row, 8).Value = item.AwayPenalty;

                    ws.Cell(row, 9).Value = item.Winner;

                    ws.Cell(row, 10).Value =
                        item.CreatedDate.ToString(
                            "dd-MMM-yyyy hh:mm tt");

                    row++;
                }

                ws.Columns().AdjustToContents();

                ws.Range(8, 1, row - 1, 10)
                    .Style.Border.OutsideBorder =
                    XLBorderStyleValues.Thin;

                ws.Range(8, 1, row - 1, 10)
                    .Style.Border.InsideBorder =
                    XLBorderStyleValues.Thin;

                workbook.SaveAs(filePath);
            }

            return filePath;
        }

    }
}
