import React, { useEffect, useState } from "react";
import { Eating, Node, UpgradeModal, UserProfile } from "../components";
import { getMoveNode } from "../logic/movement";

type IndexType = {
  horizontal: number;
  vertical: number;
  pion: string | null;
};

type KingType = {
  move: boolean;
  castling1: boolean;
  castling2: boolean;
  check: boolean;
  checkmate: boolean;
};

type MoveType = {
  vertical: number;
  horizontal: number;
  status?: string;
};

const BoardPage: React.FC = () => {
  const [index, setIndex] = useState<IndexType[][]>([]);
  const [whiteEat, setWhiteEat] = useState<string[]>([]);
  const [blackEat, setBlackEat] = useState<string[]>([]);
  const [movement, setMovement] = useState<MoveType[]>([]);
  const [turn, setTurn] = useState<number>(1);
  const [openUpgrade, setOpenUpgrade] = useState<boolean>(false);
  const [current, setCurrent] = useState<IndexType | null>(null);
  const [whiteKing, setWhiteKing] = useState<KingType>();
  const [blackKing, setBlackKing] = useState<KingType>();
  const setup = [
    ["R1", "Kn1", "B1", "Q1", "K1", "B1", "Kn1", "R1"],
    ["R2", "Kn2", "B2", "Q2", "K2", "B2", "Kn2", "R2"],
  ];

  useEffect(() => {
    const value: IndexType[][] = [];
    for (let i = 1; i < 9; i++) {
      const items: IndexType[] = [];
      for (let j = 1; j < 9; j++) {
        items.push({
          horizontal: j,
          vertical: i,
          pion:
            i === 2
              ? "P2"
              : i === 7
              ? "P1"
              : i === 1
              ? setup[1][j - 1]
              : i === 8
              ? setup[0][j - 1]
              : null,
        });
      }
      value.push(items);
    }
    const king: KingType = {
      move: false,
      castling1: false,
      castling2: false,
      check: false,
      checkmate: false,
    };
    setWhiteKing(king);
    setBlackKing(king);
    setIndex(value);
  }, []);

  const clickHandle = (value: IndexType | null): void => {
    if (value !== null) {
      const move: MoveType[] = getMoveNode(
        value,
        index,
        turn,
        whiteKing,
        blackKing
      );
      setMovement(move);
    } else {
      setMovement([]);
    }
    setCurrent(value);
  };

  const eatHandle = (pion: string) => {
    const number = pion.replace(/[^0-9]/g, "");

    if (number === "1") {
      setBlackEat((prevBlackEat) => [...prevBlackEat, pion]);
    } else if (number === "2") {
      setWhiteEat((prevWhiteEat) => [...prevWhiteEat, pion]);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex p-4 bg-gray-100 h-[50vw] w-[100vw] md:h-[100vh] md:w-[50vh] items-center md:items-end">
        <div className="flex flex-row md:flex-col gap-4 w-full">
          <UserProfile
            turn={turn % 2 !== 0}
            name="Player 1"
            job="White player"
          />
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <Eating data={whiteEat} />
          </div>
        </div>
      </div>
      <div className="bg-gray-400 h-[100vw] w-[100vw] md:h-[100vh] md:w-[100vh]">
        <div className="w-full h-full flex flex-col">
          {index.map((value, key) => (
            <div
              key={`${key}-vertical`}
              className="w-full h-full flex flex-row"
            >
              {value.map((item) => (
                <Node
                  data={item}
                  turn={turn}
                  setIndex={setIndex}
                  indexData={index}
                  movement={movement}
                  whiteKing={whiteKing}
                  blackKing={blackKing}
                  current={current}
                  setEat={eatHandle}
                  setTurn={setTurn}
                  setCurrent={clickHandle}
                  setBlackKing={setBlackKing}
                  setWhiteKing={setWhiteKing}
                  setUpgrade={() => setOpenUpgrade(true)}
                  key={`${item.vertical + item.horizontal}-node`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex p-4 bg-gray-100 h-[50vw] w-[100vw] md:h-[100vh] md:w-[50vh] items-center md:items-start">
        <div className="flex flex-row md:flex-col gap-4 w-full">
          <UserProfile
            turn={turn % 2 === 0}
            name="Player 2"
            job="Black player"
          />
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <Eating data={blackEat} />
          </div>
        </div>
      </div>
      <UpgradeModal
        isOpen={openUpgrade}
        setIsOpen={setOpenUpgrade}
        setIndex={setIndex}
        setCurrent={setCurrent}
        current={current}
      />
    </div>
  );
};

export default BoardPage;
