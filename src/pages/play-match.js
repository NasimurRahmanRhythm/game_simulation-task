import { useRouter } from 'next/router';
import React, { useState } from 'react';
import players from '@/libs/players';
import { useEffect } from 'react';
import MainMatch from '@/components/MainMatch/MainMatch';

const Matches = () => {
    const router = useRouter();
    const [batFirst, setBatFirst] = useState('');
    const [batSecond, setBatSecond] = useState('');
    const [batFirstPlayers, setBatFirstPlayers] = useState([]);
    const [batSecondPlayers, setBatSecondPlayers] = useState([]);
    const { homeTeam, opponentTeam, winner, tossResult } = router.query;
    console.log(homeTeam, opponentTeam, winner, tossResult);
    console.log(typeof(homeTeam));
    useEffect(() => {
        if ((homeTeam === winner && tossResult === 'bat') || (opponentTeam === winner && tossResult === 'field')) {
          setBatFirst(homeTeam);
          setBatSecond(opponentTeam);
          setBatFirstPlayers(players[homeTeam]);
          setBatSecondPlayers(players[opponentTeam]);
        } else {
          setBatFirst(opponentTeam);
          setBatSecond(homeTeam);
          setBatFirstPlayers(players[opponentTeam]);
          setBatSecondPlayers(players[homeTeam]);
        }
      }, [homeTeam, winner, opponentTeam, tossResult, players]);
    
  return (
    <div>
      <MainMatch first = {batFirstPlayers} second = {batSecondPlayers} />
    </div>
  )
}

export default Matches;
