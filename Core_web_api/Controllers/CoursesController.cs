using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core_web_api.Models;

namespace Core_web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CoursesDbContext db;

        public CoursesController(CoursesDbContext context)
        {
            db = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
          if (db.Courses == null)
          {
              return NotFound();
          }
            return await db.Courses.ToListAsync();
        }

        // get data
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
          if (db.Courses == null)
          {
              return NotFound();
          }
          var course = await db.Courses.FindAsync(id);
          if (course == null)
           {
                return NotFound();
           }
            return course;
        }

        // edit course data
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }
            db.Entry(course).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // add course
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
          if (db.Courses == null)
          {
              return Problem("Entity set 'CoursesDbContext.Courses'  is null.");
          }
            db.Courses.Add(course);
            await db.SaveChangesAsync();
            return CreatedAtAction("GetCourse", new { id = course.Id }, course);
        }

        // delete course data
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (db.Courses == null)
            {
                return NotFound();
            }
            var course = await db.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            db.Courses.Remove(course);
            await db.SaveChangesAsync();
            return NoContent();
        }
        private bool CourseExists(int id)
        {
            return (db.Courses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
