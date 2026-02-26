import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const geometryTools: FunctionDefinition[] = [
  {
    name: "create_array_mesh",
    description: "Create an ArrayMesh resource from provided surface arrays and save it.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "targetPath": { "type": "string", "description": "Output mesh resource path (e.g., meshes/generated_mesh.tres)." },
        "surfaces": {
          "type": "array",
          "description": "Surface array definitions containing vertices/normals/uvs/indices/materialPath.",
          "items": {
            "type": "object",
            "properties": {
              "vertices": { "type": "array", "items": { "type": "object" } },
              "normals": { "type": "array", "items": { "type": "object" } },
              "uvs": { "type": "array", "items": { "type": "object" } },
              "indices": { "type": "array", "items": { "type": "number" } },
              "materialPath": { "type": "string" }
            }
          }
        }
      },
      "required": ["projectPath", "targetPath", "surfaces"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "append_surface_to_mesh",
    description: "Append a new surface to an existing ArrayMesh resource.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "meshPath": { "type": "string", "description": "Existing ArrayMesh resource path." },
        "surfaceArrays": { "type": "object", "description": "Surface arrays object with vertices/normals/uvs/indices." },
        "materialPath": { "type": "string", "description": "Optional material resource path to assign to appended surface." }
      },
      "required": ["projectPath", "meshPath", "surfaceArrays"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "analyze_mesh_structure",
    description: "Inspect a mesh and return per-surface structural statistics.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "meshPath": { "type": "string", "description": "Mesh resource path to analyze." }
      },
      "required": ["projectPath", "meshPath"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "create_trimesh_collision_shape",
    description: "Create a ConcavePolygonShape3D collision resource from mesh geometry.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "meshPath": { "type": "string", "description": "Source mesh path." },
        "targetPath": { "type": "string", "description": "Output collision shape path (.tres)." }
      },
      "required": ["projectPath", "meshPath", "targetPath"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "create_convex_collision_shape",
    description: "Create a ConvexPolygonShape3D collision resource from mesh geometry.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "meshPath": { "type": "string", "description": "Source mesh path." },
        "targetPath": { "type": "string", "description": "Output collision shape path (.tres)." },
        "clean": { "type": "boolean", "description": "Whether to clean points before convex generation." },
        "simplify": { "type": "boolean", "description": "Whether to simplify generated convex hull." }
      },
      "required": ["projectPath", "meshPath", "targetPath"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "create_curve2d",
    description: "Create and save a Curve2D resource from point and tangent data.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "targetPath": { "type": "string", "description": "Output Curve2D resource path." },
        "points": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "x": { "type": "number" },
              "y": { "type": "number" },
              "inX": { "type": "number" },
              "inY": { "type": "number" },
              "outX": { "type": "number" },
              "outY": { "type": "number" }
            },
            "required": ["x", "y"]
          }
        },
        "closed": { "type": "boolean", "description": "Whether curve should be closed." }
      },
      "required": ["projectPath", "targetPath", "points"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
  {
    name: "create_curve3d",
    description: "Create and save a Curve3D resource from point and tangent data.",
    inputSchema: {
      "type": "object",
      "properties": {
        "projectPath": { "type": "string", "description": "Absolute path to project directory containing project.godot." },
        "targetPath": { "type": "string", "description": "Output Curve3D resource path." },
        "points": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "x": { "type": "number" },
              "y": { "type": "number" },
              "z": { "type": "number" },
              "inX": { "type": "number" },
              "inY": { "type": "number" },
              "inZ": { "type": "number" },
              "outX": { "type": "number" },
              "outY": { "type": "number" },
              "outZ": { "type": "number" }
            },
            "required": ["x", "y", "z"]
          }
        },
        "closed": { "type": "boolean", "description": "Whether curve should be closed." }
      },
      "required": ["projectPath", "targetPath", "points"]
    },
    category: FunctionCategory.Geometry,
    executionPath: "headless",
  },
];
