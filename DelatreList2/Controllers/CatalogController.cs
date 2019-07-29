using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DelatreList2.Controllers
{
    [Route("api/[controller]")]
    public class CatalogController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static List<Item> allItems = new List<Item>
            {
                new Item("Football Cleats", "You'll run so fast with these cleats", 100),
                new Item("Coach Clipboard", "Call the shots with this clipboard", 2000),
                new Item("Athletic Tape", null, 500)
            };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpPost("/clearList")]
        public JsonResult ClearItemList(object okToClear)
        {
            allItems.Clear();
            return new JsonResult(allItems);
        }

        [HttpGet("/getAllItems")]
        public JsonResult GetAllItems()
        {
            return new JsonResult(allItems);
        }

        [HttpPost("/submitItem")]
        public JsonResult AddItem([FromBody] Item newItem)
        {
            if(newItem.ItemQuantity < 1)
            {
                return new JsonResult(new Error
                {
                    ErrorName = "itemQuantity",
                    ErrorMessage = "An item must have a quantity of one (1) or more."
                }); 
            }
            allItems.Add(newItem);
            return new JsonResult(new ItemResponse
            {
                Message = "OK"
            });
        }

        public class ItemResponse
        {
            public string Message { get; set; }
        }

        public class Item
        {
            public Item(string itemName, string itemDescription, int itemQuantity)
            {
                ItemName = itemName;
                ItemDescription = itemDescription;
                ItemQuantity = itemQuantity;
            }

            public string ItemName { get; set; }
            public string ItemDescription { get; set; }
            public int ItemQuantity { get; set; }
        }

        public class Error
        {
            public string ErrorName { get; set; }
            public string ErrorMessage { get; set; }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
