using Club.Core.DAL;
using Club.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;


namespace Club.Core.Repositories
{
    public class AuthRepository
    {
        private readonly DBConnection _db;

        public AuthRepository(DBConnection db)
        {
            _db = db;
        }

        public DataTable Register(RegisterDTO obj)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection con = _db.GetConnection())
                {
                    SqlCommand cmd = new SqlCommand("spRegister", con);

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@UserName", obj.UserName);
                    cmd.Parameters.AddWithValue("@Email", obj.Email);
                    cmd.Parameters.AddWithValue("@Password", obj.Password);
                    cmd.Parameters.AddWithValue("@Mobile", obj.Mobile);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt);
                }
            }
            catch
            {
                throw;
            }

            return dt;
        }

        public DataTable Login(LoginDTO obj)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection con = _db.GetConnection())
                {
                    SqlCommand cmd = new SqlCommand("spLogin", con);

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@UserName", obj.UserName);
                    //cmd.Parameters.AddWithValue("@Password", obj.Password);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt);
                }
            }
            catch
            {
                throw;
            }

            return dt;
        }
    }
}
