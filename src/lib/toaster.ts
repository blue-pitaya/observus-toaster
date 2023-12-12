import {
  AttrStringValue,
  ObservusElement,
  createState,
  tagsSignal,
} from "observus";
import { cls } from "observus/attributes";
import { StyleObj, styleObj } from "observus/helpers";
import { div } from "observus/tags";

export interface ToasterModule {
  toastsContainer: ObservusElement<HTMLDivElement>;
  showToast: (toast: Toast) => void;
}

interface Toast {
  msg: string;
  durationMs: number;
  style: StyleObj;
  cls: AttrStringValue;
}

export function defaultToast(msg: string): Toast {
  return {
    msg,
    durationMs: 3000,
    style: {},
    cls: "",
  };
}

export const defaultContainerStyle: StyleObj = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  maxWidth: "50%",
  transform: "translateX(-50%)",
};

function removed<A>(e: A, arr: A[]): A[] {
  const idx = arr.indexOf(e);
  if (idx > -1) {
    arr.splice(idx, 1);
  }
  return arr;
}

export function initToaster(
  containerStyle: StyleObj = defaultContainerStyle,
  containerCls: AttrStringValue = undefined,
): ToasterModule {
  const toasts = createState<Toast[]>([]);

  function showToast(toast: Toast) {
    toasts.update((ts) => {
      ts.push(toast);

      setTimeout(() => {
        toasts.update((ts) => removed(toast, ts));
      }, toast.durationMs);

      return ts;
    });
  }

  const toastElements = toasts.map((ts) =>
    ts.map((t) => div(cls(t.cls), styleObj(t.style), t.msg)),
  );
  const container = div(
    cls(containerCls),
    styleObj(containerStyle),
    tagsSignal(toastElements),
  );

  return {
    toastsContainer: container,
    showToast,
  };
}
