using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class NewsController : ApiBaseController
    {
        private readonly INewsRepository _newsRepository;

        public NewsController(INewsRepository newsRepository, IMapper mapper) : base(mapper)
        {
            _newsRepository = newsRepository;
        }

        // GET: api/news
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _newsRepository.GetAllWithDetailsPagedAsync(queryParameters);
            return OkPaged<News, NewsShortDto>(results, queryParameters);
        }

        // GET: api/news/active
        [HttpGet("active")]
        [AllowAnonymous]
        public async Task<IActionResult> GetActive([FromQuery] QueryParameters queryParameters)
        {
            var results = await _newsRepository.GetActiveNewsPagedAsync(queryParameters);
            return OkPaged<News, NewsShortDto>(results, queryParameters);
        }

        // GET: api/news/{id}
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var newsItem = await _newsRepository.GetByIdWithDetailsAsync(id);
            if (newsItem == null) return NotFound();

            var result = _mapper.Map<NewsDetailsDto>(newsItem);
            return Ok(result);
        }

        // POST: api/news
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewsCreateDto dto)
        {
            var newsEntity = _mapper.Map<News>(dto);

            await _newsRepository.AddAsync(newsEntity);
            await _newsRepository.SaveAsync();

            // Отримуємо повні дані (з Include), щоб повернути валідний DTO
            var newsWithDetails = await _newsRepository.GetByIdWithDetailsAsync(newsEntity.NewsId);
            var response = _mapper.Map<NewsDetailsDto>(newsWithDetails);

            return CreatedAtAction(nameof(GetById), new { id = newsEntity.NewsId }, response);
        }

        // PUT: api/news/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NewsCreateDto dto)
        {
            var newsItem = await _newsRepository.GetByIdAsync(id);
            if (newsItem == null) return NotFound();

            _mapper.Map(dto, newsItem);
            await _newsRepository.SaveAsync();

            return NoContent();
        }

        // PATCH: api/news/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] NewsPatchDto dto)
        {
            var newsEntity = await _newsRepository.GetByIdAsync(id);
            if (newsEntity == null) return NotFound();

            _mapper.Map(dto, newsEntity);
            await _newsRepository.SaveAsync();

            return NoContent();
        }

        // DELETE: api/news/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var newsItem = await _newsRepository.GetByIdAsync(id);
            if (newsItem == null) return NotFound();

            await _newsRepository.DeleteAsync(id);
            await _newsRepository.SaveAsync();

            return NoContent();
        }
    }
}