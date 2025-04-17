import type { ChibiCtx } from '../ChibiCtx';
import type { ChibiGenerator, ChibiJson } from '../ChibiGenerator';
import type * as CT from '../ChibiTypeHelper';

export default {
  /**
   * Conditional execution based on a condition
   * @input any
   * @param condition - Boolean condition to evaluate
   * @param thenAction - Action to execute if condition is true
   * @param elseAction - Action to execute if condition is false
   * @returns Result of either thenAction or elseAction based on condition
   * @example
   * $c.if(
   *  $c.boolean(true).run(),
   *  $c.string('hello').run(),
   *  $c.string('world').run()
   * ).concat('world').run(); // returns 'helloworld'
   */
  if<Input, Then extends ChibiJson<any>, Else extends ChibiJson<any>>(
    ctx: ChibiCtx,
    input: void,
    condition: ChibiJson<boolean>,
    thenAction: Then,
    elseAction: Else,
  ): CT.UnwrapJson<Then> | CT.UnwrapJson<Else> {
    const conditionState = ctx.run(condition);
    if (conditionState) {
      return ctx.run(thenAction);
    }
    return ctx.run(elseAction);
  },

  /**
   * Conditional execution based on a condition
   * @input condition - Boolean condition to evaluate
   * @param thenAction - Action to execute if condition is true
   * @returns Result of thenAction if condition is true, otherwise input
   * @example
   * $c.string('/anime/123').ifThen($c => $c.urlAbsolute().return().run()).boolean(false)
   */
  ifThen<Input, Then extends ($c: ChibiGenerator<Input>) => ChibiJson<any>>(
    ctx: ChibiCtx,
    input: Input,
    thenAction: Then,
  ): CT.UnwrapJson<ReturnType<Then>> | Input {
    if (input) {
      return ctx.run(thenAction as any, input);
    }
    return input;
  },
};
