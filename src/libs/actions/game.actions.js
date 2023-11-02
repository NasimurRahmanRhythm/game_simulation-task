import toast from "react-hot-toast";

// game.actions.js
export const gameActions = {
  CHOOSE_PLAYERS: async (player, state) => {
    let updatedState;
    if (state.bat === 0) {
      toast.error("You have already chosen two players");
      return state;
    } else if (state.bat === 2) {
      updatedState = {
        ...state,
        strike: player,
        bat: state.bat - 1,
      };
    } else {
      if (state.strike !== "") {
        updatedState = {
          ...state,
          nonstrike: player,
          bat: state.bat - 1,
        };
      } else {
        updatedState = {
          ...state,
          strike: player,
          bat: state.bat - 1,
        };
      }
    }

    return updatedState;
  },

  CHOOSE_BOWLER: async ({ bowler, ball }, state) => {
    if (state.ball) {
      const updatedState = {
        ...state,
        bowler: bowler,
        ball: ball,
      };
      return updatedState;
    } else {
      toast.error("You have already chosen a bowler");
      return state;
    }
  },

  UNSELECT_BOWLER: async ({ bowler, ball }, state) => {
    const updatedState = {
      ...state,
      bowler: bowler,
      ball: ball,
    };
    return updatedState;
  },

  SCORE_RUN: async (runs, state) => {
    const newOverRun = [...state.overRun, runs];
    let updatedState = { ...state };
    updatedState.run = runs;
    if (newOverRun.length === 6) {
      updatedState.bowler = '';
      updatedState.ball = true;
      updatedState.strike = state.nonstrike;
      updatedState.nonstrike = state.strike;
    }

    if (newOverRun.length - 1 === 6) {
      updatedState.overRun = [runs];
    } else {
      updatedState.overRun = newOverRun;
    }

    if (runs !== "W") {
      updatedState.totalRun += runs;
    }

    updatedState.ballCount += 1;
    updatedState.over = updatedState.ballCount / 6;

    return updatedState;
  },

  WICKET_TAKEN: async ({ wicket, bat, strike }, state) => {
    let updatedState;
    updatedState = {
      ...state,
      wicket: wicket,
      bat: bat,
      strike: strike,
    };
    return updatedState;
  },

  STRIKE_ROTATE: async ({ strike, nonstrike }, state) => {
    let updatedState;
    updatedState = {
      ...state,
      strike: strike,
      nonstrike: nonstrike,
    };
    return updatedState;
  },
};
