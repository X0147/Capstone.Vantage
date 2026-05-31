const fs = require('fs');
const path = require('path');

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix App.integration.test.tsx
  if (filePath.endsWith('App.integration.test.tsx')) {
    content = content.replace(/useBookingStore\.getState\(\)\.resetBooking\(\);/g, 'useBookingStore.getState().clearStore();');
  }

  // Fix flightMocks.ts
  if (filePath.endsWith('flightMocks.ts')) {
    // "Airbus A350-1000" is overridden by string in this union type
    // Let's replace the string literal if it's in a union with `string`
    content = content.replace(/\| "Airbus A350-1000" \| string/g, '| string');
    content = content.replace(/\| 'Airbus A350-1000' \| string/g, '| string');
    content = content.replace(/'Airbus A350-1000' \| string/g, 'string');
    content = content.replace(/"Airbus A350-1000" \| string/g, 'string');
  }

  // Fix PaymentPage.tsx
  if (filePath.endsWith('PaymentPage.tsx')) {
    content = content.replace(/await confirmBooking\(\);/g, 'confirmBooking();');
  }

  // DiagnosticsHUD.tsx
  if (filePath.endsWith('DiagnosticsHUD.tsx')) {
    // It imports from telemetryLogger but calls telemetry.getLogs().
    // Let's just import telemetry from telemetry.ts
    content = content.replace(/import \{ telemetry \} from '\.\.\/utils\/telemetryLogger';/g, "import { telemetry } from '../utils/telemetry';");
    content = content.replace(/const logEntries = telemetry\.getLogs\?\.\(\) \?\? \[\];/g, 'const logEntries = telemetry.getLogs();');
    content = content.replace(/telemetry\.clear\?\.\(\);/g, 'telemetry.clear();');
  }

  // useBookingStore.ts
  if (filePath.endsWith('useBookingStore.ts')) {
    content = content.replace(/import \{ telemetry \} from '\.\.\/utils\/telemetryLogger';/g, "import { telemetry } from '../utils/telemetry';");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

const walkDir = (dir) => {
  if (!fs.existsSync(dir)) return;
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
