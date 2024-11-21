import './PlayerStats.css';

interface PlayerStatsProps {
  player: string;
  symbol: string;
  wins: number;
}

function PlayerStats({ player, symbol, wins }: PlayerStatsProps) {
  return (
    <div className="player-stats">
      <h3>{player}</h3>
      <p>Символ: {symbol}</p>
      <p>Кількість перемог: {wins}</p>
    </div>
  );
}

export default PlayerStats;
