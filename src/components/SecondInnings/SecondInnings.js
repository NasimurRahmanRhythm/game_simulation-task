import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Commentary from "../Commentary/Commentary";
import styles from "@/components/SecondInnings/SecondInnings.module.css";
import Router, { useRouter } from "next/router";
import { useGame } from "@/libs/providers/GameProvider";
import { useActionDispatcher } from "@/hooks/useActionDispatcher";
import { gameActions } from "@/libs/actions/game.actions";

const SecondInnings = ({ first, second, opponentScore }) => {
  const [batFirst, setBatFirst] = useState("");
  const [batSecond, setBatSecond] = useState("");
  const {data3, setData3} = useGame();
  const {data4, setData4} = useGame();
  const router = useRouter();

  const { homeTeam, opponentTeam, winner, tossResult } = router.query;
  useEffect(() => {
    setData3({});
    setData4({});

  }, [])
  
  useEffect(() => {
    if (
      (homeTeam === winner && tossResult === "bat") ||
      (opponentTeam === winner && tossResult === "field")
    ) {
      setBatFirst(homeTeam);
      setBatSecond(opponentTeam);
    } else {
      setBatFirst(opponentTeam);
      setBatSecond(homeTeam);
    }
  }, [homeTeam, winner, opponentTeam, tossResult]);

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
    if (data3[player]?.played === true) {
      toast.error("You have already choosen this player");
    } else {
      dispatch(gameActions.CHOOSE_PLAYERS, player);
    }
  };

  const chooseBowler = (player) => {
    if(data4[player]?.played === true){
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
      setData3((prevScoreCard) => ({
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
      setData4((prevScoreCard) => ({
        ...prevScoreCard,
        [bowler]: {
          wicket: (prevScoreCard[bowler]?.wicket || 0) + 1,
          run: prevScoreCard[bowler]?.run || 0,
          played: true,
        },
      }));
    } else {
      setData4((prevScoreCard) => ({
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

  const goToScoreBoard = () => {
    router.push(`/scoreboard?homeTeam=${batFirst}&opponentTeam=${batSecond}`);
  }

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
            {(ballCount === 18 || totalRun > opponentScore) && (
              <div className={styles.chooseText}>
                {totalRun > opponentScore ? (
                  <div>
                    <div className={styles.score}>{batSecond} won the game by {10 - wicket} wickets</div>
                    <div className={styles.play} onClick={goToScoreBoard}>
                      Go to ScoreBoard
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.score}>{batFirst} won the game by {opponentScore - totalRun} runs</div>
                    <div className={styles.play} onClick={goToScoreBoard}>
                      Go to ScoreBoard
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.opponentTeams}>
            {second.map((player) => (
              <div className={styles.team} onClick={() => chooseBowler(player)}>
                {player}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondInnings;
