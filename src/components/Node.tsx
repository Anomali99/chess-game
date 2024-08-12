import React, { useCallback, useEffect, useState } from "react";
import { getImageAlt, getImageSrc } from "../assets";
import { getCheck } from "../logic/movement";

type IndexType = {
  horizontal: number;
  vertical: number;
  pion: string | null;
};

type MoveType = {
  vertical: number;
  horizontal: number;
  status?: string;
};

type KingType = {
  move: boolean;
  castling1: boolean;
  castling2: boolean;
  check: boolean;
  checkmate: boolean;
};

type PropsType = {
  turn: number;
  data: IndexType;
  indexData: IndexType[][];
  movement: MoveType[];
  current: IndexType | null;
  whiteKing: KingType | undefined;
  blackKing: KingType | undefined;
  setWhiteKing: React.Dispatch<React.SetStateAction<KingType | undefined>>;
  setBlackKing: React.Dispatch<React.SetStateAction<KingType | undefined>>;
  setIndex: React.Dispatch<React.SetStateAction<IndexType[][]>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  setCurrent: (value: IndexType | null) => void;
  setEat: (pion: string) => void;
  setUpgrade: () => void;
};

const Node: React.FC<PropsType> = (props) => {
  const [isBlack, setIsBlack] = useState<boolean>(true);
  const [moved, setMoved] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setIsBlack(
      (props.data.horizontal % 2 === 0 && props.data.vertical % 2 !== 0) ||
        (props.data.horizontal % 2 !== 0 && props.data.vertical % 2 === 0)
    );
    if (getCheck(props.indexData, "1")) {
      if (props.whiteKing !== undefined) {
        let whiteKing = props.whiteKing;
        whiteKing = { ...whiteKing, check: true };
        props.setWhiteKing(whiteKing);
      }
    }
    if (getCheck(props.indexData, "2")) {
      if (props.blackKing !== undefined) {
        let blackKing = props.blackKing;
        blackKing = { ...blackKing, check: true };
        props.setBlackKing(blackKing);
      }
    }
    setMoved(getMoved());
  }, [props.data, props.current, props.movement]);

  const getMoved = useCallback((): boolean => {
    const moving = props.movement.find(
      (move) =>
        props.data.vertical === move.vertical &&
        props.data.horizontal === move.horizontal
    );
    setStatus(moving?.status || "");
    return moving ? true : false;
  }, [props.movement, props.data, props.turn]);

  const setKing = () => {
    const pion = props.current?.pion || "";
    const vertical = props.current?.vertical || 0;
    const horizontal = props.current?.horizontal || 0;
    const defaultKing = {
      move: false,
      castling1: false,
      castling2: false,
      check: false,
      checkmate: false,
    };
    if (pion.replace(/[^0-9]/g, "") === "1" && vertical === 8) {
      let whiteKing = props.whiteKing || defaultKing;
      if (pion === "R1") {
        if (horizontal === 1) {
          whiteKing = { ...whiteKing, castling2: true };
        }
        if (horizontal === 8) {
          whiteKing = { ...whiteKing, castling1: true };
        }
      }
      if (pion === "K1") {
        whiteKing = { ...whiteKing, move: true };
      }
      props.setWhiteKing(whiteKing);
    }
    if (pion.replace(/[^0-9]/g, "") === "2" && vertical === 1) {
      let blackKing = props.blackKing || defaultKing;
      if (pion === "R2") {
        if (horizontal === 1) {
          blackKing = { ...blackKing, castling2: true };
        }
        if (horizontal === 8) {
          blackKing = { ...blackKing, castling1: true };
        }
      }
      if (pion === "K2") {
        blackKing = { ...blackKing, move: true };
      }
      props.setBlackKing(blackKing);
    }
  };

  const moveHandle = () => {
    if (props.current !== null) {
      props.setIndex((prevIndex: IndexType[][]) =>
        prevIndex.map((indexRow: IndexType[]) =>
          indexRow.map((index: IndexType) =>
            index.vertical === props.data.vertical &&
            index.horizontal === props.data.horizontal
              ? props.current !== null
                ? { ...index, pion: props.current.pion }
                : index
              : index.vertical === props.current?.vertical &&
                index.horizontal === props.current?.horizontal
              ? { ...index, pion: null }
              : index
          )
        )
      );
      setKing();
      props.setCurrent(null);
      props.setTurn((turn) => turn + 1);
    }
  };

  const eatHandle = () => {
    props.setEat(props.data.pion || "");
    moveHandle();
  };

  const upgradeHandle = () => {
    const pion = props.current?.pion || null;
    if (props.data.pion === null) {
      moveHandle();
    } else {
      eatHandle();
    }
    props.setCurrent({ ...props.data, pion: pion });
    props.setUpgrade();
  };

  return (
    <div
      onClick={() =>
        status === "upgrade"
          ? upgradeHandle()
          : props.data.pion !== null
          ? status === "eat"
            ? eatHandle()
            : (props.turn % 2 === 0 &&
                props.data.pion.replace(/[^0-9]/g, "") === "2") ||
              (props.turn % 2 !== 0 &&
                props.data.pion.replace(/[^0-9]/g, "") === "1")
            ? props.setCurrent(props.data)
            : {}
          : moved
          ? moveHandle()
          : {}
      }
      className={`w-full h-full border border-black border-solid ${
        props.data === props.current
          ? "bg-purple-600"
          : props.current !== null && moved
          ? status === "move"
            ? "bg-purple-400 hover:bg-purple-500 cursor-pointer"
            : status === "eat"
            ? "bg-red-400 hover:bg-red-500 cursor-pointer"
            : status === "upgrade"
            ? "bg-green-400 hover:bg-green-500 cursor-pointer"
            : status === "castling"
            ? "bg-blue-400 hover:bg-blue-500 cursor-pointer"
            : isBlack
            ? `bg-black ${
                props.data.pion !== null
                  ? "hover:bg-gray-800 cursor-pointer"
                  : ""
              }`
            : `bg-white ${
                props.data.pion !== null
                  ? "hover:bg-gray-300 cursor-pointer"
                  : ""
              }`
          : props.data.pion === "K1" && props.whiteKing?.check
          ? "bg-pink-500"
          : props.data.pion === "K2" && props.blackKing?.check
          ? "bg-pink-500"
          : isBlack
          ? `bg-black ${
              props.data.pion !== null ? "hover:bg-gray-800 cursor-pointer" : ""
            }`
          : `bg-white ${
              props.data.pion !== null ? "hover:bg-gray-300 cursor-pointer" : ""
            }`
      }`}
    >
      {props.data.pion !== null ? (
        <img
          className="w-full object-scale-down aspect-square"
          src={getImageSrc(props.data.pion)}
          alt={getImageAlt(props.data.pion)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Node;
