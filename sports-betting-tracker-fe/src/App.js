import { useState } from "react";

const initialBettors = [
  {
    id: 1,
    name: "Ryan",
    avatar: "https://i.pravatar.cc/48?u=118836",
    record: "0-32-5",
    currentBalance: -1000,
    allTimeBalance: -5000,
  },
  {
    id: 2,
    name: "Josh",
    avatar: "https://i.pravatar.cc/48?u=123423",
    record: "32-4-5",
    currentBalance: 10000,
    allTimeBalance: 15000,
  },
  {
    id: 3,
    name: "Kyle",
    avatar: "https://i.pravatar.cc/48?u=1534534",
    record: "10-10-10",
    currentBalance: 0,
    allTimeBalance: 300,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [bettors, setBettors] = useState(initialBettors);
  const [showAddBettor, setShowAddBettor] = useState(false);
  const [showBettorHistory, setShowBettorHistory] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddBet, setShowAddBet] = useState(false);
  const [selectedBettor, setSelectedBettor] = useState(null);

  function handleShowAddBettor() {
    setShowAddBettor((show) => !show);
    setShowAddBet(false);
    setShowAddPayment(false);
  }

  function handleAddBettor(bettor) {
    setBettors((bettors) => [...bettors, bettor]);
    setShowAddBettor(!showBettorHistory);
  }

  function handleShowBettorHistory(bettor) {
    setShowBettorHistory(!showBettorHistory);
    // setSelectedBettor((cur) => (cur?.id === bettor.id ? null : bettor));
  }

  function handleShowAddPayment(bettor) {
    if (selectedBettor?.id === bettor.id && showAddPayment) {
      // Close the component and set selectedBettor to null
      setShowAddPayment(false);
      setSelectedBettor(null);
    } else {
      // Open the component and set selectedBettor to the current bettor
      setShowAddPayment(true);
      setShowAddBettor(false); // Close other components
      setShowAddBet(false);
      setSelectedBettor(bettor);
    }

    // setShowAddBettor(false);
    // setShowAddBet(false);
    // setSelectedBettor((cur) => (cur?.id === bettor.id ? null : bettor));
  }

  function handleShowAddBet(bettor) {
    if (selectedBettor?.id === bettor.id && showAddBet) {
      // Close the component and set selectedBettor to null
      setShowAddBet(false);
      setSelectedBettor(null);
    } else {
      // Open the component and set selectedBettor to the current bettor
      setShowAddBet(true);
      setShowAddBettor(false); // Close other components
      setShowAddPayment(false);
      setSelectedBettor(bettor);
    }

    // selectedBettor?.id === bettor?.id
    //   ? setShowAddBet(false)
    //   : setShowAddBet(true);
    // // setShowAddBet(selectedBettor?.id === bettor?.id ? !showAddBet : showAddBet);
    // // setShowAddBet(!showAddBet);
    // setShowAddBettor(false);
    // setShowAddPayment(false);
    // setSelectedBettor((cur) => (cur?.id === bettor.id ? null : bettor));
  }

  return (
    <div>
      {showBettorHistory ? (
        <div className="bettor-history">
          <BettorHistory onShowBettorHistory={handleShowBettorHistory} />
        </div>
      ) : (
        <div className="app">
          <div className="bettor-list">
            <BettorList
              bettors={bettors}
              onShowBettorHistory={handleShowBettorHistory}
              onShowAddPayment={handleShowAddPayment}
              onShowAddBet={handleShowAddBet}
              showAddBet={showAddBet}
              showAddPayment={showAddPayment}
              selectedBettor={selectedBettor}
            />

            {showAddBettor && <FormAddBettor onAddBettor={handleAddBettor} />}

            <Button onClick={handleShowAddBettor}>
              {showAddBettor ? "Close" : "Add Bettor"}
            </Button>
          </div>

          <div className="forms">
            {showAddPayment ? (
              <FormAddPayment
                onShowAddPayment={handleShowAddPayment}
                selectedBettor={selectedBettor}
              />
            ) : (
              ""
            )}
            {showAddBet ? (
              <FormAddBet
                onShowAddBet={handleShowAddBet}
                selectedBettor={selectedBettor}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BettorList({
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

function Bettor({
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
          <b> All-Time Balance: </b>
          <span
            className={
              bettor.allTimeBalance < 0
                ? "red"
                : bettor.allTimeBalance > 0
                ? "green"
                : ""
            }
          >
            {" "}
            {bettor.allTimeBalance < 0
              ? `-$${Math.abs(bettor.allTimeBalance)}`
              : `$${Math.abs(bettor.allTimeBalance)}`}
          </span>
        </p>
      </div>
      <div className="bettor-buttons">
        <Button onClick={() => onShowAddBet(bettor)}>
          {isSelected && showAddBet ? "Close" : "Add Bet"}
        </Button>
        <Button onClick={() => onShowAddPayment(bettor)}>
          {isSelected && showAddPayment ? "Close" : "Add Payment"}
        </Button>
        <Button onClick={() => onShowBettorHistory(bettor)}>
          Bettor History
        </Button>
      </div>
    </li>
  );
}

function FormAddBettor({ onAddBettor }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !avatar) return;

    const id = crypto.randomUUID();
    const newBettor = {
      id: id,
      name,
      avatar: `${avatar}?=${id}`,
      record: "0-0-0",
      currentBalance: 0,
      allTimeBalance: 0,
    };

    console.log(newBettor);
    onAddBettor(newBettor);

    setName("");
    setAvatar("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-bettor" onSubmit={handleSubmit}>
      <label>
        Bettor Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Avatar URL
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <Button>Save Bettor</Button>
    </form>
  );
}

function FormAddPayment({ selectedBettor }) {
  return (
    <form className="form-edit-balance">
      <label className="form-add-new-bet-title">
        Add Payment for {selectedBettor.name}
      </label>
      <p>
        Amount Owed by Bettor: $
        {selectedBettor.currentBalance < 0 ? selectedBettor.currentBalance : 0}
      </p>
      <p>
        Amount Owed to Bettor: $
        {selectedBettor.currentBalance > 0 ? selectedBettor.currentBalance : 0}{" "}
      </p>
      <select>
        <option>Payment from Bettor</option>
        <option>Payout to Bettor</option>
      </select>
      <label>
        Payment Amount
        <input type="text" />
      </label>
      <p>Updated Balance: X</p>
      <Button>Save Payment</Button>
    </form>
  );
}

function FormAddBet({ selectedBettor }) {
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
      <Button>Add Bet</Button>
    </form>
  );
}

function BettorHistory({ onShowBettorHistory }) {
  return (
    <div className="bettor-history-table">
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
          <tr>
            <td>selected.transactionType</td>
            <td>selected.date</td>
            <td>selected.homeTeam</td>
            <td>selected.awayTeam</td>
            <td>selected.betResult</td>
            <td>selected.betType</td>
            <td>selected.bettingLine</td>
            <td>selected.odds</td>
            <td>selected.betAmount</td>
            <td>selected.winnings</td>
            <td>selected.payment</td>
            <td>selected.balance</td>
            <td>selected.record</td>
          </tr>
        </tbody>
      </table>
      <Button onClick={() => onShowBettorHistory()}>
        {" "}
        Close Bettor History{" "}
      </Button>
    </div>
  );
}
