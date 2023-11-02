import React, { useEffect, useState } from "react";
import styles from "@/components/MainMatch/MainMatch.module.css";
import toast from "react-hot-toast";
import Commentary from "../Commentary/Commentary";
import SecondInnings from "../SecondInnings/SecondInnings";
import { useGame } from "@/libs/providers/GameProvider";
import { useActionDispatcher } from "@/hooks/useActionDispatcher";
import { gameActions } from "@/libs/actions/game.actions";

const MainMatch = ({ first, second }) => {
  const {data1, setData1} = useGame();
  const {data2, setData2} = useGame();

  useEffect(() => {
    setData1({});
    setData2({});
  
  }, []);
  const [state, dispatch] = useActionDispatcher({
    batFirst: '',
    batSecond: '',
    strike: '',
    nonstrike: '',
    bowler: '',
    bat: 2,
    over: 0,
    ballCount: 0,
    ball: true,
    run: null,
    totalRun: 0,
    wicket: 0,
    overRun: [],
});

  const {strike, nonstrike, bowler, bat, over, ballCount, ball,
  run, totalRun, wicket, overRun} = state;

  const choosePlayer = (player) => {
    if (data1[player]?.played === true) {
      toast.error("You have already choosen this player");
    } else {
      dispatch(gameActions.CHOOSE_PLAYERS, player);
    }
  };

  const chooseBowler = (player) => {
    if(data2[player]?.played === true){
      toast.error('You have already choosen this bowler');
    }else {
      dispatch(gameActions.CHOOSE_BOWLER, {
        bowler: player,
        ball: false,
      });
  }
  };

  const play = () => {
    if (bat !== 0 || ball === true) {
      toast.error("Choose batsmen and bowler");
    } else {
      const runs = [1, 2, 3, 4, 6, "W"];
      const idx = Math.floor(Math.random() * runs.length);
      dispatch(gameActions.SCORE_RUN, runs[idx]);
    }
  };

  const runScore = () => {
    if (run === 1 || run === 3) {
      dispatch(gameActions.STRIKE_ROTATE,{
        nonstrike: strike,
        strike: nonstrike,
      })
    } else if (run === "W") {
      dispatch(gameActions.WICKET_TAKEN, {
        wicket: wicket+1,
        bat: 1,
        strike: '',
      });
      console.log("bat is ", bat);
    }
    console.log("Striker is ", strike);
    console.log("Non Striker is ", nonstrike);
  };

  useEffect(() => {
    if (run !== "W") {
      setData1((prevScoreCard) => ({
        ...prevScoreCard,
        [strike]: {
          run: (prevScoreCard[strike]?.run || 0) + run,
          ball: (prevScoreCard[strike]?.ball || 0) + 1,
          played: true,
        },
      }));
    }
  }, [ballCount]);

  useEffect(() => {
    if (run === "W") {
      setData2((prevScoreCard) => ({
        ...prevScoreCard,
        [bowler]: {
          wicket: (prevScoreCard[bowler]?.wicket || 0) + 1,
          run: prevScoreCard[bowler]?.run || 0,
          played: true,
        },
      }));
    } else {
      setData2((prevScoreCard) => ({
        ...prevScoreCard,
        [bowler]: {
          wicket: prevScoreCard[bowler]?.wicket || 0,
          run: (prevScoreCard[bowler]?.run || 0) + run,
          played: true,
        },
      }));
    }
  }, [ballCount]);

  useEffect(() => {
    runScore();
  }, [ballCount]);

  console.log("state is ",state);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.teamContainer}>
          <div className={styles.homeTeams}>
            <div>
              <p></p>
            </div>
            {first.map((player) => (
              <div className={styles.team} onClick={() => choosePlayer(player)}>
                {player}
              </div>
            ))}
          </div>
          <div className={styles.centered}>
            <div className={styles.batsman}>
              Batsman:
              <p>{strike}</p>
              <p>{nonstrike}</p>
            </div>
            <div className={styles.bowler}>
              Bowler:
              <p>{bowler}</p>
            </div>
            {ballCount !== 18 && (
              <div className={styles.play} onClick={play}>
                Play
              </div>
            )}
            <div className={styles.row}>
              {overRun.map((run, index) => (
                <div
                  key={index}
                  className={
                    run === 4
                      ? styles["small-circle"] + " " + styles.green
                      : run === 6
                      ? styles["small-circle"] + " " + styles.pink
                      : run === "W"
                      ? styles["small-circle"] + " " + styles.red
                      : styles["small-circle"]
                  }
                >
                  {run}
                </div>
              ))}
            </div>
            <div className={styles.commentary}>
              <Commentary
                run={run}
                strike={strike}
                nonstrike={nonstrike}
                bowler={bowler}
                ballCount={ballCount}
                over={over}
              />
            </div>
            <div className={styles.total}>
              Total Run:
              <p>
                {totalRun}/{wicket}
              </p>
            </div>
          </div>
          <div className={styles.opponentTeams}>
            {second.map((player) => (
              <div className={styles.team} onClick={() => chooseBowler(player)}>
                {player}
              </div>
            ))}
          </div>
        </div>
        {ballCount === 18 && (
          <div className={styles.second}>
            <SecondInnings
              first={second}
              second={first}
              opponentScore={totalRun}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMatch;
