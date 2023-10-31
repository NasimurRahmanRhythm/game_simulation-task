import styles from '@/styles/Home.module.css';
import teams from '@/libs/teams';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Home() {
  const [homeTeam, setHomeTeam] = useState('');
  const [opponentTeam, setOpponentTeam] = useState('');
  const [isToss,setIsToss] = useState(false);
  const [text,setText] = useState('');
  const [winner,setWinner] = useState('');
  const router = useRouter();

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
    const tossResult = ["bat", "field"];
    const tossWinner = [homeTeam,opponentTeam];
    const idx = Math.floor(Math.random() * tossResult.length);
    setText(tossResult[idx]);
    const x = Math.floor(Math.random() * tossWinner.length);
    setWinner(tossWinner[x]);

  };

  const playMatch = () => {
    router.push(`/play-match?homeTeam=${homeTeam}&opponentTeam=${opponentTeam}&winner=${winner}&tossResult=${text}`)
  }

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
        <div className={styles.container}>
  <div>
    {homeTeam && opponentTeam && (
      <div className={styles.selectedTeams}>
        <div className={styles.homeTeams}>
          <div className={styles.team}>{homeTeam}</div>
        </div>
        <h3>vs</h3>
        <div className={styles.opponentTeams}>
          <div className={styles.team}>{opponentTeam}</div>
        </div>
        {/* <button className={styles.button} onClick={resetSelection}>Reset Selection</button> */}
      </div>
    )}
  </div>
  <div>
    {homeTeam && opponentTeam && (
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={tossTeams}>
          Toss
        </button>
      </div>
    )}
  </div>
  <div>
    {isToss && (
      <div className={styles.chooseText}>
        {winner} won the toss and elected to {text} first
        <div onClick={playMatch}>
          <h1 className={styles.play}>Let's play</h1>
        </div>
      </div>
    )}
  </div>
</div>

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
