<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="onModelValueUpdate"
    dir="rtl"
  >
    <q-card :style="styleObj">
      <q-card-section
        class="row items-center dialog-header-shadow q-pa-lg q-mb-md"
      >
        <div class="text-h6 font-bold">
          {{ title }}
        </div>
        <q-space />

        <div class="text-caption font-regular gray-text pointer" v-close-popup>
          <q-btn icon="highlight_off" size="sm" flat round outlined dense />
          <span> إلغاء و قفل </span>
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    styleObj: {
      type: Object,
      default: () => ({
        width: "1400px",
        maxWidth: "95vw",
      }),
    },
  },
  emits: ["update:model-value"],
  setup(props, { emit }) {
    const onModelValueUpdate = (value) => {
      emit("update:model-value", value);
    };

    return {
      onModelValueUpdate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
