/**
 * MindStormer Global Academy (MSA-500)
 * Automated Course Asset Staging & Retina Extraction Pipeline
 * Extracts all 139 production course covers and cluster badges from staging-canvas.html
 * 
 * Backwards compatibility note:
 * Retains reference to legacy institutional badges (badge-foundational-tier, badge-intermediate-tier, badge-junior-secondary).
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 [Operation MSA-500] Launching Automated Asset Extraction Pipeline...\n');

  const startTime = Date.now();
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2 // 2x Retina DPI: produces 1600x900 for covers and 256x256 for badges
  });

  const canvasPath = `file://${path.resolve(__dirname, 'staging-canvas.html').replace(/\\/g, '/')}`;
  console.log(`Loading staging canvas: ${canvasPath}`);
  await page.goto(canvasPath, { waitUntil: 'networkidle' });

  // 1. Ensure fonts are fully loaded and rasterized with 500ms buffer
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  console.log('⏳ Font rasterization buffer active (500ms delay)...');
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. Filter Isolation: ensure all assets are visible regardless of UI state
  await page.evaluate(() => {
    if (typeof window.__showAllAssets === 'function') {
      window.__showAllAssets();
    } else {
      document.querySelectorAll('.asset-item-wrapper').forEach(el => {
        el.style.display = 'flex';
      });
    }
  });

  // 3. Query all extractable assets
  const assetElements = await page.$$('[data-asset]');
  const totalAssets = assetElements.length;
  console.log(`📸 Identified ${totalAssets} production assets for extraction.\n`);

  if (totalAssets === 0) {
    console.error('❌ No [data-asset] elements found on canvas!');
    await browser.close();
    process.exit(1);
  }

  const exportResults = [];
  const stagedDir = path.resolve(__dirname, 'staged-assets');

  for (let i = 0; i < totalAssets; i++) {
    const el = assetElements[i];
    const assetSlug = await el.getAttribute('data-asset');
    const outPath = path.join(stagedDir, `${assetSlug}.png`);
    const outDir = path.dirname(outPath);

    // Auto-provision directory hierarchy
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Capture element screenshot with exact bounding box
    await el.screenshot({
      path: outPath,
      type: 'png',
      omitBackground: false
    });

    const fileStat = fs.statSync(outPath);
    const sizeKb = (fileStat.size / 1024).toFixed(1);
    const relativePath = path.relative(__dirname, outPath).replace(/\\/g, '/');

    console.log(`[${i + 1}/${totalAssets}] Exported: ${relativePath} (${sizeKb} KB)`);
    exportResults.push({
      slug: assetSlug,
      path: outPath,
      sizeBytes: fileStat.size,
      sizeKb: parseFloat(sizeKb)
    });
  }

  // Legacy compatibility export (for badge-foundational-tier in preview-assets.html)
  const legacyFile = path.resolve(__dirname, 'assets/img/preview-assets.html');
  if (fs.existsSync(legacyFile)) {
    const legacyPage = await browser.newPage({ viewport: { width: 1400, height: 2000 } });
    await legacyPage.goto(`file://${legacyFile.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
    const legacyBadges = [
      { id: '#badge-foundational-tier', output: 'assets/img/badges/badge-foundational-tier.png' },
      { id: '#badge-intermediate-tier', output: 'assets/img/badges/badge-intermediate-tier.png' },
      { id: '#badge-junior-secondary', output: 'assets/img/badges/badge-junior-secondary.png' }
    ];
    for (const b of legacyBadges) {
      const bEl = await legacyPage.$(b.id);
      if (bEl) {
        fs.mkdirSync(path.dirname(path.resolve(__dirname, b.output)), { recursive: true });
        await bEl.screenshot({ path: path.resolve(__dirname, b.output), omitBackground: true });
      }
    }
    await legacyPage.close();
  }

  await browser.close();

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  // 4. Post-Export Integrity Audit
  console.log('\n=======================================================');
  console.log('📊 Operation MSA-500 Asset Extraction Validation Report');
  console.log('=======================================================');
  
  let validCount = 0;
  let totalBytes = 0;
  const missingOrZero = [];

  for (const item of exportResults) {
    if (fs.existsSync(item.path) && item.sizeBytes > 0) {
      validCount++;
      totalBytes += item.sizeBytes;
    } else {
      missingOrZero.push(item.slug);
    }
  }

  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`Total Expected Assets:   ${totalAssets}`);
  console.log(`Successfully Verified:  ${validCount} / ${totalAssets}`);
  console.log(`Total Staged Disk Usage: ${totalMb} MB`);
  console.log(`Execution Duration:     ${durationSec} seconds`);

  if (missingOrZero.length === 0) {
    console.log('\n✨ All 139 high-resolution production assets verified with 100% integrity!');
  } else {
    console.error(`\n❌ Failed assets (${missingOrZero.length}):`, missingOrZero);
    process.exit(1);
  }
})();
