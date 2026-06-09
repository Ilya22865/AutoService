using System.Text;

namespace AutoService.Logging;

public class FileLogger : ILogger
{
    private readonly string _categoryName;
    private readonly string _basePath;
    private readonly LogLevel _minLevel;

    public FileLogger(string categoryName, string basePath, LogLevel minLevel = LogLevel.Information)
    {
        _categoryName = categoryName;
        _basePath = basePath;
        _minLevel = minLevel;
    }

    public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

    public bool IsEnabled(LogLevel logLevel) => logLevel >= _minLevel;

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel)) return;

        var filePath = Path.Combine(_basePath, $"autoservice-{DateTime.Now:yyyy-MM-dd}.log");

        var sb = new StringBuilder();
        sb.Append($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{logLevel}] [{_categoryName}] ");
        sb.Append(formatter(state, exception));
        if (exception != null)
            sb.Append($"\n{exception}");
        sb.AppendLine();

        lock (this)
        {
            Directory.CreateDirectory(_basePath);
            File.AppendAllText(filePath, sb.ToString(), Encoding.UTF8);
        }
    }
}
