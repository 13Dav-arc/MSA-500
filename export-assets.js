const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Launch headless browser
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 2000 } });

  // Load local preview-assets.html file
  const filePath = `file://${path.resolve(__dirname, 'assets/img/preview-assets.html')}`;
  await page.goto(filePath, { waitUntil: 'networkidle' });

  // List of elements to snap and export
  const assets = [
    // Banners
    { id: '#banner-foundational', output: 'assets/img/banners/banner-foundational.png' },
    { id: '#banner-intermediate', output: 'assets/img/banners/banner-intermediate.png' },
    { id: '#banner-junior-secondary', output: 'assets/img/banners/banner-junior-secondary.png' },

    // Icons
    { id: '#icon-science', output: 'assets/img/icons/icon-science.png' },
    { id: '#icon-math', output: 'assets/img/icons/icon-math.png' },
    { id: '#icon-tech', output: 'assets/img/icons/icon-tech.png' },
    { id: '#icon-english', output: 'assets/img/icons/icon-english.png' },

    // Badges
    { id: '#badge-circuit-master', output: 'assets/img/badges/badge-circuit-master.png' },
    { id: '#badge-algebra-pro', output: 'assets/img/badges/badge-algebra-pro.png' },
    { id: '#badge-streak-7', output: 'assets/img/badges/badge-streak-7.png' }
  ];

  console.log('🚀 Exporting asset PNGs...');

  for (const asset of assets) {
    const element = await page.$(asset.id);
    if (element) {
      await element.screenshot({ path: asset.output, omitBackground: true });
      console.log(`✅ Saved: ${asset.output}`);
    } else {
      console.log(`⚠️ Element not found: ${asset.id}`);
    }
  }

  await browser.close();
  console.log('🎉 All graphics successfully exported to PNG!');
})();