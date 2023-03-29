namespace REAPI.Materials;

public sealed record SourceSettingsJson
{
  public string? Name { get; set; }
  public MaterialsJson? Materials { get; set; }
  public InputPropertiesJson? InputProperties { get; set; }
}

public sealed record MaterialsJson
{
  public MaterialJson[]? Raster { get; set; }
  public MaterialJson[]? Vector { get; set; }
}

public sealed record MaterialJson
{
  public uint? Id { get; set; }
  public string? Name { get; set; }
  public Dictionary<string, object>? Properties { get; set; }
}

public sealed record InputPropertiesJson
{
  public Dictionary<string, InputMetadataJson>? Raster { get; set; }
  public Dictionary<string, InputMetadataJson>? Vector { get; set; }
}

public sealed record InputMetadataJson
{
  public double? MinValue { get; set; }
  public double? MaxValue { get; set; }
  public double? SlowIncrementValue { get; set; }
  public double? IncrementValue { get; set; }
  public double? FastIncrementValue { get; set; }
  public string? Postfix { get; set; }
}
