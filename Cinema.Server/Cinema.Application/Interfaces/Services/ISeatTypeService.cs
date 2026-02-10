using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface ISeatTypeService
    {
        Task DeleteAndMigrateSeatsAsync(int typeIdToDelete, int newTypeId);
        Task<int> GetUsageCountAsync(int typeId);
    }
}
