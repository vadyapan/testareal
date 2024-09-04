import { createStore } from "vuex";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const state = {
  articles: [],
  articleById: null,
  commentsByArticleId: [],
  commentsByPeriod: [],
};

const mutations = {
  getAllArticles(state, articles) {
    state.articles = articles.data;
  },
  getArticleById(state, articleById) {
    state.articleById = articleById.data;
  },
  getCommentsByPeriod(state, commentsByPeriod) {
    state.commentsByPeriod = commentsByPeriod.data;
  },
  getCommentsByArticleId(state, commentsByArticleId) {
    state.commentsByArticleId = commentsByArticleId.data;
  },
  updateArticle(state, updatedArticle) {
    const article = state.articleById;
    article.name = updatedArticle.name;
    article.text = updatedArticle.text;
    article.updatedAt = updatedArticle.updatedAt;
  },
  deleteArticle(state) {
    state.articleById = null;
  },
  createComment(state, comment) {
    if (state.commentsByArticleId.length < 1) {
      state.commentsByArticleId = [];
    }
    state.commentsByArticleId = [...state.commentsByArticleId, comment.data];
  },
  updateCommentByArticleId(state, updatedComment) {
    const index = state.commentsByArticleId.findIndex(
      (comment) => comment.id === updatedComment.commentId,
    );

    if (index !== -1) {
      const comment = state.commentsByArticleId[index];
      comment.text = updatedComment.comment.text;
      comment.updatedAt = updatedComment.comment.updatedAt;
    }
  },
  deleteComment(state, id) {
    if (state.commentsByArticleId.length < 1) {
      state.commentsByArticleId = [];
    }

    state.commentsByArticleId = state.commentsByArticleId.filter(
      (comment) => comment.id !== id,
    );
  },
  resetCommentsByPeriod(state) {
    state.commentsByPeriod = [];
  },
};

const actions = {
  async getAllArticles({ commit }) {
    return await axios.get(`${API_URL}/articles`).then((response) => {
      commit("getAllArticles", response.data);
    });
  },
  async getArticleById({ commit }, id) {
    return await axios.get(`${API_URL}/article/${id}`).then((response) => {
      commit("getArticleById", response.data);
    });
  },
  async getCommentsByArticleId({ commit }, id) {
    return await axios
      .get(`${API_URL}/article/${id}/comments`)
      .then((response) => {
        commit("getCommentsByArticleId", response.data);
      });
  },
  async getCommentsByPeriod({ commit }, date) {
    return await axios
      .get(
        `${API_URL}/analytic/comments?dateFrom=${date.from}&dateTo=${date.to}`,
      )
      .then((response) => {
        commit("getCommentsByPeriod", response.data);
      });
  },
  async createArticle({ commit }, articleData) {
    return await axios.post(`${API_URL}/article`, articleData);
  },
  async updateArticle({ commit }, articleData) {
    return await axios.patch(
      `${API_URL}/article/${articleData.id}`,
      articleData,
    );
  },
  async deleteArticle({ commit }, id) {
    return await axios
      .delete(`${API_URL}/article/${id}`)
      .then(() => commit("deleteArticle"));
  },
  async createComment({ commit }, { articleId, comment }) {
    return await axios
      .post(`${API_URL}/article/${articleId}/comment`, comment)
      .then((response) => {
        commit("createComment", response.data);
      });
  },
  async updateComment({ commit }, { articleId, commentId, comment }) {
    return await axios.patch(
      `${API_URL}/article/${articleId}/comment/${commentId}`,
      comment,
    );
  },
  async deleteComment({ commit }, data) {
    return await axios.delete(
      `${API_URL}/article/${data.articleId}/comment/${data.commentId}`,
    );
  },
};

const getters = {
  articles: (state) => state.articles,
  articleById: (state) => state.articleById,
  commentsByArticleId: (state) => state.commentsByArticleId,
  commentsByPeriod: (state) => state.commentsByPeriod,
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
