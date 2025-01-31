using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BlogTopcon.API.Controllers
{
    public class TopconBaseController : ControllerBase
    {
        protected Guid GetUserId()
        {
            Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userId);
            return userId;
        }
    }
}
