import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const scriptanalysisTools: FunctionDefinition[] = [
  {
    name: "analyze_script_structure",
    description: "Analyze high-level GDScript structure including class identity, base type, methods, properties, signals, and constants. Useful for automated understanding before edits.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path to inspect (res:// relative or absolute)."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "validate_script_syntax",
    description: "Validate a GDScript file by compiling source through the script loader. Returns validity status and parse/compile errors for CI-style checks.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path to validate (res:// relative or absolute)."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "get_script_inheritance_chain",
    description: "Resolve inheritance chain for a script from itself through base scripts up to native engine class. Helps infer behavior and API surface quickly.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Target script path (res:// relative or absolute)."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "extract_script_dependencies",
    description: "Extract explicit preload/load references from script source to identify linked scenes/resources/scripts before refactors or moves.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path whose dependencies should be scanned."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "list_script_methods",
    description: "List script methods with argument metadata, return information, and flags. Supports private method filtering for API-focused introspection.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path to inspect."
        },
        "includePrivate": {
          "type": "boolean",
          "description": "If true, include methods starting with underscore. Default: false."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "list_script_signals",
    description: "List custom signals defined by a script along with argument metadata. Useful for discovering event contracts in gameplay systems.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path to inspect for signals."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "list_script_exported_properties",
    description: "List exported/editor-visible script properties with type and hint metadata. Helps automate inspector-aware tooling and content pipelines.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "Script path to inspect for exported properties."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "list_script_constants",
    description: "List constants declared in a GDScript file via the script constant map. Useful for enum-like values and compile-time configuration discovery.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "scriptPath": {
          "type": "string",
          "description": "GDScript path to inspect."
        }
      },
      "required": [
        "projectPath",
        "scriptPath"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  },
  {
    name: "create_script_from_template",
    description: "Generate a new script file from predefined templates (node, character, state_machine, autoload, resource) with placeholder substitutions.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "targetPath": {
          "type": "string",
          "description": "Destination script path to create."
        },
        "templateName": {
          "type": "string",
          "enum": [
            "node",
            "character",
            "state_machine",
            "autoload",
            "resource"
          ],
          "description": "Template identifier used for script generation."
        },
        "substitutions": {
          "type": "object",
          "description": "Dictionary of placeholder replacements applied to the template before file write."
        }
      },
      "required": [
        "projectPath",
        "targetPath",
        "templateName"
      ]
    },
    category: FunctionCategory.ScriptAnalysis,
    executionPath: "headless",
  }
];
