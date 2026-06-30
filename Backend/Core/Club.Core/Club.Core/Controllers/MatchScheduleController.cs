using Microsoft.AspNetCore.Mvc;

namespace Club.Core.Controllers
{
    public class MatchScheduleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
