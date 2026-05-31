const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/store/useBookingStore.test.ts');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/as BookingRecord\[\]/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed test file');
}
