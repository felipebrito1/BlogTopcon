using BlogTopcon.API.DTOs;
using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;

namespace BlogTopcon.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        private readonly ILogger<PostController> _logger;

        public PostController(ILogger<PostController> logger, IPostService postService)
        {
            _logger = logger;
            _postService = postService;
        }

        // Retornar todos os posts

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> Get()
        {
            var posts = await _postService.GetAllAsync(GetUserId());
            var postsDtos = posts.Select(post => new PostDto(post));
            return Ok(postsDtos);
        }

        // Incluir um novo post
        [HttpPost]
        public async Task<ActionResult<PostDto>> Create([FromBody] PostDto newPost)
        {
            if (newPost == null || string.IsNullOrWhiteSpace(newPost.Title) || string.IsNullOrWhiteSpace(newPost.Content))
                return BadRequest("T�tulo e conte�do s�o obrigat�rios.");


            var postParaCriar = new Post(GetUserId(), newPost.Title, newPost.Content);
            await _postService.CreateAsync(postParaCriar);
            _logger.LogInformation("Novo post criado: {@Post}", postParaCriar);

            return CreatedAtAction(nameof(GetById), new { id = postParaCriar.Id }, new PostDto(postParaCriar));
        }

        // Retornar um post espec�fico
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetById(Guid id)
        {
            var post = await _postService.GetAsync(id, GetUserId());

            if (post == null)
                return NotFound("Post n�o encontrado.");

            return Ok(new PostDto(post));
        }

        // Atualizar um post
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] PostDto updatedPost)
        {
            if (updatedPost == null || string.IsNullOrWhiteSpace(updatedPost.Title) || string.IsNullOrWhiteSpace(updatedPost.Content))
                return BadRequest("T�tulo e conte�do s�o obrigat�rios.");

            var postAtualizado = await _postService.UpdateAsync(id, GetUserId(), new Post(updatedPost.Title, updatedPost.Content));
            if (postAtualizado == null)
            {
                return NotFound("Post n�o encontrado.");
            }

            _logger.LogInformation("Post atualizado: {@Post}", postAtualizado);

            return NoContent();
        }

        // Excluir um post
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var postDeletado = await _postService.DeleteAsync(id, GetUserId());

            if (postDeletado == null)
                return NotFound("Post n�o encontrado.");

            _logger.LogInformation("Post removido: {@PostId}", id);

            return NoContent();
        }
        private Guid GetUserId()
        {
            Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userId);
            return userId;
        }
    }
}
