﻿using System;
using System.Collections.Generic;

namespace BreweryAPI.Models
{
    public partial class InventoryTransactionType
    {
        public InventoryTransactionType()
        {
            InventoryTransactions = new HashSet<InventoryTransaction>();
        }

        public int InventoryTransactionTypeId { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<InventoryTransaction> InventoryTransactions { get; set; }
    }
}
