"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          articleId: 1,
          text: "Не знал, что леса так важны для климата. Спасибо за информацию!",
          createdAt: "2024-08-31T13:00:00.000Z",
          updatedAt: "2024-08-31T13:00:00.000Z",
        },
        {
          articleId: 2,
          text: "Океаны действительно имеют огромное значение для планеты. Интересная статья!",
          createdAt: "2024-09-01T14:30:00.000Z",
          updatedAt: "2024-09-01T14:30:00.000Z",
        },
        {
          articleId: 3,
          text: "Горы всегда манят своей величественностью. Хотелось бы посетить больше горных районов.",
          createdAt: "2024-09-02T17:45:00.000Z",
          updatedAt: "2024-09-02T17:45:00.000Z",
        },
        {
          articleId: 4,
          text: "Пустыни — это невероятно разнообразные экосистемы, несмотря на их кажущуюся суровость.",
          createdAt: "2024-09-03T12:20:00.000Z",
          updatedAt: "2024-09-03T12:20:00.000Z",
        },
        {
          articleId: 5,
          text: "Тропические леса действительно являются чудом природы. Много всего интересного можно узнать о них!",
          createdAt: "2024-09-04T16:10:00.000Z",
          updatedAt: "2024-09-04T16:10:00.000Z",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
