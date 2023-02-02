import { useStorage } from "@vueuse/core";
import * as themes from "~/themes";
import { ref, watch } from "vue";
import { createTheme, Theme } from "./theme-utils";
import { DEFAULT_CONTENT, DEFAULT_THEME, MIN_FRAME_WIDTH } from "~/constants";
import { WindowControls } from "~/types";
import {ColorInputWithoutInstance} from "tinycolor2";

export const preview = ref<{
  content: string;
  theme: string;
  name: string;
  title: string;
  username: string;
  paddingX: number;
  paddingY: number;
  frameWidth: number;
  picture: string;
  reflection: boolean;
  showBadge: boolean;
  showLineNumbers: boolean;
  windowControls: WindowControls;
  textColor: string;
  textType: string;
} | null>(null);

export const store = useStorage("custimony-studio", {
  currentTheme: DEFAULT_THEME,
  useAltBackground: false,
  name: "",
  username: "",
  picture: "",
  title: "",
  showBadge: true,
  expandTwitterOptions: true,
  showBackground: true,
  reflection: true,
  windowControls: WindowControls.None,
  modifiedContent: "",
  paddingX: 0,
  paddingY: 0,
  frameHeight: 0,
  frameWidth: 720,
  content: DEFAULT_CONTENT,
  textColor: ref<ColorInputWithoutInstance>("white"),
  textType: 'font-sans',
});

export const isExporting = ref(false);
export const theme = ref(
  createTheme((themes as Record<string, Theme>)[preview.value ? preview.value.theme : store.value.currentTheme])
);

watch(
  () => store.value.currentTheme,
  (newTheme) => {
    theme.value = createTheme((themes as Record<string, Theme>)[newTheme]);
  }
);

// Data migrations
store.value.windowControls = store.value.windowControls ?? WindowControls.MacOutline;
store.value.paddingX = store.value.paddingX || 32;
store.value.paddingY = store.value.paddingY || 32;
store.value.frameWidth = store.value.frameWidth || MIN_FRAME_WIDTH;
store.value.title = store.value.title || "";

if (import.meta.hot) {
  import.meta.hot.accept("../themes/index.ts", (newModule) => {
    theme.value = createTheme((newModule as Record<string, Theme>)[store.value.currentTheme]);
  });
}
