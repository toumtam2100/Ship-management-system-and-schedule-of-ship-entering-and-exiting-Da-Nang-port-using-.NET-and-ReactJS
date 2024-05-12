using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DPM.Domain.Entities;
using DPM.Domain.Interfaces;
using DPM.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace DPM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        private readonly IBoatService _boatService;

        public BoatController(IBoatService boatService)
        {
            _boatService = boatService;
        }

        [HttpGet]
        public IEnumerable<Boat> Get()
        {
            return _boatService.GetAllBoats();
        }

        [HttpGet("{id}")]
        public ActionResult<Boat> Get(long id)
        {
            var boat = _boatService.GetBoatById(id);

            if (boat == null)
            {
                return NotFound();
            }

            return boat;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Boat boat)
        {
            if (boat == null)
            {
                return BadRequest("Boat cannot be null");
            }

            await _boatService.AddBoat(boat);

            return CreatedAtAction(nameof(Get), new { id = boat.Id }, boat);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Boat boat)
        {
            if (id != boat.Id)
            {
                return BadRequest("Invalid ID");
            }

            await _boatService.UpdateBoat(boat);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            await _boatService.DeleteBoat(id);

            return NoContent();
        }
    }
}
