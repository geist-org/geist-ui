/**
 * KeyBinding Codes
 * The content of this file is based on the design of the open source project "microsoft/vscode",
 *   Ref: https://github.com/microsoft/vscode/blob/main/src/vs/base/common/keyCodes.ts (MIT)
 *   Copyright (c) Microsoft Corporation. All rights reserved.
 *
 * We inherit the KeyMod values from "microsoft/vscode",
 * but use the Browser's KeyboardEvent event implementation, and all values are used only as identification.
 */

export enum KeyCode {
  Unknown = 0,
  Backspace = 1,
  Tab = 2,
  Enter = 3,
  PauseBreak = 7,
  CapsLock = 8,
  Escape = 9,
  Space = 10,
  PageUp = 11,
  PageDown = 12,
  End = 13,
  Home = 14,
  LeftArrow = 15,
  UpArrow = 16,
  RightArrow = 17,
  DownArrow = 18,
  Insert = 19,
  Delete = 20,
  KEY_0 = 21,
  KEY_1 = 22,
  KEY_2 = 23,
  KEY_3 = 24,
  KEY_4 = 25,
  KEY_5 = 26,
  KEY_6 = 27,
  KEY_7 = 28,
  KEY_8 = 29,
  KEY_9 = 30,
  KEY_A = 31,
  KEY_B = 32,
  KEY_C = 33,
  KEY_D = 34,
  KEY_E = 35,
  KEY_F = 36,
  KEY_G = 37,
  KEY_H = 38,
  KEY_I = 39,
  KEY_J = 40,
  KEY_K = 41,
  KEY_L = 42,
  KEY_M = 43,
  KEY_N = 44,
  KEY_O = 45,
  KEY_P = 46,
  KEY_Q = 47,
  KEY_R = 48,
  KEY_S = 49,
  KEY_T = 50,
  KEY_U = 51,
  KEY_V = 52,
  KEY_W = 53,
  KEY_X = 54,
  KEY_Y = 55,
  KEY_Z = 56,
  Meta = 57,
  ContextMenu = 58,
  F1 = 59,
  F2 = 60,
  F3 = 61,
  F4 = 62,
  F5 = 63,
  F6 = 64,
  F7 = 65,
  F8 = 66,
  F9 = 67,
  F10 = 68,
  F11 = 69,
  F12 = 70,
  F13 = 71,
  F14 = 72,
  F15 = 73,
  F16 = 74,
  F17 = 75,
  F18 = 76,
  F19 = 77,
  NumLock = 78,
  ScrollLock = 79,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ';:' key
   */
  US_SEMICOLON = 80,
  /**
   * For any country/region, the '+' key
   * For the US standard keyboard, the '=+' key
   */
  US_EQUAL = 81,
  /**
   * For any country/region, the ',' key
   * For the US standard keyboard, the ',<' key
   */
  US_COMMA = 82,
  /**
   * For any country/region, the '-' key
   * For the US standard keyboard, the '-_' key
   */
  US_MINUS = 83,
  /**
   * For any country/region, the '.' key
   * For the US standard keyboard, the '.>' key
   */
  US_DOT = 84,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '/?' key
   */
  US_SLASH = 85,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '`~' key
   */
  US_BACKTICK = 86,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '[{' key
   */
  US_OPEN_SQUARE_BRACKET = 87,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '\|' key
   */
  US_BACKSLASH = 88,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ']}' key
   */
  US_CLOSE_SQUARE_BRACKET = 89,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ''"' key
   */
  US_QUOTE = 90,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   */
  OEM_8 = 91,
  /**
   * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
   */
  OEM_102 = 92,
  NUMPAD_0 = 93,
  NUMPAD_1 = 94,
  NUMPAD_2 = 95,
  NUMPAD_3 = 96,
  NUMPAD_4 = 97,
  NUMPAD_5 = 98,
  NUMPAD_6 = 99,
  NUMPAD_7 = 100,
  NUMPAD_8 = 101,
  NUMPAD_9 = 102,
  NUMPAD_MULTIPLY = 103,
  NUMPAD_ADD = 104,
  NUMPAD_SEPARATOR = 105,
  NUMPAD_SUBTRACT = 106,
  NUMPAD_DECIMAL = 107,
  NUMPAD_DIVIDE = 108,
  /**
   * Cover all key codes when IME is processing input.
   */
  KEY_IN_COMPOSITION = 109,
  ABNT_C1 = 110,
  ABNT_C2 = 111,
  /**
   * Placed last to cover the length of the enum.
   * Please do not depend on this value!
   */
  MAX_VALUE = 112,
}

export enum KeyMod {
  CtrlCmd = (1 << 11) >>> 0,
  Shift = (1 << 10) >>> 0,
  Alt = (1 << 9) >>> 0,
  WinCtrl = (1 << 8) >>> 0,
}
