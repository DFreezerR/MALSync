import type { ChibiCtx } from '../../ChibiCtx';
import type { ChibiJson } from '../../ChibiGenerator';
import { reservedKeys } from '../../ChibiRegistry';

export default {
  /**
   * Gets the current URL or URL from context
   * @input void - No input required
   * @returns Current URL as string
   */
  url: (ctx: ChibiCtx, input: void): string => {
    const url = ctx.get('url');

    if (url && typeof url === 'string') {
      return url;
    }

    return typeof window !== 'undefined' ? window.location.href : '';
  },

  /**
   * Gets the current provider from context
   * @returns Current provider as string
   */
  provider: (ctx: ChibiCtx, input: void): 'MAL' | 'ANILIST' | 'KITSU' | 'SIMKL' => {
    const provider = ctx.get('provider');

    if (!provider) {
      throw new Error('Provider not set');
    }

    return provider;
  },

  /**
   * Returns the input value immediately, stopping execution
   * @input any - Value to return
   * @returns The input value unchanged
   */
  return: (ctx: ChibiCtx, input: any): any => {
    return ctx.return(input);
  },

  /**
   * Gets a value from the variables in context
   * @input void - No input required
   * @param key - Variable name to retrieve
   * @param defaultValue - Default value if variable is not found
   * @returns Variable value or default value
   */
  getVariable: (ctx: ChibiCtx, input: void, key: string, defaultValue?: any): any => {
    const value = ctx.get(key);
    return value !== undefined ? value : defaultValue;
  },

  /**
   * Sets a variable in the context
   * @input any - Value to set if no value parameter is provided
   * @param key - Variable name to store the value under
   * @param value - Optional value to set instead of the input
   * @returns The input value (for chaining)
   */
  setVariable: (ctx: ChibiCtx, input: any, key: string, value?: ChibiJson<any>): any => {
    if (reservedKeys.includes(key)) {
      throw new Error(`Cannot set reserved key: ${key}`);
    }

    if (value !== undefined) {
      const resolvedValue = ctx.run(value);
      ctx.set(key, resolvedValue);
    } else {
      ctx.set(key, input);
    }
    return input;
  },

  /**
   * Gets a value from the global registry
   * @input void - No input required
   * @param key - Global variable name to retrieve
   * @param defaultValue - Default value if variable is not found
   * @returns Global variable value or default value
   */
  getGlobalVariable: (ctx: ChibiCtx, input: void, key: string, defaultValue?: any): any => {
    const value = ctx.globalGet(key);
    return value !== undefined ? value : defaultValue;
  },

  /**
   * Sets a variable in the global registry
   * @input any - Value to set if no value parameter is provided
   * @param key - Global variable name to store the value under
   * @param value - Optional value to set instead of the input
   * @returns The input value (for chaining)
   */
  setGlobalVariable: (ctx: ChibiCtx, input: any, key: string, value?: ChibiJson<any>): any => {
    if (reservedKeys.includes(key)) {
      throw new Error(`Cannot set reserved global key: ${key}`);
    }

    if (value !== undefined) {
      const resolvedValue = ctx.run(value);
      ctx.globalSet(key, resolvedValue);
    } else {
      ctx.globalSet(key, input);
    }
    return input;
  },

  // addStyle
  /**
   * Adds a style to the page
   * @param css - CSS to add to the page
   */
  addStyle: (ctx: ChibiCtx, input: void, css: string): void => {
    api.storage.addStyle(css);
  },

  /**
   * Logs a value to the console
   * @input any - Value to log
   * @param prefix - Optional prefix for the log
   * @returns The input value (for chaining)
   */
  log: <T>(ctx: ChibiCtx, input: T, prefix: string = 'ChibiScript'): T => {
    con.m(prefix).log(input);
    return input;
  },

  /**
   * Throws an error with custom message
   * @input any - Optional context for the error
   * @param message - Error message to throw
   * @returns Never returns, always throws
   */
  error: (ctx: ChibiCtx, input: any, message: string): never => {
    throw new Error(message);
  },
};
