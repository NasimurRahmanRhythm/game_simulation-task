import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Commentary from "../Commentary/Commentary";
import styles from "@/components/SecondInnings/SecondInnings.module.css";
import Router, { useRouter } from "next/router";

const SecondInnings = ({first, second, opponentScore}) => {
    const [strike, setStrike] = useState();
    const [nonstrike, setNonstrike] = useState();
    const [bowler, setBowler] = useState();
    const [bat, setBat] = useState(2);
    const [over, setOver] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [ball, setBall] = useState(true);
    const [run, setRun] = useState();
    const [totalRun, setTotalRun] = useState(0);
    const [wicket,setWicket] = useState(0);
    const [batFirst,setBatFirst] = useState('');
    const [batSecond,setBatSecond] = useState('');
    const router = useRouter();
    const { homeTeam, opponentTeam, winner, tossResult } = router.query;
    useEffect(() => {
        if ((homeTeam === winner && tossResult === 'bat') || (opponentTeam === winner && tossResult === 'field')) {
          setBatFirst(homeTeam);
          setBatSecond(opponentTeam);
        } else {
          setBatFirst(opponentTeam);
          setBatSecond(homeTeam);
        }
      }, [homeTeam, winner, opponentTeam, tossResult]);
  
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
      if(bat!==0 || ball === true){
          toast.error('Choose batsmen and bowler');
      }
      else {
        const runs = [1, 2, 3, 4, 6, "W"];
        const idx = Math.floor(Math.random() * runs.length);
        setRun(runs[idx]);
        if(runs[idx] === 'W'){
            setWicket(wicket+1);
          }
          else{
            setTotalRun(totalRun+runs[idx]);
          }
        setBallCount(ballCount+1);
        setOver(ballCount/6)
    }
  };
  
  const runScore = () => {
    if (run === 1 || run === 3 || ballCount%6===0) {
      const temp = nonstrike;
      setNonstrike(strike);
      setStrike(temp);
      if(ballCount%6===0 && over>0){
          setBowler('');
          setBall(true);
          toast.success('Choose a bowler');
      }
    } else if (run === "W") {
      setBat(1);
      setStrike('');
      console.log("bat is ",bat);
    }
    console.log("Striker is ", strike);
    console.log("Non Striker is ", nonstrike);
  }
  
    useEffect(()=> {
      runScore();
      },[ballCount]);
  

      
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
                  ? styles['small-circle'] + ' ' + styles.green
                  : run === 6
                  ? styles['small-circle'] + ' ' + styles.pink
                  : run === "W"
                  ? styles['small-circle'] + ' ' + styles.red
                  : styles['small-circle']
              }
            >
              {run}
            </div>
          )}
          <p>
          Total Run:{" "}
          <p>
            {totalRun}/{wicket}
          </p>
        </p>
          <Commentary run = {run} strike = {strike} nonstrike = {nonstrike} bowler={bowler} ballCount={ballCount} over={over}/>
          {(ballCount === 18 || totalRun>opponentScore) && <div>
            {totalRun>opponentScore ? (<div>{batSecond} won the game by {10-wicket} wickets</div>) :
                (<div>{batFirst} won the game by {opponentScore-totalRun} runs</div>)}
            </div>}
        </div>
      </div>
    );
  };

export default SecondInnings;