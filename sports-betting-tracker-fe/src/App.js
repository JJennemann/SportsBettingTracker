import { useState } from "react";
import { BettorList } from "./BettorList";
import { FormAddBettor } from "./FormAddBettor";
import { FormAddPayment } from "./FormAddPayment";
import { FormAddBet } from "./FormAddBet";
import { BettorHistory } from "./BettorHistory";

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

// export function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

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

            <button onClick={handleShowAddBettor}>
              {showAddBettor ? "Close" : "Add Bettor"}
            </button>
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
