<template>
  <v-sheet class="mx-auto" width="600">
    <v-form @submit.prevent>
      <v-text-field
        label="Название статьи"
        v-model="articleData.name"
      ></v-text-field>
      <v-textarea label="Текст статьи" v-model="articleData.text"></v-textarea>
      <div class="pa-md-4 d-flex justify-end">
        <v-snackbar :timeout="3000" color="green" elevation="24">
          <template v-slot:activator="{ props }">
            <v-btn
              class="ma-2"
              color="green"
              v-bind="props"
              @click="createArticle(articleData)"
              :disabled="!isValid"
              >Создать</v-btn
            >
          </template>

          Статья успешно создана!
        </v-snackbar>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, ref, watch } from "vue";

const store = useStore();

let isValid = ref(false);
const articleData = reactive({
  name: "",
  text: "",
});

const createArticle = (articleData) => {
  store.dispatch("createArticle", articleData).then(() => {
    articleData.name = "";
    articleData.text = "";
  });
};

watch(
  () => [articleData.name, articleData.text],
  ([name, text]) => {
    isValid.value = name.trim() !== "" && text.trim() !== "";
  },
);
</script>
