const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/PaymentPage.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/await new Promise\(\(resolve\) => setTimeout\(resolve, 1500\)\);/g, 'await new Promise((resolve) => setTimeout(resolve, 1500));');
  // Wait, let's just see line 26 of PaymentPage.tsx first to be safe.
}
