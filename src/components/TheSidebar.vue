<template>
  <OnClickOutside @trigger="isExpanded = false">
    <aside>
      <div class="sm:hidden" :style="{ height: '57px' }"></div>
      <div
        class="fixed bottom-0 inset-x-0 border-t border-slate-700 sm:border-t-0 pwa:sm:border-t pwa:sm:border-t-slate-900 pwa:sm:shadow-[inset_0_1px_0_rgb(30_30_37)] sm:border-r content-start transition-[height] sm:transition-none sm:!h-screen sm:w-[240px] sm:static bg-yellow-500 sm:overflow-auto text-white"
        :style="{
          height: isExpanded ? `${expandableContentHeight + 57}px` : `57px`,
        }"
      >
        <div ref="expandableContent">
          <div class="grid gap-y-5 px-3 py-4">
            <div class="grid gap-y-2 justify-start">
              <label class="font-semibold text-xs">Themes</label>
              <div class="grid items-center gap-2 grid-cols-7">
                <button
                  v-for="theme in themes"
                  @click="setTheme(theme, $event)"
                  class="group rounded-full focus:outline-none"
                  :title="`Use ${theme.name} theme`"
                >
                  <div
                    class="w-6 h-6 border-2 border-black rounded-full group-hover:opacity-100 transition group-hover:scale-105 group-active:scale-95 group-focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,.21)] group-focus:ring-[3px] ring-white"
                    :class="{
                      'opacity-50': store.currentTheme !== theme.key,
                    }"
                    :style="{ background: theme.background }"
                  ></div>
                </button>
              </div>
            </div>

            <div class="grid gap-y-2">
              <div class="grid gap-y-1">
                <label for="language" class="font-semibold text-xs">Text Color</label>
                <color-picker roundHistory shape="circle" v-model:pureColor="store.textColor" v-model:gradientColor="gradientColor"/>
              </div>

              <div class="grid gap-y-1">
                <label for="textType" class="font-semibold text-xs">Text Font</label>
                <BaseSelect
                    id="textType"
                    :model-value="store.textType"
                    @update:model-value="setTextType"
                    :options="AVAILABLE_TEXT_TYPES"
                />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center grid-cols-[1fr_auto_auto] gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showBadge"
                  >Badge</label
                >
                <BaseSwitch v-model="store.showBadge" id="showBadge" />
              </div>

              <div v-if="store.showBadge" class="grid gap-y-1 gap-x-2 items-start grid-cols-[auto_1fr]">
                <div v-if="store.picture" class="row-start-1 row-end-3 relative group">
                  <BaseButton
                    @click="store.picture = ''"
                    class="h-5 w-5 absolute right-0 top-0 group-hover:opacity-100 opacity-0 bg-red-600/80 hover:bg-red-600 transition rounded-full justify-center text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      width="16"
                      height="16"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                    >
                      <g fill="currentColor">
                        <path
                          d="M7.172 14.243a1 1 0 1 1-1.415-1.415l7.071-7.07a1 1 0 0 1 1.415 1.414l-7.071 7.07Z"
                        ></path>
                        <path
                          d="M5.757 7.172a1 1 0 1 1 1.415-1.415l7.07 7.071a1 1 0 0 1-1.414 1.415l-7.07-7.071Z"
                        ></path>
                      </g>
                    </svg>
                  </BaseButton>
                  <img
                    :src="store.picture"
                    alt=""
                    class="w-14 h-14 border border-slate-700 bg-slate-700/30 rounded-full"
                  />
                </div>
                <label
                  v-else
                  class="w-14 h-14 border-2 border-slate-700 bg-slate-700/30 hover:bg-slate-700/50 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer rounded-full flex items-center justify-center row-start-1 row-end-3"
                >
                  <input type="file" class="sr-only" @change="handlePicture" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M172 56a4 4 0 0 1 4-4h20V32a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V60h-20a4 4 0 0 1-4-4Zm54.8 56.2A104.1 104.1 0 0 1 228 128a99.6 99.6 0 0 1-32.7 73.9l-.8.8a99.9 99.9 0 0 1-132.9 0a3.6 3.6 0 0 1-.9-.8A100 100 0 0 1 128 28a104.1 104.1 0 0 1 15.8 1.2a4 4 0 0 1 3.3 4.6a4 4 0 0 1-4.6 3.3A100 100 0 0 0 128 36a92 92 0 0 0-65.2 156.9a75.8 75.8 0 0 1 44.5-34.1a44 44 0 1 1 41.4 0a75.8 75.8 0 0 1 44.5 34.1A92.1 92.1 0 0 0 220 128a99 99 0 0 0-1.1-14.5a4 4 0 0 1 3.3-4.6a4 4 0 0 1 4.6 3.3ZM128 156a36 36 0 1 0-36-36a36 36 0 0 0 36 36Zm0 64a91.3 91.3 0 0 0 59.1-21.6a68 68 0 0 0-118.2 0A91.3 91.3 0 0 0 128 220Z"
                    ></path>
                  </svg>
                </label>

                <div class="grid gap-y-1 col-start-2">
                  <BaseInput
                    class="placeholder:text-slate-600/75"
                    type="text"
                    id="name"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="Name"
                    v-model="store.name"
                  />
                </div>

                <div class="grid gap-y-1 col-start-2">
                  <BaseInput
                    class="placeholder:text-slate-600/75"
                    type="text"
                    id="username"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="Tagline"
                    v-model="store.username"
                  />
                </div>
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="showBackground">Background</label>
                <BaseSwitch v-model="store.showBackground" id="showBackground" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="reflection">Glass Effect</label>
                <BaseSwitch v-model="store.reflection" id="reflection" />
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="paddingX">Padding X</label>
                <div class="grid gap-x-2 grid-flow-col text-sm">
                  <input
                    id="paddingX"
                    class="accent-black"
                    type="range"
                    min="32"
                    max="256"
                    step="8"
                    :value="store.paddingX"
                    @input="store.paddingX = parseInt(($event.target as HTMLInputElement).value)"
                  />
                </div>
              </div>

              <div class="grid grid-flow-col gap-y-2 items-center justify-between gap-x-2">
                <label class="font-semibold text-xs select-none cursor-pointer" for="paddingY">Padding Y</label>
                <div class="grid gap-x-2 grid-flow-col text-sm">
                  <input
                    id="paddingY"
                    class="accent-black"
                    type="range"
                    min="32"
                    max="128"
                    step="8"
                    :value="store.paddingY"
                    @input="store.paddingY = parseInt(($event.target as HTMLInputElement).value)"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-1 gap-2 fixed inset-x-0 bottom-0 py-2 px-3 bg-slate-800 sm:static sm:bg-transparent sm:px-3 sm:py-0"
        >
          <BaseButton
            class="bg-slate-700 text-slate-500 hover:bg-slate-700/80 group sm:hidden w-10 justify-center"
            @click="isExpanded = !isExpanded"
            square="w-10"
          >
            <IconChevronDown
              width="16"
              class="transition"
              :class="{
                'rotate-180': !isExpanded,
              }"
            />
          </BaseButton>
          <BaseButton
            class="border-2 border-black px-4 w-full hover:bg-yellow-800/40 group"
            @click="handleDownload"
          >
            <IconDownload width="16" class="group-hover:scale-110 transition-transform group-hover:rotate-6" />
            <span class="truncate">
              {{
                exportState === ExportState.PreparingToDownload
                  ? "..."
                  : exportState === ExportState.JustDownloaded
                  ? "Downloaded!"
                  : "Download Image"
              }}
            </span>
          </BaseButton>
        </div>
        <p class="p-4 text-sm text-right">Custimony Studio v0.0.1</p>
      </div>
    </aside>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { isExporting, store } from "~/composables/store";
