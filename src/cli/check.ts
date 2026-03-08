import {
  APP_NAME,
  PACKAGE_NAME,
  REPO_URL,
  clearNotifyFile,
  compareSemver,
  ensureFlowDir,
  fetchLatestVersion,
  getLocalVersion,
  isCacheFresh,
  updateCacheTimestamp,
  writeNotifyFile,
} from './utils.js';

export async function checkForUpdates(args: string[] = []): Promise<void> {
  const isBackground = args.includes('--bg');
  const isQuiet = args.includes('--quiet');

  ensureFlowDir();

  if (isBackground) {
    await runBackgroundCheck();
    return;
  }

  const currentVersion = getLocalVersion();
  const latestVersion = await fetchLatestVersion();

  if (!latestVersion) {
    if (!isQuiet) {
      console.log(`⚠️  Could not reach the npm registry for ${PACKAGE_NAME}.`);
    }
    return;
  }

  if (compareSemver(latestVersion, currentVersion) > 0) {
    if (isQuiet) {
      console.log(`🚀 ${APP_NAME} v${latestVersion} available! Run: npm update -g ${PACKAGE_NAME}`);
    } else {
      printUpdateBox(currentVersion, latestVersion);
    }
    return;
  }

  if (!isQuiet) {
    console.log(`✅ ${APP_NAME} v${currentVersion} is up to date.`);
  }
}

async function runBackgroundCheck(): Promise<void> {
  if (isCacheFresh()) {
    return;
  }

  const currentVersion = getLocalVersion();
  const latestVersion = await fetchLatestVersion();

  updateCacheTimestamp();

  if (!latestVersion) {
    return;
  }

  if (compareSemver(latestVersion, currentVersion) > 0) {
    writeNotifyFile(
      `🚀 ${APP_NAME} v${latestVersion} available! (current: v${currentVersion})\n   Run: npm update -g ${PACKAGE_NAME}`,
    );
    return;
  }

  clearNotifyFile();
}

function printUpdateBox(currentVersion: string, latestVersion: string): void {
  const line1 = `  🚀 ${APP_NAME} v${latestVersion} available! (current: v${currentVersion})`;
  const line2 = `  npm update -g ${PACKAGE_NAME}`;
  const line3 = `  ${REPO_URL}/releases`;
  const width = Math.max(line1.length, line2.length, line3.length) + 2;
  const pad = (value: string) => value + ' '.repeat(Math.max(0, width - value.length));

  console.log('');
  console.log(`╔${'═'.repeat(width)}╗`);
  console.log(`║${pad(line1)}║`);
  console.log(`║${' '.repeat(width)}║`);
  console.log(`║${pad(line2)}║`);
  console.log(`║${pad(line3)}║`);
  console.log(`╚${'═'.repeat(width)}╝`);
  console.log('');
}
