import { Bettor } from "./Bettor";

export function BettorList({
  bettors,
  onShowBettorHistory,
  onShowAddBet,
  onShowAddPayment,
  showAddBet,
  showAddPayment,
  selectedBettor,
}) {
  return (
    <ul>
      {bettors.map((bettor) => (
        <Bettor
          bettor={bettor}
          onShowBettorHistory={onShowBettorHistory}
          onShowAddBet={onShowAddBet}
          onShowAddPayment={onShowAddPayment}
          key={bettor.id}
          selectedBettor={selectedBettor}
          showAddBet={showAddBet}
          showAddPayment={showAddPayment}
        />
      ))}
    </ul>
  );
}
