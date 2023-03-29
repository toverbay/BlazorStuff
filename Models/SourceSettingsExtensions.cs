namespace REAPI.Materials;

static class SourceSettingsExtensions
{
    public static IEnumerable<string> GetSourceNames(this IEnumerable<SourceSettingsJson>? sources)
        => sources is not null
            ? sources.Select(s => s?.Name ?? "").Where(n => !string.IsNullOrEmpty(n))
            : Enumerable.Empty<string>();

    public static SourceSettingsJson? GetByName(this IEnumerable<SourceSettingsJson> sources, string name)
        => sources is not null
            ? sources.FirstOrDefault(s => string.Equals(name, s.Name))
            : default;

    public static IEnumerable<MaterialJson> GetVectorMaterials(this MaterialsJson materials)
        => materials?.Vector ?? Enumerable.Empty<MaterialJson>();

    public static IEnumerable<MaterialJson> GetRasterMaterials(this MaterialsJson materials)
        => materials?.Raster ?? Enumerable.Empty<MaterialJson>();

    public static MaterialJson? GetVectorMaterialByName(this MaterialsJson materials, string name)
        => (materials?.Vector ?? Enumerable.Empty<MaterialJson>())
            .FirstOrDefault(m => string.Equals(name, m.Name));

    public static MaterialJson? GetRasterMaterialByName(this MaterialsJson materials, string name)
        => (materials?.Raster ?? Enumerable.Empty<MaterialJson>())
            .FirstOrDefault(m => string.Equals(name, m.Name));

    public static IEnumerable<string> GetMaterialNames(this MaterialsJson materials)
        => GetVectorMaterials(materials)
            .Union(GetRasterMaterials(materials))
            .Select(m => m.Name ?? "")
            .Where(n => !string.IsNullOrEmpty(n))
            .Distinct();
}
