<template>
  <!-- Regular -->
  <div class="h-[500px]">
    <VanillaCard
      title="Payment Methods"
      subtitle="Here you can have your favorite payments methods"
    >
		    <template #actions>
				    <!-- Regular -->
				    <VanillaDropdown
						    text="Options"
				    >
						    <!-- Option -->
						    <VanillaDropdownOption>
								    <span>Copy Stuff</span>
						    </VanillaDropdownOption>
						    <!-- Option -->
						    <VanillaDropdownOption>
								    <span>Mark as Done</span>
						    </VanillaDropdownOption>
				    </VanillaDropdown>
		    </template>
		    <div class="p-5 text-sm">
				    <span>Some content on the card</span>
		    </div>

    </VanillaCard>
  </div>
</template>


<script setup type="ts">
import { VanillaCard, VanillaButton, VanillaDropdown, VanillaDropdownOption } from '@indigit/vanilla-components';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleCard' });
onMounted(() => window.parent.postMessage('mounted', '*'));
</script>
