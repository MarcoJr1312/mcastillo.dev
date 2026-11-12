import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M100 0H0V100" fill="none" stroke="#17150f" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#f3efe6"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#17150f" stroke-opacity="0.35"/>

  <rect x="72" y="74" width="14" height="14" fill="#b23a22"/>
  <text x="100" y="86" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="4" fill="#17150f">mcastillo.dev</text>
  <text x="1128" y="86" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="17" letter-spacing="3" fill="#736c5c">SOFTWARE ENGINEER / 2026</text>

  <text x="72" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="103" letter-spacing="-4" fill="#17150f">Sistemas que</text>
  <text x="72" y="374" font-family="Georgia, 'Times New Roman', serif" font-size="103" letter-spacing="-4" fill="#17150f">llegan a</text>
  <text x="72" y="478" font-family="Georgia, 'Times New Roman', serif" font-size="103" font-style="italic" letter-spacing="-4" fill="#b23a22">producción.</text>

  <line x1="72" y1="530" x2="1128" y2="530" stroke="#17150f" stroke-opacity="0.25"/>
  <text x="72" y="562" font-family="Consolas, 'Courier New', monospace" font-size="17" letter-spacing="3" fill="#4c4739">MARCO CASTILLO</text>
  <text x="1128" y="562" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="17" letter-spacing="3" fill="#736c5c">BARRIE, ON · 44.3894° N / 79.6903° W</text>
</svg>`;

await writeFile('public/og.svg', svg, 'utf8');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('Generated public/og.svg and public/og.png');
