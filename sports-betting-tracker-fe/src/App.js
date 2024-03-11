import { useState } from "react";

const initialBettors = [
  {
    id: 1,
    name: "Ryan",
    avatar: "https://i.pravatar.cc/48?u=118836",
    record: "0-32-5",
    currentBalance: -1000,
    allTimeWinnings: -5000,
    paymentHistory: [
      {
        id: 1,
        date: new Date(),
        paymentType: "Payment",
        paymentAmount: 100,
        beginningBalance: -1100,
        endingBalance: -1000,
      },
    ],
  },
  {
    id: 2,
    name: "Josh",
    avatar: "https://i.pravatar.cc/48?u=123423",
    record: "32-4-5",
    currentBalance: 10000,
    allTimeWinnings: 15000,
    paymentHistory: [
      {
        id: 1,
        date: new Date(),
        paymentType: "Payout",
        paymentAmount: 1000,
        beginningBalance: 11000,
        endingBalance: 10000,
      },
    ],
  },
  {
    id: 3,
    name: "Kyle",
    avatar: "https://i.pravatar.cc/48?u=1534534",
    record: "10-10-10",
    currentBalance: 0,
    allTimeWinnings: 300,
    paymentHistory: [
      {
        id: 1,
        date: new Date(),
        paymentType: "Payout",
        paymentAmount: 1000,
        beginningBalance: 1300,
        endingBalance: 300,
      },
    ],
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
  const [paymentAmount, setPaymentAmount] = useState(0);

  function handleShowAddBettor() {
    setShowAddBettor((show) => !show);
    setShowAddBet(false);
    setShowAddPayment(false);
  }

  function handleAddBettor(bettor) {
    setBettors((bettors) => [...bettors, bettor]);
    setShowAddBettor(false);
  }

  function handleShowBettorHistory(bettor) {
    setShowBettorHistory(true);
    setShowAddBet(false);
    setShowAddBettor(false);
    setShowAddPayment(false);
    setSelectedBettor(bettor);
  }

  function handleCloseShowBettorHistory() {
    setShowBettorHistory(false);
    setSelectedBettor(null);
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
  }

  function handleMakePayment(paymentAmountInput) {
    setPaymentAmount(paymentAmountInput);

    const beginningBalance = selectedBettor.currentBalance;

    const id = crypto.randomUUID();

    const updatedBalance =
      selectedBettor.currentBalance > 0
        ? selectedBettor.currentBalance - paymentAmountInput
        : selectedBettor.currentBalance + paymentAmountInput;

    const paymentType =
      selectedBettor.currentBalance > 0 ? "Payout" : "Payment";

    const newPaymentEntry = {
      id: id,
      date: new Date(),
      paymentType: paymentType,
      paymentAmount: paymentAmountInput,
      beginningBalance: beginningBalance,
      endingBalance: updatedBalance,
    };

    setBettors((bettors) =>
      bettors.map((bettor) =>
        bettor.id === selectedBettor.id
          ? {
              ...bettor,
              currentBalance: updatedBalance,
              paymentHistory: [...bettor.paymentHistory, newPaymentEntry],
            }
          : bettor
      )
    );

    setShowAddPayment(false);
    setSelectedBettor(null);
    setPaymentAmount(0);
  }

  return (
    <div>
      {showBettorHistory ? (
        <div className="bettor-history">
          <BettorHistory
            onShowBettorHistory={handleShowBettorHistory}
            onCloseShowBettorHistory={handleCloseShowBettorHistory}
            selectedBettor={selectedBettor}
          />
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
                paymentAmount={paymentAmount}
                onMakePayment={handleMakePayment}
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

function FormAddPayment({ selectedBettor, paymentAmount, onMakePayment }) {
  const [formUpdatedBalance, setFormUpdatedBalance] = useState(
    selectedBettor.currentBalance
  );

  function handleFormUpdatedBalance(paymentInput) {
    const paymentAmountInput = Number(paymentInput);

    if (
      Math.abs(paymentAmountInput) > Math.abs(selectedBettor.currentBalance)
    ) {
      setFormUpdatedBalance(selectedBettor.currentBalance);
    } else {
      let updatedBalance;
      if (selectedBettor.currentBalance > 0) {
        updatedBalance = selectedBettor.currentBalance - paymentAmountInput;
      } else {
        updatedBalance = selectedBettor.currentBalance + paymentAmountInput;
      }
      setFormUpdatedBalance(updatedBalance);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const paymentAmountInput = Number(
      e.target.elements.paymentAmountInputField.value
    );
    onMakePayment(paymentAmountInput);
  }

  return (
    <form className="form-edit-balance" onSubmit={handleSubmit}>
      <label className="form-add-new-bet-title">
        Add Payment for {selectedBettor.name}
      </label>
      <p>
        Bettors Current Balance:
        <span
          className={
            selectedBettor.currentBalance < 0
              ? "red"
              : selectedBettor.currentBalance > 0
              ? "green"
              : ""
          }
        >
          ${selectedBettor.currentBalance}
        </span>
      </p>

      <label>
        Payment Amount: $
        <input
          type="number"
          name="paymentAmountInputField"
          onChange={(e) => handleFormUpdatedBalance(e.target.value)}
          onInput={(e) => {
            e.target.value = Math.abs(parseInt(e.target.value))
              .toString()
              .slice(
                0,
                Math.abs(selectedBettor.currentBalance).toString().length
              );
          }}
        />
      </label>
      <p>
        Updated Balance:
        <span
          className={
            selectedBettor.currentBalance < 0
              ? "red"
              : selectedBettor.currentBalance > 0
              ? "green"
              : ""
          }
        >
          ${formUpdatedBalance}
        </span>
      </p>
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

function BettorHistory({
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
      <Button onClick={() => onCloseShowBettorHistory()}>
        {" "}
        Close Bettor History{" "}
      </Button>
    </div>
  );
}
