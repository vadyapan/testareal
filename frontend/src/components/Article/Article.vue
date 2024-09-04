<template>
  <div class="container" v-if="article">
    <div class="article">
      <div v-if="!isEdit">
        <h1 class="article-name">
          {{ article.name }}
        </h1>
        <p class="article-text">
          {{ article.text }}
        </p>
      </div>
      <div v-else>
        <v-text-field
          label="Название"
          v-model="articleData.name"
          :disabled="!isEdit"
        ></v-text-field>
        <v-textarea
          label="Текст"
          v-model="articleData.text"
          :disabled="!isEdit"
        ></v-textarea>
      </div>
      <footer>
        <div class="dates">
          <v-chip color="green">
            {{ new Date(article.createdAt).toLocaleString() }}
          </v-chip>
          <v-chip color="primary"
            >{{ new Date(article.updatedAt).toLocaleString() }}
          </v-chip>
        </div>
      </footer>
      <div class="comments">
        <h2 class="comments-title">Комментарии:</h2>
        <CreateCommentForm :article-id="articleData.id" />
        <div v-for="comment in comments" :key="comment.id">
          <Comment
            :article-id="comment.articleId"
            :comment-id="comment.id"
            :created-at="comment.createdAt"
            :updated-at="comment.updatedAt"
            :text="comment.text"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="article">
      <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
    <div class="comments">
      <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import router from "@/routers/router";

const store = useStore();
const route = useRoute();
const id = route.params.id;

const isEdit = ref(false);
const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};

const article = computed(() => store.getters.articleById);
const comments = computed(() => store.getters.commentsByArticleId);

const articleData = reactive({
  id,
  name: "",
  text: "",
  updatedAt: new Date().toISOString(),
});

const goToHome = () => {
  router.push("/");
};

const saveChanges = () => {
  store.dispatch("updateArticle", articleData);
  store.commit("updateArticle", articleData);
  toggleEdit();
};

const deleteArticle = async () => {
  try {
    await store.dispatch("deleteArticle", id);
    goToHome();
  } catch (error) {
    console.error("Failed to delete article:", error);
  }
};

onMounted(() => {
  store.dispatch("getArticleById", id);
  store.dispatch("getCommentsByArticleId", id);
});

watch(article, () => {
  if (article.value) {
    articleData.name = article.value.name;
    articleData.text = article.value.text;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  gap: 30px;
  max-width: 1440px;
}

.article {
  margin: 0 auto;
  width: 800px;
}

.article-name {
  font-size: 30px;
}

.article-text {
  font-size: 20px;
  margin-top: 25px;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.dates {
  display: flex;
  gap: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.comments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 20px;
  width: 500px;
}
</style>
