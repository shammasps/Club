using Club.Core.DAL;
using Club.Core.DTOs;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Club.Core.Repositories
{
    public class ProfileRepository
    {
        private readonly DBConnection _db;

        public ProfileRepository(DBConnection db)
        {
            _db = db;
        }

        public DataTable GetProfile(int userId)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand("spProfileGet", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserID", userId);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }

        public DataTable UpdateProfile(UpdateProfileDTO obj)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = _db.GetConnection())
            {
                SqlCommand cmd = new SqlCommand("spProfileUpdate", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserID", obj.UserID);

                cmd.Parameters.AddWithValue("@UserName", obj.UserName);

                cmd.Parameters.AddWithValue("@TeamName", obj.TeamName);

                cmd.Parameters.AddWithValue("@ProfileImage", obj.ProfileImage);

                SqlDataAdapter da = new SqlDataAdapter(cmd);

                da.Fill(dt);
            }

            return dt;
        }
    }
}
