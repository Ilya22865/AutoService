namespace AutoService.Models.Catalog
{
    public class DetailCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        public ICollection<Detail> Details { get; set; } = null!;
    }
    public class ServiceCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool IsActive { get; set; }
        public ICollection<Service> Services { get; set; } = null!;
    }
}
