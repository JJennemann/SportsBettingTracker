import { useState } from "react";
import { Button } from "./App";

export function FormAddBettor({ onAddBettor }) {
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
      <button>Save Bettor</button>
    </form>
  );
}
