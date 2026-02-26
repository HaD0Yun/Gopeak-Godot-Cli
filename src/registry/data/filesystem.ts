import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const filesystemTools: FunctionDefinition[] = [
  {
    name: "list_project_tree",
    description: "List project files and directories recursively from a given root path. Returns a structured tree with node type and path so agents can reason about project layout before editing.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "rootPath": {
          "type": "string",
          "description": "Starting path to inspect (res:// or absolute path). Default: res://"
        },
        "recursive": {
          "type": "boolean",
          "description": "If true (default), include subdirectories recursively."
        },
        "includeHidden": {
          "type": "boolean",
          "description": "If true, include dotfiles and hidden directories. Default: false."
        }
      },
      "required": [
        "projectPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "find_files_by_pattern",
    description: "Search project files by glob-like pattern and optional extension filters. Useful for locating candidate files before analysis, refactor, or batch edits.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "rootPath": {
          "type": "string",
          "description": "Root folder to search from (res:// or absolute path)."
        },
        "pattern": {
          "type": "string",
          "description": "Filename/path pattern (supports wildcard matching) used during recursive search."
        },
        "extensions": {
          "type": "array",
          "description": "Optional extension whitelist (e.g., [\"gd\", \"tscn\"]).",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "projectPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "read_text_file",
    description: "Read text file contents with optional line-range slicing. Returns content and line count for safe partial inspection of large files.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "filePath": {
          "type": "string",
          "description": "Target file path to read (res:// relative or absolute)."
        },
        "startLine": {
          "type": "number",
          "description": "Optional 1-based start line for partial reads."
        },
        "endLine": {
          "type": "number",
          "description": "Optional 1-based inclusive end line for partial reads."
        }
      },
      "required": [
        "projectPath",
        "filePath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "write_text_file",
    description: "Write full text content to a file path, optionally creating missing parent directories. Use for deterministic file generation and scripted updates.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "filePath": {
          "type": "string",
          "description": "Target file path to write (res:// relative or absolute)."
        },
        "content": {
          "type": "string",
          "description": "Text payload to store in the file."
        },
        "createDirs": {
          "type": "boolean",
          "description": "If true (default), create missing parent directories before write."
        }
      },
      "required": [
        "projectPath",
        "filePath",
        "content"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "ensure_directory",
    description: "Ensure a directory exists by creating it and any missing parent folders. Safe primitive for setup and scaffolding workflows.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "dirPath": {
          "type": "string",
          "description": "Directory path to create (res:// relative or absolute)."
        }
      },
      "required": [
        "projectPath",
        "dirPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "copy_path",
    description: "Copy a file or directory tree to a new location with optional overwrite control. Supports recursive directory copy for bulk asset or script moves.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "sourcePath": {
          "type": "string",
          "description": "Source file or directory path."
        },
        "targetPath": {
          "type": "string",
          "description": "Destination file or directory path."
        },
        "overwrite": {
          "type": "boolean",
          "description": "If true, replace existing destination content. Default: false."
        }
      },
      "required": [
        "projectPath",
        "sourcePath",
        "targetPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "move_path",
    description: "Move or rename a file/directory path with optional overwrite semantics. Use for atomic reorganizations where source should be removed after transfer.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "sourcePath": {
          "type": "string",
          "description": "Existing file or directory path to move."
        },
        "targetPath": {
          "type": "string",
          "description": "New destination path."
        },
        "overwrite": {
          "type": "boolean",
          "description": "If true, remove destination first when it exists. Default: false."
        }
      },
      "required": [
        "projectPath",
        "sourcePath",
        "targetPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "delete_path",
    description: "Delete a file or directory path. Use recursive=true to remove non-empty directories safely in automation flows.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "path": {
          "type": "string",
          "description": "File or directory path to delete."
        },
        "recursive": {
          "type": "boolean",
          "description": "If true, recursively delete directory contents. Default: false."
        }
      },
      "required": [
        "projectPath",
        "path"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  },
  {
    name: "read_import_metadata",
    description: "Read and parse an asset's .import metadata file to inspect importer type, source mapping, and configured import parameters.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "assetPath": {
          "type": "string",
          "description": "Asset path (without .import suffix) whose import metadata should be inspected."
        }
      },
      "required": [
        "projectPath",
        "assetPath"
      ]
    },
    category: FunctionCategory.FileSystem,
    executionPath: "headless",
  }
];
