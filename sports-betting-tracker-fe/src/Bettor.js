import { Button } from "./App";

export function Bettor({
  bettor,
  onShowBettorHistory,
  onShowAddPayment,
  onShowAddBet,
  showAddPayment,
  showAddBet,
  selectedBettor,
}) {
  const isSelected = selectedBettor?.id === bettor.id;
  return (
    <li className="bettor" id={isSelected ? "selected" : ""}>
      <div className="bettor-heading">
        <img className="avatar" src={bettor.avatar} alt={bettor.name} />
        <div className="bettor-name-record">
          <h3 className="bettor-name">{bettor.name}</h3>
          <h4 className="bettor-record">({bettor.record})</h4>
        </div>
      </div>

      <div className="bettor-balance-data">
        <p className="current-balance">
          <b> Current Balance: </b>

          <span
            className={
              bettor.currentBalance < 0
                ? "red"
                : bettor.currentBalance > 0
                ? "green"
                : ""
            }
          >
            {" "}
            {bettor.currentBalance < 0
              ? `-$${Math.abs(bettor.currentBalance)}`
              : `$${Math.abs(bettor.currentBalance)}`}
          </span>
        </p>

        <p className="all-time-balance">
          <b> All-Time Winnings: </b>
          <span
            className={
              bettor.allTimeWinnings < 0
                ? "red"
                : bettor.allTimeWinnings > 0
                ? "green"
                : ""
            }
          >
            {" "}
            {bettor.allTimeBalance < 0
              ? `-$${Math.abs(bettor.allTimeWinnings)}`
              : `$${Math.abs(bettor.allTimeWinnings)}`}
          </span>
        </p>
      </div>
      <div className="bettor-buttons">
        <button onClick={() => onShowAddBet(bettor)}>
          {isSelected && showAddBet ? "Close" : "Add Bet"}
        </button>
        <button onClick={() => onShowAddPayment(bettor)}>
          {isSelected && showAddPayment ? "Close" : "Add Payment"}
        </button>
        <button onClick={() => onShowBettorHistory(bettor)}>
          Bettor History
        </button>
      </div>
    </li>
  );
}
