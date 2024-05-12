using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using DPM.Domain.Entities;
using DPM.Domain.Services;
using DPM.Domain.Interfaces;

namespace DPM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishermenController : ControllerBase
    {
        private readonly IFishermenService _fishermenService;

        public FishermenController(IFishermenService fishermenService)
        {
            _fishermenService = fishermenService;
        }

        /// <summary>
        /// Get all fishermen.
        /// </summary>
        [HttpGet]
        public IEnumerable<Fishermen> Get()
        {
            return _fishermenService.GetAllFishermen();
        }

        /// <summary>
        /// Get a specific fisherman by ID.
        /// </summary>
        /// <param name="id">The ID of the fisherman.</param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Fishermen), 200)]
        [ProducesResponseType(404)]
        public ActionResult<Fishermen> Get(long id)
        {
            var fisherman = _fishermenService.GetFishermanById(id);

            if (fisherman == null)
            {
                return NotFound();
            }

            return fisherman;
        }

        /// <summary>
        /// Create a new fisherman.
        /// </summary>
        /// <param name="fisherman">The fisherman to add.</param>
        [HttpPost]
        [ProducesResponseType(typeof(Fishermen), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Post([FromBody] Fishermen fisherman)
        {
            if (fisherman == null)
            {
                return BadRequest("Fisherman cannot be null");
            }

            await _fishermenService.AddFisherman(fisherman);

            return CreatedAtAction(nameof(Get), new { id = fisherman.Id }, fisherman);
        }

        /// <summary>
        /// Update an existing fisherman by ID.
        /// </summary>
        /// <param name="id">The ID of the fisherman to update.</param>
        /// <param name="fisherman">The updated fisherman data.</param>
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Put(long id, [FromBody] Fishermen fisherman)
        {
            if (id != fisherman.Id)
            {
                return BadRequest("Invalid ID");
            }

            await _fishermenService.UpdateFisherman(fisherman);

            return NoContent();
        }

        /// <summary>
        /// Delete a fisherman by ID.
        /// </summary>
        /// <param name="id">The ID of the fisherman to delete.</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> Delete(long id)
        {
            await _fishermenService.DeleteFisherman(id);

            return NoContent();
        }
    }
}
