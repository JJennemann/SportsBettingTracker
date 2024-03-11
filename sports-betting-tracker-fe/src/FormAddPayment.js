import { useState } from "react";
import { Button } from "./App";

export function FormAddPayment({
  selectedBettor,
  paymentAmount,
  onMakePayment,
}) {
  const [formUpdatedBalance, setFormUpdatedBalance] = useState(
    selectedBettor.currentBalance
  );

  const [disableButton, setDisableButton] = useState(true);

  function handleFormUpdatedBalance(paymentInput) {
    const paymentAmountInput = Number(paymentInput);

    if (
      Math.abs(paymentAmountInput) > Math.abs(selectedBettor.currentBalance)
    ) {
      setFormUpdatedBalance(selectedBettor.currentBalance);
    } else {
      // setDisableSavePayment(false);
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

    // Stops form from being submitted if the amount entered is either 0 or greater than the selected bettor's current balance
    if (
      paymentAmountInput > Math.abs(selectedBettor.currentBalance) ||
      !paymentAmountInput
    )
      return;

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
      <button disableButton={disableButton}>Save Payment</button>
    </form>
  );
}
