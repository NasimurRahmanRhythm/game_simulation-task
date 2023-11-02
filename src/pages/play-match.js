import { useRouter } from 'next/router';
import React, { useState } from 'react';
import players from '@/libs/players';
import { useEffect } from 'react';
import MainMatch from '@/components/MainMatch/MainMatch';
import { useGame } from '@/libs/providers/GameProvider';

const Matches = () => {
    const router = useRouter();
    const [batFirstPlayers, setBatFirstPlayers] = useState([]);
    const [batSecondPlayers, setBatSecondPlayers] = useState([]);
    const { homeTeam, opponentTeam, winner, tossResult } = router.query;
    useEffect(() => {
        if ((homeTeam === winner && tossResult === 'bat') || (opponentTeam === winner && tossResult === 'field')) {
          setBatFirstPlayers(players[homeTeam]);
          setBatSecondPlayers(players[opponentTeam]);
        } else {
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
