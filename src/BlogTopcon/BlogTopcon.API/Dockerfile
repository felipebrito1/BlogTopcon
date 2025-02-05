# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src/BlogTopcon

# Copia os arquivos de projeto (somente os .csproj) para restaurar as dependências
COPY ["./BlogTopcon.API/BlogTopcon.API.csproj", "BlogTopcon.API/"]
COPY ["./BlogTopcon.Infra/BlogTopcon.Infra.csproj", "BlogTopcon.Infra/"]
COPY ["./BlogTopcon.Core/BlogTopcon.Core.csproj", "BlogTopcon.Core/"]



# Restaurar o projeto principal e suas dependências
RUN dotnet restore "BlogTopcon.API/BlogTopcon.API.csproj"

# Copiar todos os arquivos do diretório de origem
COPY . .

# Configurar o diretório de trabalho para o projeto principal
WORKDIR /src/BlogTopcon/BlogTopcon.API


# Compilar o projeto principal
RUN dotnet build -c $BUILD_CONFIGURATION -o /app/build

# Publicar os artefatos
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlogTopcon.API.dll"]