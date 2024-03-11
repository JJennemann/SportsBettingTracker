import { Button } from "./App";

export function BettorHistory({
  onShowBettorHistory,
  selectedBettor,
  onCloseShowBettorHistory,
}) {
  return (
    <div className="bettor-history-table">
      <label> {selectedBettor.name}'s Bettor History</label>
      <table>
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Bet Result</th>
            <th>Bet Type</th>
            <th>Betting Line</th>
            <th>Odds</th>
            <th>Bet Amount</th>
            <th>Winnings</th>
            <th>Payment/Payout Amount</th>
            <th>Balance</th>
            <th>W-L-P</th>
          </tr>
        </thead>
        <tbody>
          {selectedBettor.paymentHistory.map((payment) => (
            <tr>
              <td>{payment.paymentType}</td>
              <td>selected.date</td>
              <td>selected.homeTeam</td>
              <td>selected.awayTeam</td>
              <td>selected.betResult</td>
              <td>selected.betType</td>
              <td>selected.bettingLine</td>
              <td>selected.odds</td>
              <td>selected.betAmount</td>
              <td>selected.winnings</td>
              <td>{payment.paymentAmount}</td>
              <td>selected.balance</td>
              <td>selected.record</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => onCloseShowBettorHistory()}>
        {" "}
        Close Bettor History{" "}
      </button>
    </div>
  );
}
