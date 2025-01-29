using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Infra.Context;
using BlogTopcon.Infra.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BlogTopcon.Test
{
    [TestClass]
    public sealed class PostRepositoryTest
    {
        private readonly IPostRepository _postRepository;
        public PostRepositoryTest()
        {
            var options = new DbContextOptionsBuilder<PostgreeDbContext>()
                .UseNpgsql("Host=localhost:5432;Database=PostDb;Username=postgres;Password=postgres")
                .Options;
            _postRepository = new PostRepository(new PostgreeDbContext(options));
        }

        [TestMethod]
        public async Task Criar_Post_ComSucesso()
        {
            //Arrange
            var post = new Post("Title teste", "Conteúdo teste");

            //Act
            await _postRepository.InsertAsync(post);

            //Assert
            var postCriado = await _postRepository.GetAsync(post.Id);
            Assert.IsNotNull(postCriado);
        }

        [TestMethod]
        public async Task Buscar_Todos_Post_ComSucesso()
        {
            //Act
            IEnumerable<Post> posts = await _postRepository.GetAllAsync();

            //Assert
            Assert.IsNotNull(posts);
        }

        [TestMethod]
        public async Task Buscar_Por_Id_Post_ComSucesso()
        {
            //Arrange
            var postParaInserir = new Post("Title teste", "Conteúdo teste");
            await _postRepository.InsertAsync(postParaInserir);

            //Act
            var postConsultado = await _postRepository.GetAsync(postParaInserir.Id);

            //Assert
            Assert.IsNotNull(postConsultado);
            Assert.AreEqual(postParaInserir.Id, postConsultado.Id);
        }

        [TestMethod]
        public async Task Deletar_Por_Id_Post_ComSucesso()
        {
            //Arrange
            var post = new Post("Title teste", "Conteúdo teste");
            await _postRepository.InsertAsync(post);

            //Act
            await _postRepository.DeleteAsync(post.Id);

            //Assert
            var postDeletado = await _postRepository.GetAsync(post.Id);
            Assert.IsNull(postDeletado);
        }

        [TestMethod]
        public async Task Update_Post_ComSucesso()
        {
            //Arrange
            var post = new Post("Title teste", "Conteúdo teste");
            await _postRepository.InsertAsync(post);

            var postParaAtualizar = await _postRepository.GetAsync(post.Id);
            string novoConteudo = $"Content atualizado {DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss")}";

            //Act
            postParaAtualizar.UpdateContent(novoConteudo);
            await _postRepository.UpdateAsync(postParaAtualizar);

            //Assert
            var postAtualizado = await _postRepository.GetAsync(post.Id);
            Assert.AreEqual(novoConteudo, postAtualizado.Content);
        }
    }
}
