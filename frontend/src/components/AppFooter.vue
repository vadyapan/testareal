<template>
  <v-bottom-navigation class="container">
    <RouterLink to="/">
      <v-btn value="articles">
        <v-icon class="icon">mdi-note</v-icon>

        <span>Список статей</span>
      </v-btn>
    </RouterLink>

    <RouterLink to="/create-article">
      <v-btn value="create-article">
        <v-icon class="icon">mdi-square-edit-outline</v-icon>

        <span>Создать статью</span>
      </v-btn>
    </RouterLink>

    <RouterLink to="/comments">
      <v-btn value="comments">
        <v-icon class="icon">mdi-comment</v-icon>

        <span>Комментарии</span>
      </v-btn>
    </RouterLink>
  </v-bottom-navigation>
</template>

<style scoped>
.container {
  height: 10vh !important;
}

a {
  color: inherit;
  text-decoration: none;
}

.icon {
  margin-bottom: 5px;
}
</style>
