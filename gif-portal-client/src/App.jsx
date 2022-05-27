import twitterLogo from "./assets/twitter-logo.svg";
import React, { useEffect, useState } from "react";

// Constants
const TWITTER_HANDLE = "the_vjack";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [gifUrl, setGifUrl] = useState("");
  const TEST_GIFS = [
    "https://i.giphy.com/media/aUPfvs5MOXpxm/giphy.webp",
    "https://i.giphy.com/media/BWD3CtcudWL28/giphy.webp",
    "https://i.giphy.com/media/WirhZMBF1AZVK/200w.webp",
    "https://i.giphy.com/media/SF9Z0shNT07T2/giphy.webp",
    "https://i.giphy.com/media/10hzvF9FTulLxK/giphy.webp",
    "https://i.giphy.com/media/l0HUqsz2jdQYElRm0/200.webp",
    "https://i.giphy.com/media/lsV0mhvpsN0FEJAxLQ/200w.webp",
  ];
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with public key ",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Please install Phantom Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { solana } = window;

      if (solana) {
        const response = await solana.connect();
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Please install Phantom Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendGif = async () => {
    if (gifUrl.length > 0) {
      console.log("Gif Url", gifUrl);
    } else {
      console.log("Please paste url first");
    }
  };
  const connectButton = () => (
    <button
      className="bg-gradient-to-br from-blue-600 to-indigo-500 px-2 py-1 rounded font-bold"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
  const gifContainer = () => (
    <div>
      <form
        className="flex justify-center pb-2 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="rounded p-1 w-80 sm:w-96 text-blue-900"
          placeholder="Enter gif link here"
          value={gifUrl}
          onChange={(e) => {
            setGifUrl(e.target.value);
          }}
        />
        <button
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
            sendGif();
          }}
          className="bg-gradient-to-br from-blue-600 to-indigo-500 px-2 py-1 rounded font-bold"
        >
          Submit
        </button>
      </form>
      <div className="grid grid-cols-4 lg:px-40 md:scroll-px-10 px-2">
        {TEST_GIFS.map((gif, index) => (
          <div key={gif + index} className="p-1">
            <img
              src={gif}
              alt="{gif}"
              className="rounded object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div>
      <div className="flex items-center flex-col min-h-screen bg-blue-900 text-white">
        <div className="flex grow justify-center min-w-full">
          <div
            className={`flex flex-col ${
              walletAddress ? "py-4" : "justify-center"
            }  items-center min-w-full`}
          >
            <p className="text-2xl font-bold"> 🕷️Spiderman GIF Portal</p>
            <p>View spiderman GIF collection in the metaverse 🕸️</p>
            <div className="p-2">{!walletAddress && connectButton()}</div>
            {walletAddress && gifContainer()}
          </div>
        </div>

        <div className="flex font-semibold">
          <img alt="Twitter Logo" className="w-6" src={twitterLogo} />
          <a
            className="p-1"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
