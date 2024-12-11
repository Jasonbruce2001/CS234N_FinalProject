using System.Collections.Generic;
using System.Linq;
using System;
using BreweryAPI.Models;

using NUnit.Framework;
using Microsoft.EntityFrameworkCore;

namespace BreweryAPITests
{
    [TestFixture]
    public class IngredientTests
    {

        BreweryContext dbContext;
        Ingredient? i;
        List<Ingredient>? ingredients;

        [SetUp]
        public void Setup()
        {
            dbContext = new BreweryContext();
            //dbContext.Database.ExecuteSqlRaw("call usp_testingResetData()");
        }

        [Test]
        public void GetAllTest()
        {
            ingredients = dbContext.Ingredients.OrderBy(a => a.IngredientId).ToList();
            Assert.That(ingredients.Count, Is.EqualTo(1149));
            Assert.That(ingredients[0].Name, Is.EqualTo("Acid Malt"));
            //PrintAll(customers);
        }


        [Test]
        public void GetByPrimaryKeyTest()
        {
            i = dbContext.Ingredients.Find(5);
            Assert.IsNotNull(i);
            Assert.That(i.Name, Is.EqualTo("Lime"));
            Console.WriteLine(i);
        }

        [Test]
        public void GetUsingWhere()
        {
            ingredients = dbContext.Ingredients.Where(i => i.Name.StartsWith("J")).OrderBy(i => i.Name).ToList();
            Console.WriteLine(ingredients);
            Assert.That(ingredients.Count, Is.EqualTo(6));
            Assert.That(ingredients[0].Name, Is.EqualTo("Jarrylo"));
        }


        /*
        [Test]
        public void DeleteTest()
        {
            a = dbContext.Accounts.Find(1);
            dbContext.Accounts.Add(a);
            dbContext.SaveChanges();

            dbContext.Accounts.Remove(a);
            dbContext.SaveChanges();
            Assert.IsNull(dbContext.Accounts.Find(1));
        }

        [Test]
        public void CreateTest()
        {
            c = new Customer();
            c.CustomerId = 99999;
            c.Name = "Test Customer";
            c.Address = "123 My Address";
            c.City = "Palo Alto";
            c.StateCode = "CA";
            c.ZipCode = "94025";

            dbContext.Customers.Add(c);
            dbContext.SaveChanges();
            Assert.IsNotNull(dbContext.Customers.Find(99999));
        }


        [Test]
        public void UpdateTest()
        {
            c = dbContext.Customers.Find(3);
            c.Name = "Tony the tiger";

            dbContext.Customers.Update(c);
            dbContext.SaveChanges();

            c = dbContext.Customers.Find(3);

            Assert.AreEqual("Tony the tiger", c.Name);
        }

        public void PrintAll(List<Customer> customers)
        {
            foreach (Customer c in customers)
            {
                Console.WriteLine(c);
            }
        }*/
    }
}
