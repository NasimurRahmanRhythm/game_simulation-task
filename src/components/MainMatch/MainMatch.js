import React, { useEffect, useState } from "react";
import styles from "@/components/MainMatch/MainMatch.module.css";
import toast from "react-hot-toast";
import Commentary from "../Commentary/Commentary";
import SecondInnings from "../SecondInnings/SecondInnings";

const MainMatch = ({ first, second }) => {
  const [strike, setStrike] = useState();
  const [nonstrike, setNonstrike] = useState();
  const [bowler, setBowler] = useState();
  const [bat, setBat] = useState(2);
  const [over, setOver] = useState(0);
  const [ballCount, setBallCount] = useState(0);
  const [ball, setBall] = useState(true);
  const [run, setRun] = useState();
  const [totalRun, setTotalRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [overRun, setOverRun]= useState([]);

  const choosePlayer = (player) => {
    if (bat === 0) {
      toast.error("You have already chosen two players");
    } else if (bat === 2) {
      setStrike(player);
      setBat(bat - 1);
    } else {
      if (strike) {
        setNonstrike(player);
        setBat(bat - 1);
      } else {
        setStrike(player);
        setBat(bat - 1);
      }
    }
  };

  const chooseBowler = (player) => {
    if (ball) {
      setBowler(player);
      setBall(false);
    }
  };

  const play = () => {
    if (bat !== 0 || ball === true) {
      toast.error("Choose batsmen and bowler");
    } else {
      const runs = [1, 2, 3, 4, 6, "W"];
      const idx = Math.floor(Math.random() * runs.length);
      setRun(runs[idx]);
      setOverRun(...overRun, runs[idx]);
      if (runs[idx] === "W") {
        setWicket(wicket + 1);
      } else {
        setTotalRun(totalRun + runs[idx]);
      }
      setBallCount(ballCount + 1);
      setOver(ballCount / 6);
    }
  };

  const runScore = () => {
    if (run === 1 || run === 3) {
      const temp = nonstrike;
      setNonstrike(strike);
      setStrike(temp);
    } else if (run === "W") {
      setBat(1);
      setStrike("");
      console.log("bat is ", bat);
    }
    if (ballCount % 6 === 0 && over > 0) {
      setBowler("");
      setBall(true);
      toast.success("Choose a bowler");
    }
    console.log("Striker is ", strike);
    console.log("Non Striker is ", nonstrike);
  };

  useEffect(() => {
    runScore();
  }, [ballCount]);

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
          <div className={styles.opponentTeams}>
            {second.map((player) => (
              <div className={styles.team} onClick={() => chooseBowler(player)}>
                {player}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        Batsman:
        <p>{strike}</p>
        <p>{nonstrike}</p>
      </div>
      <div>
        Bowler:
        <p>{bowler}</p>
      </div>
      <div>
        {ballCount !== 18 && <div className={styles.play} onClick={play}>
          Play
        </div>}
        {run !== undefined && (
          <div
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
        )}
        <Commentary
          run={run}
          strike={strike}
          nonstrike={nonstrike}
          bowler={bowler}
          ballCount={ballCount}
          over={over}
        />
        <p>
          Total Run:{" "}
          <p>
            {totalRun}/{wicket}
          </p>
        </p>
        {ballCount === 18 && (
          <div>
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
