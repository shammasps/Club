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



    }


}
