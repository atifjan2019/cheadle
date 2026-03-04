# Script to batch-replace inline headers with a placeholder div
# and add the load-includes.js script tag

$htmlFiles = Get-ChildItem -Path "c:\Users\ss\Desktop\cheadle" -Filter "*.html" -File | Where-Object { $_.DirectoryName -eq "c:\Users\ss\Desktop\cheadle" }

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Pattern to match the header block (with or without the comment above it)
    # Matches from the HTML comment or <header> tag through </header>
    $headerPattern = '(?s)<!-- ={2,}\r?\n\s*HEADER.*?</header>'
    $replacement = '<div id="header-root"></div>'
    
    $newContent = [regex]::Replace($content, $headerPattern, $replacement)
    
    # If the comment-based pattern didn't match, try just the header tag
    if ($newContent -eq $content) {
        $headerPattern2 = '(?s)<header class="header" id="header">.*?</header>'
        $newContent = [regex]::Replace($content, $headerPattern2, $replacement)
    }
    
    # Add load-includes.js if not already present
    if ($newContent -notmatch 'load-includes\.js') {
        $newContent = $newContent -replace '</head>', "<script src=`"js/load-includes.js`" defer></script>`r`n</head>"
    }
    
    # Remove nav.js script tag (since load-includes.js now handles nav init)
    $newContent = $newContent -replace '<script src="js/nav\.js"></script>\r?\n?', ''
    
    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Updated: $($file.Name)"
    }
    else {
        Write-Host "No change: $($file.Name)"
    }
}

Write-Host "`nDone! All files processed."
