<template>
  <div class="h-[500px]">
    <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
      <!-- Button to Trigger Modal -->
      <VanillaButton
        :label="isOpen ? 'Close Modal' : 'Open Modal'"
        @click="toggle"
      />
    </div>
    <!-- Actual Modal -->
    <VanillaDialog
      v-model="isOpen"
      title="Payment successful"
      :initial-focus="initial?.$el"
    >
      <template #default="{classes}">
        <span :class="classes"> Im a content</span>
      </template>

      <template #footer>
        <VanillaButton
          :label="isOpen ? 'Close Modal' : 'Open Modal'"
          tabindex="2"
          @click="toggle"
        />
        <VanillaButton
          ref="initial"
          variant="primary"
          :label="'Ok Thank you'"
          focus-on-mount
        />
      </template>
    </VanillaDialog>
  </div>
</template>


<script setup type="ts">
import { VanillaDialog , VanillaButton } from '@indigit/vanilla-components';
import { onMounted, defineComponent, ref } from 'vue';

defineComponent({ name: 'ExampleDialog' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const isOpen = ref(false);
const toggle = () => isOpen.value = !isOpen.value;
const initial = ref(null);
</script>
