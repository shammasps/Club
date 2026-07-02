using Club.Core.DAL;
using Club.Core.DTOs;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Club.Core.Repositories
{
    public class PredictionRepository
    {
        private readonly DBConnection _db;

        public PredictionRepository(DBConnection db)
        {
            _db = db;
        }

        public DataTable SavePrediction(PredictionDTO obj)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand("spPredictionAddUpdate", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserID", obj.UserID);

                cmd.Parameters.AddWithValue("@MatchID", obj.MatchID);

                cmd.Parameters.AddWithValue("@HomeTeam", obj.HomeTeam);

                cmd.Parameters.AddWithValue("@AwayTeam", obj.AwayTeam);

                cmd.Parameters.AddWithValue("@HomeScore", obj.HomeScore);

                cmd.Parameters.AddWithValue("@AwayScore", obj.AwayScore);

                cmd.Parameters.AddWithValue("@HomePenalty", obj.HomePenalty);

                cmd.Parameters.AddWithValue("@AwayPenalty", obj.AwayPenalty);

                cmd.Parameters.AddWithValue("@Winner", obj.Winner);

                cmd.Parameters.AddWithValue("@MatchDate", obj.MatchDate);

                cmd.Parameters.AddWithValue("@MatchType", obj.MatchType);

                cmd.Parameters.AddWithValue("@Finished", obj.Finished);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }

        public DataTable GetPredictions(int userId)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand(
                    "spPredictionGetByUser",
                    con
                );

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserID", userId);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }

        public DataTable CalculatePredictionPoints(PredictionPointDTO obj)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand("spCalculatePredictionPoints", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@MatchID", obj.MatchID);

                cmd.Parameters.AddWithValue("@HomeScore", obj.HomeScore);

                cmd.Parameters.AddWithValue("@AwayScore", obj.AwayScore);

                cmd.Parameters.AddWithValue("@HomePenalty", obj.HomePenalty);

                cmd.Parameters.AddWithValue("@AwayPenalty", obj.AwayPenalty);

                cmd.Parameters.AddWithValue("@Winner", obj.Winner);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }


        public DataTable GetLeaderboard()
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand("spLeaderboardGet", con);

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }





        //Email sent logic

        public DataTable GetPredictionReport(int matchId)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd =
                    new SqlCommand(
                        "spPredictionGetByMatch",
                        con);

                cmd.CommandType =
                    CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue(
                    "@MatchID",
                    matchId);

                SqlDataAdapter da =
                    new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }



        //public bool IsPredictionEmailSent(int matchId)
        //{
        //    using (SqlConnection con = _db.GetConnection())
        //    {
        //        SqlCommand cmd =
        //            new SqlCommand(
        //                "spPredictionEmailStatus",
        //                con);

        //        cmd.CommandType =
        //            CommandType.StoredProcedure;

        //        cmd.Parameters.AddWithValue(
        //            "@MatchID",
        //            matchId);

        //        con.Open();

        //        var result = cmd.ExecuteScalar();

        //        return result != null &&
        //               Convert.ToBoolean(result);
        //    }
        //}



        //public void MarkPredictionEmailSent(int matchId)
        //{
        //    using (SqlConnection con = _db.GetConnection())
        //    {
        //        SqlCommand cmd =
        //            new SqlCommand(
        //                "spPredictionEmailSent",
        //                con);

        //        cmd.CommandType =
        //            CommandType.StoredProcedure;

        //        cmd.Parameters.AddWithValue(
        //            "@MatchID",
        //            matchId);

        //        con.Open();

        //        cmd.ExecuteNonQuery();
        //    }
        //}

        public List<PredictionEmailDTO> GetPredictionReportList(int matchId)
        {
            DataTable dt = GetPredictionReport(matchId);

            List<PredictionEmailDTO> list = new();

            foreach (DataRow row in dt.Rows)
            {
                list.Add(new PredictionEmailDTO
                {
                    PredictionID = row["PredictionID"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["PredictionID"]),

                    UserID = row["UserID"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["UserID"]),

                    UserName = row["UserName"] == DBNull.Value
                        ? ""
                        : row["UserName"].ToString()!,

                    Email = row["Email"] == DBNull.Value
                        ? ""
                        : row["Email"].ToString()!,

                    MatchID = row["MatchID"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["MatchID"]),

                    HomeTeam = row["HomeTeam"] == DBNull.Value
                        ? ""
                        : row["HomeTeam"].ToString()!,

                    AwayTeam = row["AwayTeam"] == DBNull.Value
                        ? ""
                        : row["AwayTeam"].ToString()!,

                    HomeScore = row["HomeScore"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["HomeScore"]),

                    AwayScore = row["AwayScore"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["AwayScore"]),

                    HomePenalty = row["HomePenalty"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["HomePenalty"]),

                    AwayPenalty = row["AwayPenalty"] == DBNull.Value
                        ? 0
                        : Convert.ToInt32(row["AwayPenalty"]),

                    Winner = row["Winner"] == DBNull.Value
                        ? ""
                        : row["Winner"].ToString()!,

                    MatchDate = row["MatchDate"] == DBNull.Value
                        ? ""
                        : row["MatchDate"].ToString()!,

                    MatchType = row["MatchType"] == DBNull.Value
                        ? ""
                        : row["MatchType"].ToString()!,

                    CreatedDate = row["CreatedDate"] == DBNull.Value
                        ? DateTime.MinValue
                        : Convert.ToDateTime(row["CreatedDate"])
                });
            }

            return list;
        }





        public void SaveMatchSchedule(
    MatchScheduleDTO obj)
        {
            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd =
                    new SqlCommand(
                        "spMatchScheduleSave",
                        con);

                cmd.CommandType =
                    CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue(
                    "@MatchID",
                    obj.MatchID);

                cmd.Parameters.AddWithValue(
                    "@HomeTeam",
                    obj.HomeTeam);

                cmd.Parameters.AddWithValue(
                    "@AwayTeam",
                    obj.AwayTeam);

                cmd.Parameters.AddWithValue(
                    "@MatchDate",
                    obj.MatchDate);

                cmd.Parameters.AddWithValue(
                    "@MatchType",
                    obj.MatchType);

                con.Open();

                cmd.ExecuteNonQuery();
            }
        }



        public List<StartedMatchDTO> GetStartedMatches()
        {
            DataTable dt = new();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd =
                    new SqlCommand(
                        "spGetStartedMatches",
                        con);

                cmd.CommandType =
                    CommandType.StoredProcedure;

                SqlDataAdapter da =
                    new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            List<StartedMatchDTO> list =
                new();

            foreach (DataRow row in dt.Rows)
            {
                list.Add(new StartedMatchDTO
                {
                    MatchID =
                        Convert.ToInt32(row["MatchID"]),

                    HomeTeam =
                        row["HomeTeam"].ToString() ?? "",

                    AwayTeam =
                        row["AwayTeam"].ToString() ?? "",

                    MatchDate =
                        Convert.ToDateTime(row["MatchDate"]),

                    MatchType =
                        row["MatchType"].ToString() ?? "",

                    PredictionCount =
                        Convert.ToInt32(row["PredictionCount"])
                });
            }

            return list;
        }


    }
}
