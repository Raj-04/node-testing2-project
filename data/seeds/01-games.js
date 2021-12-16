exports.seed = async function (knex) {
  await knex("games").insert([
      {
          game_name: "soccer",
          max_players: 11,
      },
      {
          game_name: "chess",
          max_players: 2,
          },
      {
          game_name: "solitaire",
          max_players: 2,
      },
      {
          game_name: "cricket",
          max_players: 11,
      },
  ])
} 
