using AutoMapper;
using Cinema.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiBaseController : ControllerBase
    {
        protected readonly IMapper _mapper;

        protected ApiBaseController(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected IActionResult OkPaged<TSource, TDestination>(
            (IEnumerable<TSource> Items, int TotalCount) result,
            QueryParameters queryParams)
        {
            var dtos = _mapper.Map<IEnumerable<TDestination>>(result.Items);

            var response = new PagedResponse<TDestination>(
                dtos,
                result.TotalCount,
                queryParams.Page,
                queryParams.Limit
            );

            return Ok(response);
        }
    }
}