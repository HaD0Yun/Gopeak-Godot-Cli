import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const utilityTools: FunctionDefinition[] = [
  {
    name: "get_system_info",
    description: "Return OS, CPU, executable, and engine version information from the current environment.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Utility,
    executionPath: "headless",
  },
  {
    name: "execute_external_command",
    description: "Execute an allowlisted external command and return exit code plus captured output.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "command": {
          "type": "string",
          "description": "Executable name to run (must be allowlisted by backend)."
        },
        "args": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Arguments passed to command."
        },
        "cwd": {
          "type": "string",
          "description": "Optional working directory override (may be restricted by backend)."
        },
        "timeoutMs": {
          "type": "number",
          "description": "Optional timeout in milliseconds."
        }
      },
      "required": ["projectPath", "command"]
    },
    category: FunctionCategory.Utility,
    executionPath: "headless",
  },
];
