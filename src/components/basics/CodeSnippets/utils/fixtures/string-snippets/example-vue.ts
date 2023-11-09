const exampleVue = `<template>
  <button type="button" :disabled="isDisabled">{{ label }}</button>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'button',
    props: {
      /**
       * Checks if the button should be disabled
       */
      label: {
        type: String,
        default: 'One',
      },
      /**
       * The display label of the button
       */
      isDisabled: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>`;

export default exampleVue;

export const exampleVueWithNameComment = `<!-- Button.vue -->
${exampleVue}`;
