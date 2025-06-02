const fs = require('fs');
const path = require('path');

// Get all HTML files in the dist directory
const distDir = path.join(__dirname, 'dist');
const htmlFiles = fs.readdirSync(distDir).filter((file) => file.endsWith('.html'));

// Update each HTML file
htmlFiles.forEach((file) => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the style.css path
  content = content.replace(
    '<link rel="stylesheet" href="./assets/css/style.css">',
    '<link rel="stylesheet" href="./style.css">'
  );

  // Replace the testimonial.css path
  content = content.replace(
    '<link rel="stylesheet" href="./assets/css/testimonial.css">',
    '<link rel="stylesheet" href="./testimonial.css">'
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Updated CSS paths in ${file}`);
});

console.log('All HTML files updated successfully!');
