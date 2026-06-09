namespace AutoService.Logging;

public static class FileLoggerExtensions
{
    public static ILoggingBuilder AddFile(this ILoggingBuilder builder, string basePath, LogLevel minLevel = LogLevel.Information)
    {
        builder.AddProvider(new FileLoggerProvider(basePath, minLevel));
        return builder;
    }
}
