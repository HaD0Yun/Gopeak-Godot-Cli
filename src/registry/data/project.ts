import type { FunctionDefinition } from '../../types/function.js';
import { FunctionCategory } from '../../types/registry.js';

export const projectTools: FunctionDefinition[] = [
  {
    name: "add_autoload",
    description: "Registers a script/scene as an autoload singleton. Use for global managers (GameManager, AudioManager, etc.). Loads automatically on game start.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "name": {
                "type": "string",
                "description": "Singleton name for global access (e.g., \"GameManager\", \"EventBus\")"
            },
            "path": {
                "type": "string",
                "description": "Path to .gd or .tscn file (e.g., \"autoload/game_manager.gd\")"
            },
            "enabled": {
                "type": "boolean",
                "description": "If true (default), autoload is active. Set false to temporarily disable."
            }
        },
        "required": [
            "projectPath",
            "name",
            "path"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "add_input_action",
    description: "Registers a new input action in project.godot InputMap. Use to set up keyboard, mouse, or gamepad controls for player actions like jump, move, attack.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "actionName": {
                "type": "string",
                "description": "Action name used in code (e.g., \"jump\", \"move_left\", \"attack\")"
            },
            "events": {
                "type": "array",
                "description": "Array of input events - each with type (key/mouse_button/joypad_button/joypad_axis) and binding details",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "key",
                                "mouse_button",
                                "joypad_button",
                                "joypad_axis"
                            ],
                            "description": "Input event type"
                        },
                        "keycode": {
                            "type": "string",
                            "description": "For key: key name (e.g., \"Space\", \"W\", \"Escape\")"
                        },
                        "button": {
                            "type": "number",
                            "description": "For mouse_button: 1=left, 2=right, 3=middle; For joypad: button number"
                        },
                        "axis": {
                            "type": "number",
                            "description": "For joypad_axis: axis number (0-3)"
                        },
                        "axisValue": {
                            "type": "number",
                            "description": "For joypad_axis: direction (-1 or 1)"
                        },
                        "ctrl": {
                            "type": "boolean",
                            "description": "For key: require Ctrl modifier"
                        },
                        "alt": {
                            "type": "boolean",
                            "description": "For key: require Alt modifier"
                        },
                        "shift": {
                            "type": "boolean",
                            "description": "For key: require Shift modifier"
                        }
                    },
                    "required": [
                        "type"
                    ]
                }
            },
            "deadzone": {
                "type": "number",
                "description": "Analog stick deadzone (0-1). Default: 0.5"
            }
        },
        "required": [
            "projectPath",
            "actionName",
            "events"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "disable_plugin",
    description: "Disables a plugin in the project. Updates project.godot automatically. Plugin files remain in addons/ folder.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "pluginName": {
                "type": "string",
                "description": "Plugin folder name in addons/ (e.g., \"dialogue_manager\", \"scatter\")"
            }
        },
        "required": [
            "projectPath",
            "pluginName"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "enable_plugin",
    description: "Enables a plugin from addons/ folder. Updates project.godot automatically. Use list_plugins first to see available plugins.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "pluginName": {
                "type": "string",
                "description": "Plugin folder name in addons/ (e.g., \"dialogue_manager\", \"scatter\")"
            }
        },
        "required": [
            "projectPath",
            "pluginName"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "export_project",
    description: "Exports the project to a distributable format. Use to build final game executables. Requires export templates installed.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "preset": {
                "type": "string",
                "description": "Export preset name from export_presets.cfg (e.g., \"Windows Desktop\", \"Linux/X11\")"
            },
            "outputPath": {
                "type": "string",
                "description": "Destination path for exported file (e.g., \"builds/game.exe\", \"builds/game.x86_64\")"
            },
            "debug": {
                "type": "boolean",
                "description": "If true, exports debug build. Default: false (release)"
            }
        },
        "required": [
            "projectPath",
            "preset",
            "outputPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "find_resource_usages",
    description: "Finds all files that reference a resource. Use before deleting or renaming to avoid breaking references.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "resourcePath": {
                "type": "string",
                "description": "Resource to search for (e.g., \"textures/player.png\")"
            },
            "fileTypes": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "File types to search. Default: [\"tscn\", \"tres\", \"gd\"]"
            }
        },
        "required": [
            "projectPath",
            "resourcePath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_dependencies",
    description: "Analyzes resource dependencies and detects circular references. Use to understand what a scene/script depends on before refactoring.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "resourcePath": {
                "type": "string",
                "description": "Path to analyze (e.g., \"scenes/player.tscn\", \"scripts/game.gd\")"
            },
            "depth": {
                "type": "number",
                "description": "How deep to traverse dependencies. -1 for unlimited. Default: -1"
            },
            "includeBuiltin": {
                "type": "boolean",
                "description": "If true, includes Godot built-in resources. Default: false"
            }
        },
        "required": [
            "projectPath",
            "resourcePath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_godot_version",
    description: "Returns the installed Godot engine version string. Use to check compatibility (e.g., Godot 4.4+ features like UID). Returns version like \"4.3.stable\" or \"4.4.dev\".",
    inputSchema: {
        "type": "object",
        "properties": {
            "reason": {
                "type": "string",
                "description": "Brief explanation of why you are calling this tool"
            }
        },
        "required": [
            "reason"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_project_health",
    description: "Generates a health report with scoring for project quality. Checks for unused resources, script errors, missing references, etc.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "includeDetails": {
                "type": "boolean",
                "description": "If true (default), includes detailed breakdown per category"
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_project_info",
    description: "Returns metadata about a Godot project including name, version, main scene, autoloads, and directory structure. Use to understand project before modifying. Requires valid project.godot.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_project_setting",
    description: "Reads a value from project.godot settings. Use to check game name, window size, physics settings, etc.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "setting": {
                "type": "string",
                "description": "Setting path (e.g., \"application/config/name\", \"display/window/size/width\", \"physics/2d/default_gravity\")"
            }
        },
        "required": [
            "projectPath",
            "setting"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "list_autoloads",
    description: "Lists all registered autoload singletons in the project. Shows name, path, and enabled status.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "list_export_presets",
    description: "Lists all export presets defined in export_presets.cfg. Use before export_project to see available targets (Windows, Linux, Android, etc.).",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "includeTemplateStatus": {
                "type": "boolean",
                "description": "If true (default), shows if export templates are installed."
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "list_plugins",
    description: "Lists all plugins in addons/ folder with enabled/disabled status. Use before enable_plugin or disable_plugin to see available plugins.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "list_projects",
    description: "Scans a directory for Godot projects (folders containing project.godot). Use to discover projects before using other tools. Returns array of {path, name}.",
    inputSchema: {
        "type": "object",
        "properties": {
            "directory": {
                "type": "string",
                "description": "Absolute path to search (e.g., \"/home/user/godot-projects\" on Linux, \"C:\\Games\" on Windows)"
            },
            "recursive": {
                "type": "boolean",
                "description": "If true, searches all subdirectories. If false (default), only checks immediate children."
            }
        },
        "required": [
            "directory"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "remove_autoload",
    description: "Unregisters an autoload singleton. Use to remove global managers no longer needed.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "name": {
                "type": "string",
                "description": "Singleton name to remove (e.g., \"GameManager\")"
            }
        },
        "required": [
            "projectPath",
            "name"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "scaffold_gameplay_prototype",
    description: "Creates a minimal playable prototype scaffold in one shot: main scene, player scene, basic nodes, common input actions, and optional starter player script.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot."
            },
            "scenePath": {
                "type": "string",
                "description": "Main scene path relative to project. Default: scenes/Main.tscn"
            },
            "playerScenePath": {
                "type": "string",
                "description": "Player scene path relative to project. Default: scenes/Player.tscn"
            },
            "includePlayerScript": {
                "type": "boolean",
                "description": "If true, creates scripts/player.gd starter script. Default: true"
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "search_project",
    description: "Searches for text or regex patterns across project files. Use to find function usages, variable references, or TODOs. Returns file paths and line numbers.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "query": {
                "type": "string",
                "description": "Search text or regex pattern (e.g., \"player\", \"TODO\", \"func.*damage\")"
            },
            "fileTypes": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "File extensions to search. Default: [\"gd\", \"tscn\", \"tres\"]"
            },
            "regex": {
                "type": "boolean",
                "description": "If true, treats query as regex. Default: false"
            },
            "caseSensitive": {
                "type": "boolean",
                "description": "If true, case-sensitive search. Default: false"
            },
            "maxResults": {
                "type": "number",
                "description": "Maximum results to return. Default: 100"
            }
        },
        "required": [
            "projectPath",
            "query"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "get_input_action_events",
    description: "Read a specific InputMap action configuration from project settings and return deadzone plus normalized event metadata for tooling and migration workflows.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "actionName": {
                "type": "string",
                "description": "Input action name to inspect (e.g., \"jump\", \"attack\")."
            }
        },
        "required": [
            "projectPath",
            "actionName"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "set_input_action_events",
    description: "Replace an input action's event bindings and deadzone in one call. Supports key, mouse button, joypad button, and joypad axis event definitions.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "actionName": {
                "type": "string",
                "description": "Input action name to create/update."
            },
            "events": {
                "type": "array",
                "description": "Event definitions to assign to the action.",
                "items": {
                    "type": "object"
                }
            },
            "deadzone": {
                "type": "number",
                "description": "Analog deadzone value (0-1). Default: 0.5"
            }
        },
        "required": [
            "projectPath",
            "actionName",
            "events"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "rename_input_action",
    description: "Rename an existing input action while preserving all bound events and deadzone settings. Fails when source does not exist or destination already exists.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "oldName": {
                "type": "string",
                "description": "Current input action name."
            },
            "newName": {
                "type": "string",
                "description": "New input action name."
            }
        },
        "required": [
            "projectPath",
            "oldName",
            "newName"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "list_project_layer_names",
    description: "List configured layer names for a domain (physics_2d, physics_3d, render, navigation) with index and backing project setting key.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "layerDomain": {
                "type": "string",
                "enum": [
                    "physics_2d",
                    "physics_3d",
                    "render",
                    "navigation"
                ],
                "description": "Layer domain to read names from."
            }
        },
        "required": [
            "projectPath",
            "layerDomain"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "set_project_layer_name",
    description: "Set a single named layer entry for a selected domain and index. Persists directly to project settings.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "layerDomain": {
                "type": "string",
                "enum": [
                    "physics_2d",
                    "physics_3d",
                    "render",
                    "navigation"
                ],
                "description": "Layer domain to modify."
            },
            "layerIndex": {
                "type": "number",
                "description": "Layer index (1-32)."
            },
            "layerName": {
                "type": "string",
                "description": "Display name for the selected layer index."
            }
        },
        "required": [
            "projectPath",
            "layerDomain",
            "layerIndex",
            "layerName"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "batch_get_project_settings",
    description: "Read multiple project settings in one request and return a key/value dictionary. Useful for diffing configuration snapshots.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "settingKeys": {
                "type": "array",
                "description": "Array of ProjectSettings keys to fetch.",
                "items": {
                    "type": "string"
                }
            }
        },
        "required": [
            "projectPath",
            "settingKeys"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "batch_set_project_settings",
    description: "Write multiple project settings in one operation and save once. Best for transactional configuration updates.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "settingsMap": {
                "type": "object",
                "description": "Dictionary mapping setting path -> value to apply before save."
            }
        },
        "required": [
            "projectPath",
            "settingsMap"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "update_export_preset_options",
    description: "Update export preset option values by preset name or numeric index in export_presets.cfg. Saves modified preset settings back to disk.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "presetNameOrIndex": {
                "type": "string",
                "description": "Preset identifier by display name or index string (e.g., \"Windows Desktop\" or \"0\")."
            },
            "options": {
                "type": "object",
                "description": "Dictionary of option keys and values to update for the target preset."
            }
        },
        "required": [
            "projectPath",
            "presetNameOrIndex",
            "options"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "set_main_scene",
    description: "Sets which scene loads first when the game starts. Updates application/run/main_scene in project.godot.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "scenePath": {
                "type": "string",
                "description": "Path to main scene (e.g., \"scenes/main_menu.tscn\", \"scenes/game.tscn\")"
            }
        },
        "required": [
            "projectPath",
            "scenePath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "set_project_setting",
    description: "Writes a value to project.godot settings. Use to configure game name, window size, physics, etc.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "setting": {
                "type": "string",
                "description": "Setting path (e.g., \"application/config/name\", \"display/window/size/width\")"
            },
            "value": {
                "type": "string",
                "description": "Value to set (Godot auto-converts types)"
            }
        },
        "required": [
            "projectPath",
            "setting",
            "value"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  },
  {
    name: "validate_project",
    description: "Checks project for export issues: missing resources, script errors, configuration problems. Use before export_project.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectPath": {
                "type": "string",
                "description": "Absolute path to project directory containing project.godot. Use the same path across all tool calls in a workflow."
            },
            "preset": {
                "type": "string",
                "description": "Optional: validate against specific export preset requirements"
            },
            "includeSuggestions": {
                "type": "boolean",
                "description": "If true (default), includes fix suggestions for each issue"
            }
        },
        "required": [
            "projectPath"
        ]
    },
    category: FunctionCategory.Project,
    executionPath: "headless",
  }
];
