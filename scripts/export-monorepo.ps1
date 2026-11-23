param(
    [string]$OutputDirectory = "_exports"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$output = Join-Path $root $OutputDirectory
New-Item -ItemType Directory -Force -Path $output | Out-Null
$output = (Resolve-Path $output).Path
if (-not $output.StartsWith($root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw "OutputDirectory must be inside the monorepo."
}

$excludedDirs = @('.git', 'node_modules', '.next', '.turbo', 'out', 'dist', 'build', '.vercel', '.cache', '.pnpm-store', 'coverage', 'assets-source', '_exports', '.idea', '.vscode-test')
$excludedFiles = @('.env', '.env.*', '*.pem', '*.key', '*.p12', '*.pfx', '*.zip', '*.7z', '*.rar', 'id_rsa*', 'id_ed25519*', '*service-account*.json', '*credentials*.json', '.npmrc.local')
$includedEnvExamples = @('.env.example', '.env.sample', '.env.template')
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$zipPath = Join-Path $output "notanangel-monorepo-$stamp.zip"
$filesAdded = 0

$zip = [IO.Compression.ZipFile]::Open($zipPath, [IO.Compression.ZipArchiveMode]::Create)
try {
    $files = Get-ChildItem -LiteralPath $root -Recurse -File -Force -ErrorAction Stop
    foreach ($file in $files) {
        $relative = $file.FullName.Substring($root.Length).TrimStart([char]'\', [char]'/').Replace('\', '/')
        $parts = $relative.Split('/')
        if (@($parts | Where-Object { $excludedDirs -contains $_ }).Count -gt 0) { continue }
        if ($file.FullName.StartsWith($output + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { continue }
        if ($includedEnvExamples -notcontains $file.Name) {
            $skip = $false
            foreach ($pattern in $excludedFiles) {
                if ($file.Name -like $pattern) { $skip = $true; break }
            }
            if ($skip) { continue }
        }
        [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relative, [IO.Compression.CompressionLevel]::Optimal)
        $filesAdded++
    }
}
finally {
    $zip.Dispose()
}

Write-Host "Export complete: $zipPath" -ForegroundColor Green
Write-Host "Files included: $filesAdded"
Write-Host "Check the ZIP before sharing: secrets embedded in source files cannot be detected automatically." -ForegroundColor Yellow
