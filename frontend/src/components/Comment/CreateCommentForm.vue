<template>
  <v-sheet class="mx-auto" width="500">
    <v-form @submit.prevent>
      <v-text-field
        v-model="commentData.comment.text"
        label="Введите комментарий"
        auto-grow
      ></v-text-field>
      <div class="pa-md-4 d-flex justify-end">
        <v-snackbar :timeout="3000" color="green" elevation="24">
          <template v-slot:activator="{ props }">
            <v-btn
              class="ma-2"
              color="green"
              v-bind="props"
              @click="createComment"
              :disabled="!isValid"
              >Добавить</v-btn
            >
          </template>

          Комментарий успешно добавлен!
        </v-snackbar>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isValid = ref(false);

const props = defineProps({
  articleId: String,
});

const commentData = reactive({
  articleId: props.articleId,
  comment: {
    text: "",
  },
});

const createComment = async () => {
  try {
    await store.dispatch("createComment", commentData);
    commentData.comment.text = "";
  } catch (error) {
    console.error("Failed to create comment:", error);
  }
};

watch(
  () => [commentData.comment.text],
  ([text]) => {
    isValid.value = text.trim() !== "";
  },
);
</script>
