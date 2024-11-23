import axios from "axios";
import "./App.css";
import {
  Transaction,
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/6yHj3DgsKiFM3I4kEtZe4pq_2yctJ9zW"
);

const fromPubKey = new PublicKey(
  "6dQYW6AwN8uwxhB57DLoSZnR2KXoq7d2RtLEDf7R33A6"
);

const App = () => {
  async function sendSol() {
    const ins = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: new PublicKey("HNrou6bkuGy8ueJJaZq5SiPAG5LnnnTZ1RD17jFXJP6a"),
      lamports: 0.001 * LAMPORTS_PER_SOL,
    });
    const tx = new Transaction().add(ins);

    const { blockhash } = await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubKey;

    const serializedTxn = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    console.log(serializedTxn);

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTxn,
      retry: false,
    });
  }

  return (
    <div>
      <input type="text" placeholder="Account"></input>
      <input type="text" placeholder="Address"></input>
      <button onClick={sendSol}>Submit</button>
    </div>
  );
};

export default App;