import * as themes from "~/themes";
import BaseSwitch from "./BaseSwitch.vue";
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import IconDownload from "./IconDownload.vue";
import IconChevronDown from "./IconChevronDown.vue";
import { useElementSize } from "@vueuse/core";
import { Theme } from "~/composables/theme-utils";
import { exportState, ExportState } from "~/composables/export-state";
import { resizeImage, cropImage } from "~/composables/image";
import * as htmlToImage from "html-to-image";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import {AVAILABLE_TEXT_TYPES} from "~/constants";
import BaseSelect from "~/components/BaseSelect.vue";


const isExpanded = ref(false);
const timeout = ref();
const expandableContent = ref();
const { height: expandableContentHeight } = useElementSize(expandableContent);
const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

const downloadPng = (blob: Blob | null) => {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "screenshot.png";
  link.click();
  exportState.value = ExportState.JustDownloaded;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    exportState.value = ExportState.Idle;
  }, 1000);
};
const handleDownload = async () => {
  const frame = document.querySelector<HTMLDivElement>("[data-editor-frame]");
  if (!frame) return;
  exportState.value = ExportState.PreparingToDownload;
  isExporting.value = true;
  await nextTick();
  htmlToImage.toBlob(frame).then(function (blob) {
    isExporting.value = false;
    downloadPng(blob);
  });
};

function handlePicture(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const croppedImage = await cropImage(reader.result as string, 1);
      const resizedImage = await resizeImage(croppedImage, 56 * 2);
      store.value.picture = resizedImage.toDataURL(file.type);
    };
    reader.readAsDataURL(file);
  }
}
function setTheme(theme: Theme, event: MouseEvent) {
  store.value.currentTheme = theme.key;
  store.value.useAltBackground = event.altKey;
}

function setTextType(textType: string) {
  store.value.textType = textType;
}
</script>
