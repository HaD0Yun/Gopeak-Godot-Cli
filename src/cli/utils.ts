import { exec } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync, appendFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { get as httpsGet } from 'node:https';

const execAsync = promisify(exec);

const APP_NAME = 'gopeak-cli';
const PACKAGE_NAME = 'gopeak-cli';
const GITHUB_REPO = 'HaD0Yun/Gopeak-godot-Cli';
const REPO_URL = `https://github.com/${GITHUB_REPO}`;
const FLOW_DIR = join(homedir(), '.gopeak-cli');
const LAST_CHECK_FILE = join(FLOW_DIR, 'last-check');
const NOTIFY_FILE = join(FLOW_DIR, 'notify');
const ONBOARDING_SHOWN_FILE = join(FLOW_DIR, 'onboarding-shown');
const STAR_PROMPTED_FILE = join(FLOW_DIR, 'star-prompted');
const DETECTABLE_COMMANDS = ['claude', 'claudecode', 'codex', 'gemini', 'copilot', 'opencode', 'omx'] as const;
const SUPPORTED_CLI_COMMANDS = DETECTABLE_COMMANDS;

export {
  APP_NAME,
  PACKAGE_NAME,
  GITHUB_REPO,
  GITHUB_BRANCHES,
  REPO_URL,
  FLOW_DIR,
  LAST_CHECK_FILE,
  NOTIFY_FILE,
  ONBOARDING_SHOWN_FILE,
  STAR_PROMPTED_FILE,
  DETECTABLE_COMMANDS,
  SUPPORTED_CLI_COMMANDS,
};

export function ensureFlowDir(): void {
  if (!existsSync(FLOW_DIR)) {
    mkdirSync(FLOW_DIR, { recursive: true });
  }
}

export function ensureGodotFlowDir(): void {
  ensureFlowDir();
}

export function appendText(filePath: string, text: string): void {
  appendFileSync(filePath, text);
}

export function getLocalVersion(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, '..', '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: string };
    return typeof pkg.version === 'string' ? pkg.version : '0.0.0';
  } catch {
    return '0.0.0';
  }
}

export function fetchLatestVersion(): Promise<string | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(null), 5000);
    httpsGet(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`, (res) => {
      let data = '';
      res.on('data', (chunk: Buffer) => {
        data += chunk;
      });
      res.on('end', () => {
        clearTimeout(timeout);
        try {
          const parsed = JSON.parse(data) as { version?: string };
          resolve(typeof parsed.version === 'string' ? parsed.version : null);
        } catch {
          resolve(null);
        }
      });
      res.on('error', () => {
        clearTimeout(timeout);
        resolve(null);
      });
    }).on('error', () => {
      clearTimeout(timeout);
      resolve(null);
    });
  });
}

export function compareSemver(a: string, b: string): number {
  const aParts = a.replace(/^v/, '').split('.').map((part) => Number.parseInt(part, 10));
  const bParts = b.replace(/^v/, '').split('.').map((part) => Number.parseInt(part, 10));

  for (let index = 0; index < 3; index += 1) {
    const aValue = aParts[index] ?? 0;
    const bValue = bParts[index] ?? 0;
    if (aValue > bValue) {
      return 1;
    }
    if (aValue < bValue) {
      return -1;
    }
  }

  return 0;
}

export function isCacheFresh(maxAgeSeconds = 86400): boolean {
  try {
    if (!existsSync(LAST_CHECK_FILE)) {
      return false;
    }
    const timestamp = Number.parseInt(readFileSync(LAST_CHECK_FILE, 'utf8').trim(), 10);
    return Number.isFinite(timestamp) && ((Date.now() / 1000) - timestamp) < maxAgeSeconds;
  } catch {
    return false;
  }
}

export function updateCacheTimestamp(): void {
  ensureFlowDir();
  writeFileSync(LAST_CHECK_FILE, String(Math.floor(Date.now() / 1000)));
}

export function writeNotifyFile(message: string): void {
  ensureFlowDir();
  writeFileSync(NOTIFY_FILE, message);
}

export function clearNotifyFile(): void {
  try {
    if (existsSync(NOTIFY_FILE)) {
      unlinkSync(NOTIFY_FILE);
    }
  } catch {
    // ignore cleanup errors
  }
}

export function getShellName(): 'bash' | 'zsh' {
  const shell = process.env.SHELL ?? '';
  return shell.includes('zsh') ? 'zsh' : 'bash';
}

export function getShellRcFile(): string {
  return join(homedir(), getShellName() === 'zsh' ? '.zshrc' : '.bashrc');
}

export async function commandExists(command: string): Promise<boolean> {
  try {
    await execAsync(`command -v ${command}`);
    return true;
  } catch {
    return false;
  }
}

export async function detectAvailableCommands(commands = [...DETECTABLE_COMMANDS]): Promise<string[]> {
  const detected: string[] = [];
  for (const command of commands) {
    if (await commandExists(command)) {
      detected.push(command);
    }
  }
  return detected;
}

export async function runCommand(command: string): Promise<{ stdout: string; stderr: string; code: number }> {
  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      code: 0,
    };
  } catch (error: unknown) {
    const normalized = error as { stdout?: string; stderr?: string; code?: number };
    return {
      stdout: (normalized.stdout ?? '').trim(),
      stderr: (normalized.stderr ?? '').trim(),
      code: normalized.code ?? 1,
    };
  }
}
