import "./style.css";
import { createState, mount, on } from "observus";
import { button, div } from "observus/tags";
import { defaultToast, initToaster } from "./lib/toaster";

const { showToast, toastsContainer } = initToaster();

const counter = createState<number>(0);

const app = div(
  toastsContainer,
  button(
    "Click",
    on("click", () => {
      counter.update((c) => c + 1);
      showToast(defaultToast(counter.value.toString()));
    }),
  ),
);

mount(document.querySelector("#app")!, app);
