<template>
  <!-- Regular -->
  <div class="h-[500px]">
    <VanillaCard
      title="Payment Methods"
      subtitle="Here you can have your favorite payments methods"
    >

		    <template #actions>
				    <VanillaDropdown text="Options">
						    <VanillaDropdownOption>
								    <span>Copy Stuff</span>
						    </VanillaDropdownOption>
						    <VanillaDropdownOption>
								    <span>Mark as Done</span>
						    </VanillaDropdownOption>
				    </VanillaDropdown>
		    </template>

		    <div class="p-5 text-sm">
				    <span>Some content on the card</span>
		    </div>


		    <VanillaCardFooter class="space-x-2">
				    <VanillaButton label="Resets"/>
				    <VanillaButton label="Submit" variant="primary"/>
		    </VanillaCardFooter>

    </VanillaCard>
  </div>
</template>


<script setup type="ts">
import {
		VanillaCard,
		VanillaDropdown,
		VanillaDropdownOption,
		VanillaCardFooter,
		VanillaButton,
} from '@indigit/vanilla-components';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleCard' });
onMounted(() => window.parent.postMessage('mounted', '*'));
</script>
