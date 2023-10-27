import styles from '@/styles/Home.module.css';
import teams from '@/libs/teams';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [homeTeam, setHomeTeam] = useState(null);
  const [opponentTeam, setOpponentTeam] = useState(null);
  const [isToss,setIsToss] = useState(false);
  const [text,setText] = useState(null);
  const [winner,setWinner] = useState(null);

  const selectTeam = (team, isHomeTeam) => {
    if (isHomeTeam) {
      setHomeTeam(team);
      toast.success('Home team selected');
      console.log(team);
    } else {
      setOpponentTeam(team);
    }
  };

  const tossTeams = () => {
    setIsToss(true);
    const tossResult = [" won the toss and selected to bat first", " won the toss and selected to field first"];
    const tossWinner = [homeTeam,opponentTeam];
    const idx = Math.floor(Math.random() * tossResult.length);
    setText(tossResult[idx]);
    const x = Math.floor(Math.random() * tossWinner.length);
    setWinner(tossWinner[x]);

  };

  return (
    <div className={styles.container}>
      <p className={styles.chooseText}>Choose a home team and an opponent team</p>
      <div className={styles.teamsContainer}>
        <div className={styles.homeTeams}>
          {teams.map((team, index) => (
            <div
              key={index}
              className={homeTeam !== team ? styles.team : styles.selected}
              onClick={() => selectTeam(team, true)}
            >
              {team}
            </div>
          ))}
        </div>
        <div>
        {homeTeam && opponentTeam && (
        <div className={styles.selectedTeams}>
          <div className={styles.selectedTeam}>
            <div className={styles.team}>{homeTeam}</div>
          </div>
          <h3>vs</h3>
          <div className={styles.selectedTeam}>
            <div className={styles.team}>{opponentTeam}</div>
          </div>
          {/* <button className={styles.button} onClick={resetSelection}>Reset Selection</button> */}
        </div>
      )}
      {homeTeam && opponentTeam && (
        <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={tossTeams}>
          toss
        </button>
        </div>
      )}
      {isToss && (
        <div className={styles.chooseText}>{winner}{text}</div>
      )}
      </div>
      {/* {isToss && (
        <div>Let's play</div>
      )} */}
        <div className={styles.opponentTeams}>
          {teams.map((team, index) => (
            <div
              key={index}
              className={opponentTeam !== team ? styles.team : styles.selected}
              onClick={() => selectTeam(team, false)}
            >
              {team}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
