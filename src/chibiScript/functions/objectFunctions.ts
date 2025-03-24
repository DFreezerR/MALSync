import type { ChibiCtx } from '../ChibiCtx';

export default {
  /**
   * Gets a property from an object by key
   * @input object - Object to get property from
   * @param key - Key to access the property
   * @returns Value at the specified key or undefined if not found
   * @example
   * get({user: {name: "John"}}, "user") // returns {name: "John"}
   */
  get: (ctx: ChibiCtx, input: any, key: string) => {
    if (!input || typeof input !== 'object') {
      return undefined;
    }

    return input[key];
  },

  /**
   * Gets all keys from an object
   * @input object - Object to get keys from
   * @returns Array of key strings
   * @example
   * keys({name: "John", age: 30}) // returns ["name", "age"]
   */
  keys: (ctx: ChibiCtx, input: any) => {
    if (!input || typeof input !== 'object') {
      return [];
    }

    return Object.keys(input);
  },

  /**
   * Gets all values from an object
   * @input object - Object to get values from
   * @returns Array of values
   * @example
   * values({name: "John", age: 30}) // returns ["John", 30]
   */
  values: (ctx: ChibiCtx, input: any) => {
    if (!input || typeof input !== 'object') {
      return [];
    }

    return Object.values(input);
  },
};
