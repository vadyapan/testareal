<template>
  <v-list class="mx-auto" lines="three" width="500">
    <v-textarea v-model="editableText" :disabled="!isEdit"></v-textarea>
    <footer>
      <div class="dates">
        <v-chip color="primary">
          {{ new Date(props.updatedAt).toLocaleString() }}
        </v-chip>
        <v-chip color="green">
          {{ new Date(props.createdAt).toLocaleString() }}
        </v-chip>
      </div>
      <div class="actions">
        <EditButton :goToEdit="toggleEdit" v-if="!isEdit" />
        <SaveButton :saveChanges="saveChanges" v-else />
        <DeleteButton :deleteItem="deleteComment" />
      </div>
    </footer>
  </v-list>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

const props = defineProps({
  articleId: Number,
  commentId: Number,
  createdAt: String,
  updatedAt: String,
  text: String,
});

const store = useStore();

const isEdit = ref(false);
const editableText = ref(props.text);

const commentData = computed(() => ({
  articleId: props.articleId,
  commentId: props.commentId,
  comment: {
    text: editableText.value,
    updatedAt: new Date().toISOString(),
  },
}));

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};

const saveChanges = async () => {
  try {
    await store
      .dispatch("updateComment", commentData.value)
      .then(() => store.commit("updateCommentByArticleId", commentData.value));
    toggleEdit();
  } catch (error) {
    console.error("Failed to update comment:", error);
  }
};

const deleteComment = async () => {
  try {
    await store.dispatch("deleteComment", commentData.value);
    await store.commit("deleteComment", commentData.value.commentId);
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  gap: 10px;
}

.dates {
  display: flex;
  gap: 10px;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>
