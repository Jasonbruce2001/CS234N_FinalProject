using System.Collections.Generic;
using System.Linq;
using System;
using BreweryAPI.Models;

using NUnit.Framework;
using Microsoft.EntityFrameworkCore;

namespace BreweryAPITests
{
    [TestFixture]
    public class AccountTests
    {

        BreweryContext dbContext;
        Account? a;
        List<Account>? accounts;

        [SetUp]
        public void Setup()
        {
            dbContext = new BreweryContext();
            //dbContext.Database.ExecuteSqlRaw("call usp_testingResetData()");
        }

        [Test]
        public void GetAllTest()
        {
            accounts = dbContext.Accounts.OrderBy(a => a.AccountId).ToList();
            Assert.That(accounts.Count, Is.EqualTo(6));
            Assert.That(accounts[0].Name, Is.EqualTo("Jason Bruce 5"));
            //PrintAll(customers);
        }


        [Test]
        public void GetByPrimaryKeyTest()
        {
            a = dbContext.Accounts.Find(5);
            Assert.IsNotNull(a);
            Assert.That(a.Name, Is.EqualTo("Jason Bruce 5"));
            Console.WriteLine(a);
        }

        [Test]
        public void GetUsingWhere()
        {
            accounts = dbContext.Accounts.Where(a => a.Name.StartsWith("J")).OrderBy(a =>a.Name).ToList();
            Console.WriteLine(accounts);
            Assert.That(accounts.Count, Is.EqualTo(4));
            Assert.That(accounts[0].Name, Is.EqualTo("Jason Bruce"));
        }

        /*
        [Test]
        public void DeleteTest()
        {
            a = dbContext.Accounts.Find(1);
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