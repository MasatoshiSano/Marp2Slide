import fs from 'fs';

try {
  const html = fs.readFileSync('slideshow.html', 'utf8');
  
  // Check for common HTML issues
  const issues = [];
  
  // Check for unescaped quotes in attributes
  const attrQuoteRegex = /(\w+\s*=\s*"[^"]*"[^"]*"[^"]*")/g;
  let match;
  while ((match = attrQuoteRegex.exec(html)) !== null) {
    issues.push(`Line with potential quote issue: ${match[0]}`);
  }
  
  // Check for unescaped < or > in text content
  const lines = html.split('\n');
  lines.forEach((line, index) => {
    // Skip script and style tags
    if (line.includes('<script') || line.includes('<style') || line.includes('</script') || line.includes('</style')) {
      return;
    }
    
    // Look for potential unescaped characters
    if (line.includes('&quot;') || line.includes('&lt;') || line.includes('&gt;')) {
      console.log(`Line ${index + 1}: Contains HTML entities: ${line.trim()}`);
    }
    
    // Look for potentially problematic patterns
    if (line.match(/>[^<]*"[^<]*</)) {
      console.log(`Line ${index + 1}: Possible unescaped quote in content: ${line.trim()}`);
    }
  });
  
  // Check for proper tag closure
  const tagStack = [];
  const openTags = html.match(/<[^/][^>]*>/g) || [];
  const closeTags = html.match(/<\/[^>]*>/g) || [];
  
  console.log(`Found ${openTags.length} opening tags and ${closeTags.length} closing tags`);
  
  // Basic validation passed
  console.log('Basic HTML structure validation completed');
  
} catch (error) {
  console.error('Error reading file:', error.message);
}