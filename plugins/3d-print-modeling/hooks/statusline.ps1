# Prints a badge while the plugin's SessionStart hook has marked it active.
$dir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME '.claude' }
$flag = Join-Path $dir '.3d-print-modeling-active'
if (Test-Path $flag) {
    $esc = [char]27
    [Console]::Out.Write("$esc[38;5;110m[3D-PRINT]$esc[0m")
}
