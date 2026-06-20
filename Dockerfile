FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY AutoService/AutoService.csproj .
RUN dotnet restore
COPY AutoService/ .
RUN dotnet publish -c Release -o /app

FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY Frontend/react-app/ .
RUN npm ci && npm run build

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
COPY --from=frontend-build /app/dist /app/Frontend
EXPOSE 5130
ENV ASPNETCORE_URLS=http://+:5130
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "AutoService.dll"]
