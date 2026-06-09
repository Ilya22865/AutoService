namespace AutoService.Logging;

public class FileLoggerProvider : ILoggerProvider
{
    private readonly string _basePath;
    private readonly LogLevel _minLevel;

    public FileLoggerProvider(string basePath, LogLevel minLevel = LogLevel.Information)
    {
        _basePath = basePath;
        _minLevel = minLevel;
    }

    public ILogger CreateLogger(string categoryName) => new FileLogger(categoryName, _basePath, _minLevel);

    public void Dispose() { }
}
