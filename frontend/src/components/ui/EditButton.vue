<template>
  <v-btn
    value="edit-comment"
    prepend-icon="mdi-square-edit-outline"
    color="blue-grey-darken-3"
    @click="goToEdit()"
  >
    Редактировать
  </v-btn>
</template>

<script setup>
defineProps({
  goToEdit: Function,
});
</script>
