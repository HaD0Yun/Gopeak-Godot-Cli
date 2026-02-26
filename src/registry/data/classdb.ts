import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const classdbTools: FunctionDefinition[] = [
  {
    name: "list_class_methods",
    description: "List methods for an engine class with full signature metadata including argument names, type IDs, class_name constraints, return type information, and method flags.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Engine class name to introspect (e.g., 'Node3D', 'Control', 'AnimationPlayer')."
        },
        "includeInherited": {
          "type": "boolean",
          "description": "Include methods inherited from parent classes (default: false)."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "list_class_signals",
    description: "List all declared signals for a class with argument metadata so automation can bind callbacks with correct argument order and types.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Engine class name to inspect for signals."
        },
        "includeInherited": {
          "type": "boolean",
          "description": "Include signals inherited from parent classes (default: false)."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "list_class_enums",
    description: "Enumerate class enum definitions and resolved integer values for each enum constant, optionally including inherited enums.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Engine class name to inspect for enum declarations."
        },
        "includeInherited": {
          "type": "boolean",
          "description": "Include enums inherited from parent classes (default: false)."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "list_class_constants",
    description: "List integer constants defined on a class with resolved numeric values, useful for generating robust tool-time code that references ClassDB constants.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Engine class name to inspect for integer constants."
        },
        "includeInherited": {
          "type": "boolean",
          "description": "Include constants inherited from parent classes (default: false)."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "list_class_properties",
    description: "List class properties and their metadata from ClassDB, including type IDs, hint/hint_string constraints, usage flags, and class_name restrictions.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Engine class name to inspect for property definitions."
        },
        "includeInherited": {
          "type": "boolean",
          "description": "Include properties inherited from parent classes (default: false)."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "check_class_compatibility",
    description: "Validate class compatibility against ClassDB by checking class existence, optional parent-class relationship, and runtime instantiability.",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Class name to validate."
        },
        "parentClass": {
          "type": "string",
          "description": "Optional parent class that className should inherit from or equal."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
  {
    name: "instantiate_class_dynamic",
    description: "Instantiate a class dynamically through ClassDB.instantiate() and return runtime instance metadata (resolved class, parent, and object category flags).",
    inputSchema: {
      "type": "object",
      "properties": {
        "className": {
          "type": "string",
          "description": "Class name to instantiate dynamically."
        }
      },
      "required": ["className"]
    },
    category: FunctionCategory.ClassDB,
    executionPath: "headless",
  },
];
