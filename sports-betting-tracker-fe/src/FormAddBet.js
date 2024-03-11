import { Button } from "./App";

export function FormAddBet({ selectedBettor }) {
  return (
    <form className="form-add-new-bet">
      <label className="form-add-new-bet-title">
        Add Bet for {selectedBettor.name}
      </label>
      <label>
        League
        <select>
          <option>NFL</option>
          <option>NCAAF</option>
        </select>
      </label>
      <label>
        Home Team
        <select>
          <option>Test</option>
          <option>Test2</option>
        </select>
      </label>
      <label>
        Away Team
        <select>
          <option>Test</option>
          <option>Test2</option>
        </select>
      </label>
      <label>
        Bet Type
        <select>
          <option>Spread</option>
          <option>O/U</option>
        </select>
      </label>
      <label>
        Betting Line
        <input type="text" />
      </label>
      <label>
        Odds
        <input type="text" />
      </label>
      <label>
        Bet Amount
        <input type="text" />
      </label>
      <p>Win Pays Out: X</p>
      <p>Loss Cost: X</p>
      <p>Push Cost: X</p>
      <button>Add Bet</button>
    </form>
  );
}
