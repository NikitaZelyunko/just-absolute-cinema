<template>
  <NuxtPopover
    :reference="props.reference ?? undefined"
    :open="open"
    :dismissible="props.dismissible"
    :portal="'#app-popover-portal'"
    :content="{ side: props.side, sideFlip: props.sideFlip, positionStrategy: 'absolute' }"
    :ui="{ content: 'w-full' }"
    @update:open="changeOpenValue"
  >
    <template #anchor v-if="$slots.anchor">
      <slot name="anchor"></slot>
    </template>

    <template #content>
      <slot name="header" v-if="$slots.header"></slot>
      <div v-else class="mb-4 flex items-center gap-4">
        <h2 class="text-highlighted font-semibold"><slot name="title"></slot></h2>

        <NuxtButton color="neutral" variant="ghost" icon="i-lucide-x" @click="close" />
      </div>
      <slot name="content"></slot>
    </template>
  </NuxtPopover>
</template>

<script lang="ts" setup>
import type { ReferenceElement } from './reference-element';

const open = defineModel<boolean>({ default: false });

const props = withDefaults(
  defineProps<{
    /** Ссылка на элемент относительно которого должен отображаться поповер  */
    reference?: ReferenceElement | null;
    /** Возможность скрывать по клику вне поповера */
    dismissible?: boolean;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideFlip?: boolean;
  }>(),
  { dismissible: true, sideFlip: true, side: 'top' },
);

function changeOpenValue(newValue: boolean) {
  open.value = newValue;
}

function close() {
  changeOpenValue(false);
}
</script>
