<template>
		<VanillaCard
				as="form"
				title="Registration"
				variant="simple"
				subtitle="Register your account on Vanilla Components"
		>
				<VanillaInputGroup
						label="Address"
						name="address"
						class="space-y-2"
				>
						<VanillaInput name="address" placeholder="Ex: Abey Road"/>
						<VanillaInput name="country" placeholder="Portugal"/>
						<VanillaInput name="door" placeholder="Nº1" errors="Sorry but the door number is required"/>
				</VanillaInputGroup>

				<VanillaInputGroup
						label="Name"
						name="name"
						class="space-y-2"
				>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2">
								<VanillaInput name="name" placeholder="Pedro"/>
								<VanillaInput name="last_name" placeholder="Martins"/>
						</div>
						<div class="grid grid-cols-1">
							<VanillaInput name="last_name" placeholder="Martins" class="col-span-2"/>
						</div>
				</VanillaInputGroup>

				<VanillaInputGroup label="Occupation" name="occupation">
						<VanillaSelect
								name="occupation"
								v-model="occupation"
								:options="[
										{value: 'student', text: 'Student'},
										{value: 'working', text: 'Working'}
						    ]"
						/>
				</VanillaInputGroup>

				<VanillaInputGroup label="Where you found us?" name="where">
						<VanillaInput placeholder="Ex: Abey Road"/>
				</VanillaInputGroup>

				<VanillaInputGroup label="Where did you found us?" class="mt-4 space-y-4">

						<!-- Checkbox one -->
						<div class="flex items-start">
								<div class="h-5 flex items-center">
										<VanillaCheckbox
												v-model="valueMultiple"
												:value="'Google'"
												:checked-value="'Google'"
												name="google"
										/>
								</div>
								<div class="ml-3 text-sm">
										<VanillaFormLabel for="google" label="Google"></VanillaFormLabel>
										<p class="text-gray-500">Searching on Google</p>
								</div>
						</div>

						<!-- Checkbox Two -->
						<div class="flex items-start">
								<div class="h-5 flex items-center">
										<VanillaCheckbox
												v-model="valueMultiple"
												:value="'Facebook'"
												:checked-value="'Facebook'"
												name="facebook"
										/>
								</div>
								<div class="ml-3 text-sm">
										<VanillaFormLabel for="facebook" label="Facebook"></VanillaFormLabel>
										<p class="text-gray-500">Ads on Facebook</p>
								</div>
						</div>
				</VanillaInputGroup>

				<VanillaInputGroup layout="content">
					<span class="inline-flex text-sm text-center">Enjoyed it? Star us on Github</span>
				</VanillaInputGroup>

				<template #footerActions>
						<VanillaButton label="Resets"/>
						<VanillaButton label="Submit" variant="primary"/>
				</template>

		</VanillaCard>
</template>
<script setup type="ts">
import {
		VanillaInputGroup,
		VanillaInput,
		VanillaCard,
		VanillaSelect,
		VanillaCheckbox,
		VanillaFormLabel,
		VanillaButton,
} from '@indigit/vanilla-components';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleInputGroup' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const occupation = ref('student');
const valueMultiple = ref([]);
</script>
