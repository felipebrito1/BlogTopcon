using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BlogTopcon.API.Controllers
{
    public class TopconBaseController : ControllerBase
    {
        protected Guid GetUserAuthId()
        {
            Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userAuthId);
            return userAuthId;
        }
    }
}
