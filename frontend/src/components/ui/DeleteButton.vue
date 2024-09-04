<template>
  <v-snackbar :timeout="3000" color="green" elevation="24">
    <template v-slot:activator="{ props }">
      <v-btn
        value="delete-item"
        prepend-icon="mdi-delete"
        color="red"
        v-bind="props"
        @click="deleteItem()"
        >Удалить</v-btn
      >
    </template>

    Данные успешно удалены!
  </v-snackbar>
</template>

<script setup>
defineProps({
  deleteItem: Function,
});
</script>
