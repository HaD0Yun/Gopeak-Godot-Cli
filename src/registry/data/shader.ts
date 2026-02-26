import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const shaderTools: FunctionDefinition[] = [
  {
    name: "extract_shader_uniforms",
    description: "Parse a shader resource and return all declared uniforms with type and hint metadata.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "shaderPath": {
          "type": "string",
          "description": "Path to shader file relative to project or res:// path."
        }
      },
      "required": ["projectPath", "shaderPath"]
    },
    category: FunctionCategory.Shader,
    executionPath: "headless",
  },
  {
    name: "validate_shader_syntax",
    description: "Load and validate a shader by reading uniforms and constructing a ShaderMaterial.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": {
          "type": "string",
          "description": "Absolute path to project directory containing project.godot."
        },
        "shaderPath": {
          "type": "string",
          "description": "Path to shader file relative to project or res:// path."
        }
      },
      "required": ["projectPath", "shaderPath"]
    },
    category: FunctionCategory.Shader,
    executionPath: "headless",
  },
];
