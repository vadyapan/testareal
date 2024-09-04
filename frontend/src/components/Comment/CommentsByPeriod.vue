<template>
  <div class="d-flex justify-center">
    <v-date-input
      v-model="model"
      label="Выбрать период"
      multiple="range"
      variant="outlined"
      max-width="368"
    ></v-date-input>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { VDateInput } from "vuetify/labs/components";

const store = useStore();
const model = ref(null);

watch(model, () => {
  const date = {
    from: model.value[0].toISOString(),
    to: model.value[model.value.length - 1].toISOString(),
  };

  store.dispatch("getCommentsByPeriod", date);
});
</script>
