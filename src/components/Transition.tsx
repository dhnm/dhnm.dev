import { component$, useSignal, Slot } from "@builder.io/qwik";
import type { PropsOf, Signal } from "@builder.io/qwik";
import { useCSSTransition } from "qwik-transition";
import clsx from "clsx";

type TransitionProps = PropsOf<"div"> & {
  show?: Signal<boolean>;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
};

export default component$(
  ({
    show,
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo,
    ...props
  }: TransitionProps) => {
    const onOff = useSignal(true);
    const leaveDurationMatch = leave?.match(/\d+/);
    const { stage, shouldMount } = useCSSTransition(show || onOff, {
      timeout: leaveDurationMatch ? parseInt(leaveDurationMatch[0]) : 0,
    });

    if (!shouldMount.value) {
      return null;
    }

    let className: string | null = null;

    switch (stage.value) {
      case "enterFrom":
        className = clsx(enter, enterFrom);
        break;
      case "enterTo":
        className = clsx(enter, enterTo);
        break;
      case "leaveFrom":
        className = clsx(leave, leaveFrom);
        break;
      case "leaveTo":
        className = clsx(leave, leaveTo);
        break;
    }

    return (
      <div class={clsx("transition", className)} {...props}>
        <Slot />
      </div>
    );
  },
);
