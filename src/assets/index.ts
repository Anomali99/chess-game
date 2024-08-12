import king_black from "./King Black.png";
import queen_black from "./Queen Black.png";
import rook_black from "./Rook Black.png";
import bishop_black from "./Bishop Black.png";
import knight_black from "./Knight Black.png";
import pawn_black from "./Pawn Black.png";
import king_white from "./King White.png";
import queen_white from "./Queen White.png";
import rook_white from "./Rook White.png";
import bishop_white from "./Bishop White.png";
import knight_white from "./Knight White.png";
import pawn_white from "./Pawn White.png";
import users from "./users.svg";

const getImageSrc = (pion: string | null) => {
  switch (pion) {
    case "K1":
      return king_white;
    case "Q1":
      return queen_white;
    case "B1":
      return bishop_white;
    case "Kn1":
      return knight_white;
    case "R1":
      return rook_white;
    case "P1":
      return pawn_white;
    case "K2":
      return king_black;
    case "Q2":
      return queen_black;
    case "B2":
      return bishop_black;
    case "Kn2":
      return knight_black;
    case "R2":
      return rook_black;
    case "P2":
      return pawn_black;
    default:
      return "";
  }
};

const getImageAlt = (pion: string | null) => {
  switch (pion) {
    case "K1":
      return "King White";
    case "Q1":
      return "Queen White";
    case "B1":
      return "Bishop White";
    case "Kn1":
      return "Knight White";
    case "R1":
      return "Rook White";
    case "P1":
      return "Pawn White";
    case "K2":
      return "King Black";
    case "Q2":
      return "Queen Black";
    case "B2":
      return "Bishop Black";
    case "Kn2":
      return "Knight Black";
    case "R2":
      return "Rook Black";
    case "P2":
      return "Pawn Black";
    default:
      return "";
  }
};

export { users, getImageSrc, getImageAlt };
