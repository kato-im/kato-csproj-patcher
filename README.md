kato-csproj-patcher
===================

Simple patcher for csproj-files

## Installation
Via npm

```bash
npm install -g git+https://github.com/kato-im/kato-csproj-patcher.git
```

## Usage

```bash
csproj-patch --csproj /Absolut/Path/To.csproj --config 'Release|iPhone' --values '{"OutputPath": "/build"}'
```
