# Text Input

Native styled Text inputs with Tailwind CSS

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop          | Description                | Accepted Values | Default |
|:--------------|:---------------------------|:----------------|:--------|
| `placeholder` | Placeholder for this input | String          | `''`    |

## Events

Events Emmit for this Component

| Event        | Description   | Parameters |
|:-------------|:--------------|:-----------|
| `modelValue` | Value emitted | `$event`   |

## Slots

Slots Available for this Components

| Name | Description | Parameters |
|:-----|:------------|:-----------|
!!!include(./docs/guide/includes/slots-default.md)!!!

## Example & Snippet
```vue
<template>
    <VanillaAvatar 
        v-model="value"
        :feedback="'Im useful helper out here, choose wisely'"
        placeholder="Elon Musk"
    />
</template>
<script lang="ts">
import { VanillaAvatar } from '@vanilla-components';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
        VanillaAvatar
    },
    setup() {
        const value = ref(null);
        return {
            value,
        };
    },
});
</script>
```

## Preview
<wrapper src="components/Avatar/demo" />
