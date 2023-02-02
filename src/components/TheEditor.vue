<template>
  <div
      :style="{
        'color': store.textColor
      }"
      :class="store.textType"
      class="break-all">
    {{ (preview || store).content }}
  </div>
</template>

<script setup lang="ts">
import { store, preview } from "~/composables/store";

</script>

