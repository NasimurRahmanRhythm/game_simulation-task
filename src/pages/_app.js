import { GameProvider } from "@/libs/providers/GameProvider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <GameProvider>
      <Toaster />
      <Component {...pageProps} />
    </GameProvider>
  );
}
