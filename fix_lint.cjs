const fs = require('fs');
const path = require('path');

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace {String(xyz)} with {xyz}
  content = content.replace(/\{String\(([^)]+)\)\}/g, (match, p1) => {
    // Only if it doesn't contain a ?? or || as that might be what's wanted
    return `{${p1}}`;
  });
  
  // Replace String(...) in other contexts (e.g. `String(foo).replace(...)`)
  // Be careful not to break valid String conversions. The lint error is:
  // "Passing a string to String() does not change the type or value"
  content = content.replace(/String\(([^)]+)\)\./g, '$1.');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  });
};

walkDir(path.join(__dirname, 'src'));
