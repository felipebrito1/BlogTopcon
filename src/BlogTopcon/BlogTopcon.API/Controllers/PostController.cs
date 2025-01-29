using BlogTopcon.API.DTOs;
using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogTopcon.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            var postsDtos = await _postService.GetAllAsync();
            return Ok(postsDtos);
        }

        // Incluir um novo post
        [HttpPost]
        public async Task<ActionResult<PostDto>> Create([FromBody] PostDto newPost)
        {
            if (newPost == null || string.IsNullOrWhiteSpace(newPost.Title) || string.IsNullOrWhiteSpace(newPost.Content))
                return BadRequest("Título e conteúdo são obrigatórios.");

            var postParaCriar = new Post(newPost.Title, newPost.Content);
            await _postService.CreateAsync(postParaCriar);
            _logger.LogInformation("Novo post criado: {@Post}", postParaCriar);

            return CreatedAtAction(nameof(GetById), new { id = postParaCriar.Id }, postParaCriar);
        }

        // Retornar um post específico
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetById(Guid id)
        {
            var post = await _postService.GetAsync(id);

            if (post == null)
                return NotFound("Post não encontrado.");

            return Ok(post);
        }

        // Atualizar um post
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] PostDto updatedPost)
        {
            if (updatedPost == null || string.IsNullOrWhiteSpace(updatedPost.Title) || string.IsNullOrWhiteSpace(updatedPost.Content))
            {
                return BadRequest("Título e conteúdo são obrigatórios.");
            }

            var postAtualizado = await _postService.UpdateAsync(id, new Post(updatedPost.Title, updatedPost.Content));
            if (postAtualizado == null)
            {
                return NotFound("Post não encontrado.");
            }

            _logger.LogInformation("Post atualizado: {@Post}", postAtualizado);

            return NoContent();
        }

        // Excluir um post
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var postDeletado = await _postService.DeleteAsync(id);

            if (postDeletado == null)
                return NotFound("Post não encontrado.");

            _logger.LogInformation("Post removido: {@PostId}", id);

            return NoContent();
        }
    }
}
