param(
  [string]$DrawingsDir = ""
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RaterDir = Split-Path -Parent $ScriptDir
if ([string]::IsNullOrWhiteSpace($DrawingsDir)) {
  $DrawingsDir = Join-Path $RaterDir "DrawingsNDescriptions"
}

$PngDir = Join-Path $DrawingsDir "PNGs"
$TxtDir = Join-Path $DrawingsDir "TXTs"
$OutFile = Join-Path $DrawingsDir "catalog_manifest.js"

if (-not (Test-Path -LiteralPath $PngDir -PathType Container)) {
  throw "PNG folder not found: $PngDir"
}

if (-not (Test-Path -LiteralPath $TxtDir -PathType Container)) {
  throw "TXT folder not found: $TxtDir"
}

$pngFiles = Get-ChildItem -LiteralPath $PngDir -File |
  Where-Object { $_.Extension -match '^\.(png)$' } |
  Sort-Object Name

if ($pngFiles.Count -eq 0) {
  throw "No PNG files found in $PngDir"
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("window.RATER_CATALOG_MANIFEST = {")
$lines.Add("  items: [")

for ($i = 0; $i -lt $pngFiles.Count; $i++) {
  $pngName = $pngFiles[$i].Name
  $stem = [System.IO.Path]::GetFileNameWithoutExtension($pngName)
  $stemNoPhase = ($stem -replace '_(draw|edit)$', '')
  $candidate1 = "$stem.txt"
  $candidate2 = "$stemNoPhase.txt"
  $txtName = $null

  if (Test-Path -LiteralPath (Join-Path $TxtDir $candidate1) -PathType Leaf) {
    $txtName = $candidate1
  } elseif (Test-Path -LiteralPath (Join-Path $TxtDir $candidate2) -PathType Leaf) {
    $txtName = $candidate2
  }

  $comma = if ($i -lt ($pngFiles.Count - 1)) { "," } else { "" }
  if ($txtName) {
    $lines.Add("    { file_name: `"$pngName`", text_file: `"$txtName`" }$comma")
  } else {
    $lines.Add("    { file_name: `"$pngName`" }$comma")
    Write-Warning "No matching TXT found for $pngName"
  }
}

$lines.Add("  ]")
$lines.Add("};")

Set-Content -LiteralPath $OutFile -Value $lines -Encoding UTF8
Write-Host "Wrote manifest: $OutFile ($($pngFiles.Count) PNG entries)"
