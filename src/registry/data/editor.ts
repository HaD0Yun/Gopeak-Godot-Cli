import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const editorTools: FunctionDefinition[] = [
  {
    name: "editor_scan_filesystem_changes",
    description: "Trigger EditorFileSystem rescan in editor context.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_reimport_files",
    description: "Reimport asset files through the editor import pipeline.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "assetPaths": { "type": "array", "items": { "type": "string" }, "description": "Resource paths to reimport." }
      },
      "required": ["projectPath", "assetPaths"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_get_setting",
    description: "Read a single EditorSettings key.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "settingKey": { "type": "string", "description": "EditorSettings key to read." }
      },
      "required": ["projectPath", "settingKey"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_set_setting",
    description: "Write a single EditorSettings key.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "settingKey": { "type": "string", "description": "EditorSettings key to write." },
        "value": { "description": "Setting value to apply." }
      },
      "required": ["projectPath", "settingKey", "value"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_batch_get_settings",
    description: "Read multiple EditorSettings keys in a single call.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "settingKeys": { "type": "array", "items": { "type": "string" }, "description": "EditorSettings keys to read." }
      },
      "required": ["projectPath", "settingKeys"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_batch_set_settings",
    description: "Write multiple EditorSettings keys from a map.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "settingsMap": { "type": "object", "description": "Map of setting key/value pairs." }
      },
      "required": ["projectPath", "settingsMap"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_get_editor_paths",
    description: "Return editor config/data/cache path information.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_open_scene",
    description: "Open a scene in editor context by path.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scenePath": { "type": "string", "description": "Scene path to open." }
      },
      "required": ["projectPath", "scenePath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_save_scene",
    description: "Save currently edited scene in the editor.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scenePath": { "type": "string", "description": "Optional scene path context." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_save_scene_as",
    description: "Save scene under a new target path in editor context.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "sourceScenePath": { "type": "string", "description": "Source scene path to open before save-as." },
        "targetScenePath": { "type": "string", "description": "Target scene path for save-as." }
      },
      "required": ["projectPath", "targetScenePath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_close_scene",
    description: "Close scene tab in editor context.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scenePath": { "type": "string", "description": "Optional scene path to close." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_list_open_scenes",
    description: "List currently open scenes in the editor.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_set_current_scene",
    description: "Switch current editor scene by opening target scene path.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scenePath": { "type": "string", "description": "Scene path to make current." }
      },
      "required": ["projectPath", "scenePath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_select_node",
    description: "Select a node in the current edited scene in editor context.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "nodePath": { "type": "string", "description": "Node path to select." },
        "scenePath": { "type": "string", "description": "Optional scene path to open before selecting." }
      },
      "required": ["projectPath", "nodePath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
  {
    name: "editor_get_selected_nodes",
    description: "Get selected nodes from editor selection state.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scenePath": { "type": "string", "description": "Optional scene path to open before reading selection." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Editor,
    executionPath: "headless",
  },
];
