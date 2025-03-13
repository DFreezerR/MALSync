import { ChibiCtx } from './ChibiCtx';
import { UnknownChibiFunctionError } from './ChibiErrors';
import type { ChibiJson } from './ChibiGenerator';
import { ChibiReturn } from './ChibiReturn';
import functionsRegistry from './functions';

export class ChibiConsumer {
  private script: ChibiJson<any>;

  private ctx: ChibiCtx;

  private hasRun: boolean = false;

  constructor(script: ChibiJson<any>) {
    this.script = script;
    this.ctx = new ChibiCtx(this);
  }

  run() {
    if (this.hasRun) {
      throw new Error('Run method can only be executed once');
    }
    this.hasRun = true;
    const state = this._subroutine(this.script);

    if (state && state instanceof ChibiReturn) {
      return state.getValue();
    }

    return state;
  }

  _subroutine(script: ChibiJson<any>) {
    let state: any = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const [functionName, ...args] of script) {
      if (!functionsRegistry[functionName]) {
        throw new UnknownChibiFunctionError(functionName);
      }
      const func = functionsRegistry[functionName];
      state = func(this.ctx, state, ...args);

      if (state && state instanceof ChibiReturn) {
        return state;
      }
    }

    return state;
  }

  addVariable(name: string, value: any) {
    this.ctx.set(name, value);
  }
}
