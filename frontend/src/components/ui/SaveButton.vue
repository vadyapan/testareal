<template>
  <v-btn
    value="save-changes"
    prepend-icon="mdi-checkbox-marked-circle"
    color="green"
    @click="saveChanges()"
  >
    Сохранить
  </v-btn>
</template>

<script setup>
defineProps({
  saveChanges: Function,
});
</script>
