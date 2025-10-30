const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

const svgBuffer = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="115" fill="url(#gradient)"/>
  <path d="M256 96C167.634 96 96 158.654 96 236C96 278.346 115.789 316.234 147.456 342.123L128 416L208.567 389.234C223.456 392.567 239.234 394.5 256 394.5C344.366 394.5 416 331.846 416 254.5C416 177.154 344.366 96 256 96Z" fill="white"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop stop-color="#34C759"/>
      <stop offset="1" stop-color="#007AFF"/>
    </linearGradient>
  </defs>
</svg>`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgBuffer))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`));
    
    console.log(`Generated icon-${size}.png`);
  }
}

generateIcons().catch(console.error);
