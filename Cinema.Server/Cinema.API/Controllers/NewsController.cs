using AutoMapper;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ApiBaseController
    {
        private readonly INewsRepository _newsRepository;

        public NewsController(INewsRepository newsRepository, IMapper mapper):base(mapper)
        {
            _newsRepository = newsRepository;
        }
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            var news = await _newsRepository.GetActiveNewsAsync();
            var result = _mapper.Map<IEnumerable<NewsShortDto>>(news); 
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var newsItem = await _newsRepository.GetByIdWithDetailsAsync(id);
            if (newsItem == null) return NotFound();

            var result = _mapper.Map<NewsDetailsDto>(newsItem);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var news = await _newsRepository.GetAllWithDetailsAsync();
            var result = _mapper.Map<IEnumerable<NewsShortDto>>(news);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewsCreateDto dto)
        {
            var newsEntity = _mapper.Map<News>(dto);
            await _newsRepository.AddAsync(newsEntity);
            await _newsRepository.SaveAsync(); 
            var newsWithDetails = await _newsRepository.GetByIdWithDetailsAsync(newsEntity.NewsId);
            var response = _mapper.Map<NewsDetailsDto>(newsEntity);
            return CreatedAtAction(nameof(GetById), new { id = newsEntity.NewsId }, response);
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NewsPatchDto dto)
        {
            var newsEntity = await _newsRepository.GetByIdAsync(id);
            if (newsEntity == null) return NotFound();
            _mapper.Map(dto, newsEntity);
            await _newsRepository.SaveAsync(); 
            return NoContent(); 
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] NewsCreateDto dto)
        {
            var newsItem = await _newsRepository.GetByIdAsync(id);
            if (newsItem == null) return NotFound();
            _mapper.Map(dto, newsItem);
            await _newsRepository.SaveAsync();
            return NoContent();
        }
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
