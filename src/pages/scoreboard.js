import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/ScoreBoard.module.css'

const Scoreboard = () => {
    const router = useRouter();
    const data1 = JSON.parse(localStorage.getItem("teamABat"));
    const data2 = JSON.parse(localStorage.getItem("teamBBowl"));
    const data3 = JSON.parse(localStorage.getItem("teamBBat"));
    const data4 = JSON.parse(localStorage.getItem("teamABowl"));

    const filteredData1 = Object.keys(data1)
        .filter(key => key !== "undefined")
        .map(player => ({
            name: player,
            data: `${data1[player].run}(${data1[player].ball})`,
        }));
    
    const filteredData2 = Object.keys(data2)
        .filter(key => key !== "undefined")
        .map(player => ({
            name: player,
            data: `${data2[player].wicket}/${data2[player].run}`,
        }));

    const filteredData3 = Object.keys(data3)
        .filter(key => key !== "undefined")
        .map(player => ({
            name: player,
            data: `${data3[player].run}(${data3[player].ball})`,
        }));

    const filteredData4 = Object.keys(data4)
        .filter(key => key !== "undefined")
        .map(player => ({
            name: player,
            data: `${data4[player].wicket}/${data4[player].run}`,
        }));

    const { homeTeam, opponentTeam } = router.query;

    return (
        <div className={styles.scoreboardContainer}>
            <div className={styles.batting}>
                <div className={styles.team}>{homeTeam} Batting</div>
                {filteredData1.map(player => (
                    <div key={player.name} className={styles.player}>
                        {player.name} - {player.data}
                    </div>
                ))}
            </div>
            <div className={styles.bowling}>
                <div className={styles.team}>{opponentTeam} Bowling</div>
                {filteredData2.map(player => (
                    <div key={player.name} className={styles.player}>
                        {player.name} - {player.data}
                    </div>
                ))}
            </div>
            <div className={styles.batting}>
                <div className={styles.team}>{opponentTeam} Batting</div>
                {filteredData3.map(player => (
                    <div key={player.name} className={styles.player}>
                        {player.name} - {player.data}
                    </div>
                ))}
            </div>
            <div className={styles.bowling}>
                <div className={styles.team}>{homeTeam} Bowling</div>
                {filteredData4.map(player => (
                    <div key={player.name} className={styles.player}>
                        {player.name} - {player.data}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scoreboard;
