import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const localizationTools: FunctionDefinition[] = [
  {
    name: "list_translation_locales",
    description: "Scan translation resources and list available locales.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "scanPaths": { "type": "array", "items": { "type": "string" }, "description": "Paths to scan for .translation resources (default: ['res://'])." }
      },
      "required": ["projectPath"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
  {
    name: "get_translation_entry",
    description: "Read a translation message by key from a Translation resource.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "translationPath": { "type": "string", "description": "Path to .translation resource." },
        "key": { "type": "string", "description": "Message key to read." }
      },
      "required": ["projectPath", "translationPath", "key"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
  {
    name: "set_translation_entry",
    description: "Set or update a translation message key/value and save the resource.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "translationPath": { "type": "string", "description": "Path to .translation resource." },
        "key": { "type": "string", "description": "Message key to write." },
        "value": { "type": "string", "description": "Localized string value." }
      },
      "required": ["projectPath", "translationPath", "key", "value"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
  {
    name: "remove_translation_entry",
    description: "Remove a translation message key and save the resource.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "translationPath": { "type": "string", "description": "Path to .translation resource." },
        "key": { "type": "string", "description": "Message key to remove." }
      },
      "required": ["projectPath", "translationPath", "key"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
  {
    name: "export_translations_csv",
    description: "Export multiple Translation resources into a single CSV table keyed by message id.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "translationPaths": { "type": "array", "items": { "type": "string" }, "description": "Translation resource paths to export." },
        "csvPath": { "type": "string", "description": "Output CSV path." },
        "includeHeader": { "type": "boolean", "description": "Whether to include header row (default: true)." }
      },
      "required": ["projectPath", "translationPaths", "csvPath"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
  {
    name: "import_translations_csv",
    description: "Import translations from CSV and create/update Translation resources by locale columns.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "csvPath": { "type": "string", "description": "CSV file path to import." },
        "outputDir": { "type": "string", "description": "Directory where locale translation resources will be written." },
        "mergeMode": { "type": "string", "enum": ["overwrite", "merge"], "description": "Import strategy for existing translation files." }
      },
      "required": ["projectPath", "csvPath", "outputDir"]
    },
    category: FunctionCategory.Localization,
    executionPath: "headless",
  },
];
