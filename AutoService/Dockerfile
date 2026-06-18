FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY AutoService.cspoj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app 
COPY --from=build /app .
RUN mkdir -p /Frontend && echo '<!doctype html><title>API</title>' > /Frontend/index.html
EXPOSE 5130
ENV ASPNETCORE_URLS=http://+:5130
ENTRYPOINT [ "dotnet", "AutoService.dll" ]
