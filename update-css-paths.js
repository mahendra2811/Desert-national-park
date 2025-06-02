const fs = require('fs');
const path = require('path');

// Get all HTML files in the dist directory
const distDir = path.join(__dirname, 'dist');
const htmlFiles = fs.readdirSync(distDir).filter((file) => file.endsWith('.html'));

// Update each HTML file
htmlFiles.forEach((file) => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the style.css path using regex to handle different tag formats
  content = content.replace(
    /<link\s+rel="stylesheet"\s+href="\.\/assets\/css\/style\.css"[^>]*>/g,
    '<link rel="stylesheet" href="./style.css">'
  );

  // Replace the testimonial.css path using regex to handle different tag formats
  content = content.replace(
    /<link\s+rel="stylesheet"\s+href="\.\/assets\/css\/testimonial\.css"[^>]*>/g,
    '<link rel="stylesheet" href="./testimonial.css">'
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Updated CSS paths in ${file}`);
});

console.log('All HTML files updated successfully!');
