<template>
  <v-table class="mx-auto w-75" v-if="articles.length > 0">
    <tbody>
      <tr
        class="name-article"
        v-for="{ id, name, text } in articles"
        :key="id"
        @click="goToArticle(id)"
      >
        <td>{{ name }}</td>
        <td>
          {{ text }}
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="text-center mt-16" v-else>
    <h1 class="title mb-2">Статей пока нет</h1>
    <v-btn
      value="create-article"
      prepend-icon="mdi-square-edit-outline"
      color="green"
      @click="goToCreateArticle()"
    >
      Создать статью
    </v-btn>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import router from "@/routers/router";

const store = useStore();

const articles = computed(() => store.getters.articles);

onMounted(() => {
  store.dispatch("getAllArticles");
});

const goToArticle = (id) => {
  router.push({ name: "article", params: { id } });
};

const goToCreateArticle = () => {
  router.push({ name: "create-article" });
};
</script>

<style scoped>
.name-article {
  font-size: 16px;
  cursor: pointer;
}
</style>
