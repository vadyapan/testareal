<template>
  <div v-if="commentsGroupedByArticle.length > 0">
    <v-expansion-panels class="mx-auto mb-6 w-75">
      <v-expansion-panel
        v-for="article in commentsGroupedByArticle"
        :key="article.id"
      >
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          {{ article.name }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="comment"
          v-for="comment in article.comments"
          :key="comment.id"
        >
          <v-textarea :model-value="comment.text" disabled></v-textarea>
          <footer>
            <div class="d-flex justify-end ga-2">
              <v-chip color="green">
                {{ new Date(comment.createdAt).toLocaleString() }}
              </v-chip>
              <v-chip color="primary">
                {{ new Date(comment.updatedAt).toLocaleString() }}
              </v-chip>
            </div>
          </footer>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div class="text-center mt-16" v-else>
    <h2>Комментариев за выбранные период не найдено</h2>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onUnmounted } from "vue";

const store = useStore();

const commentsGroupedByArticle = computed(() => store.getters.commentsByPeriod);

onUnmounted(() => {
  store.commit("resetCommentsByPeriod");
});
</script>

<style scoped>
.comment {
  margin: 0 auto;
  width: 500px;
}
</style>
