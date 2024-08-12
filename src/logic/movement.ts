type MoveType = {
  vertical: number;
  horizontal: number;
  status?: string; //block,eat,upgrade,move,castling
};

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

const kingMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][],
  whiteKing?: KingType,
  blackKing?: KingType
): MoveType[] => {
  let king_moving: MoveType[] = [
    { horizontal, vertical: vertical + 1 },
    { horizontal, vertical: vertical - 1 },
    { horizontal: horizontal + 1, vertical },
    { horizontal: horizontal - 1, vertical },
    { horizontal: horizontal + 1, vertical: vertical + 1 },
    { horizontal: horizontal - 1, vertical: vertical - 1 },
    { horizontal: horizontal + 1, vertical: vertical - 1 },
    { horizontal: horizontal - 1, vertical: vertical + 1 },
  ];
  let castling1 = false;
  let castling2 = false;

  data.forEach((item) => {
    item.forEach((value) => {
      let exists = king_moving.find(
        (el) =>
          el.horizontal === value.horizontal && el.vertical === value.vertical
      );
      if (exists !== undefined) {
        king_moving = king_moving.filter((item) => item !== exists);
        if (value.pion === null) {
          king_moving.push({ ...exists, status: "move" });
        } else if (
          value.pion?.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "")
        ) {
          king_moving.push({ ...exists, status: "eat" });
        }
      }
      if (
        (value.horizontal === 2 ||
          value.horizontal === 3 ||
          value.horizontal === 4) &&
        ((value.vertical === 8 && pion.replace(/[^0-9]/g, "") === "1") ||
          (value.vertical === 1 && pion.replace(/[^0-9]/g, "") === "2")) &&
        value.pion !== null
      ) {
        castling2 = true;
      }
      if (
        (value.horizontal === 6 || value.horizontal === 7) &&
        ((value.vertical === 8 && pion.replace(/[^0-9]/g, "") === "1") ||
          (value.vertical === 1 && pion.replace(/[^0-9]/g, "") === "2")) &&
        value.pion !== null
      ) {
        castling1 = true;
      }
    });
  });

  if (pion.replace(/[^0-9]/g, "") === "1") {
    if (whiteKing !== undefined) {
      if (!whiteKing.move && !whiteKing.check) {
        if (!whiteKing.castling1 && !castling1) {
          king_moving.push({
            vertical: 8,
            horizontal: 7,
            status: "castling",
          });
        }
        if (!whiteKing.castling2 && !castling2) {
          king_moving.push({
            vertical: 8,
            horizontal: 3,
            status: "castling",
          });
        }
      }
    }
  }
  console.log(castling1, castling2);
  console.log(king_moving);

  if (pion.replace(/[^0-9]/g, "") === "2") {
    if (blackKing !== undefined) {
      if (!blackKing.move && !blackKing.check) {
        if (!blackKing.castling1 && !castling1) {
          king_moving.push({
            vertical: 1,
            horizontal: 7,
            status: "castling",
          });
        }
        if (!blackKing.castling2 && !castling2) {
          king_moving.push({
            vertical: 1,
            horizontal: 3,
            status: "castling",
          });
        }
      }
    }
  }

  return king_moving;
};

const queenMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][]
): MoveType[] => {
  const queen_move: MoveType[] = [];
  let x_min = false;
  let x_max = false;
  let y_min = false;
  let y_max = false;
  let x_min_y_min = false;
  let x_max_y_min = false;
  let x_min_y_max = false;
  let x_max_y_max = false;
  for (let i = 1; i < 9; i++) {
    data.forEach((item) =>
      item.forEach((value) => {
        //x_min_y_min
        if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical - i &&
          value.pion === null
        ) {
          if (!x_min_y_min) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical - i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_min_y_min
          ) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_min_y_min = true;
        }
        //x_max_y_min
        if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical - i &&
          value.pion === null
        ) {
          if (!x_max_y_min) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical - i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_max_y_min
          ) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_max_y_min = true;
        }
        //x_max_y_max
        if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical + i &&
          value.pion === null
        ) {
          if (!x_max_y_max) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical + i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_max_y_max
          ) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_max_y_max = true;
        }
        //x_min_y_max
        if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical + i &&
          value.pion === null
        ) {
          if (!x_min_y_max) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical + i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_min_y_max
          ) {
            queen_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_min_y_max = true;
        }
      })
    );
    for (let j = 1; j < 9; j++) {
      data.forEach((item) =>
        item.forEach((value) => {
          //x min
          if (
            value.horizontal === horizontal - j &&
            value.vertical === vertical &&
            value.pion === null
          ) {
            if (!x_min) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal - j &&
            value.vertical === vertical &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !x_min
            ) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            x_min = true;
          }
          //x max
          if (
            value.horizontal === horizontal + j &&
            value.vertical === vertical &&
            value.pion === null
          ) {
            if (!x_max) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal + j &&
            value.vertical === vertical &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !x_max
            ) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            x_max = true;
          }
          //y max
          if (
            value.horizontal === horizontal &&
            value.vertical === vertical + i &&
            value.pion === null
          ) {
            if (!y_max) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal &&
            value.vertical === vertical + i &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !y_max
            ) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            y_max = true;
          }
          //y min
          if (
            value.horizontal === horizontal &&
            value.vertical === vertical - i &&
            value.pion === null
          ) {
            if (!y_min) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal &&
            value.vertical === vertical - i &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !y_min
            ) {
              queen_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            y_min = true;
          }
        })
      );
    }
  }
  return queen_move;
};

const bishopMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][]
): MoveType[] => {
  const bishop_move: MoveType[] = [];
  let x_min_y_min = false;
  let x_max_y_min = false;
  let x_min_y_max = false;
  let x_max_y_max = false;
  for (let i = 1; i < 9; i++) {
    data.forEach((item) =>
      item.forEach((value) => {
        //x_min_y_min
        if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical - i &&
          value.pion === null
        ) {
          if (!x_min_y_min) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical - i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_min_y_min
          ) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_min_y_min = true;
        }
        //x_max_y_min
        if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical - i &&
          value.pion === null
        ) {
          if (!x_max_y_min) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical - i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_max_y_min
          ) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_max_y_min = true;
        }
        //x_max_y_max
        if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical + i &&
          value.pion === null
        ) {
          if (!x_max_y_max) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal + i &&
          value.vertical === vertical + i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_max_y_max
          ) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_max_y_max = true;
        }
        //x_min_y_max
        if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical + i &&
          value.pion === null
        ) {
          if (!x_min_y_max) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "move",
            });
          }
        } else if (
          value.horizontal === horizontal - i &&
          value.vertical === vertical + i &&
          value.pion !== null
        ) {
          if (
            value.pion.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "") &&
            !x_min_y_max
          ) {
            bishop_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: "eat",
            });
          }
          x_min_y_max = true;
        }
      })
    );
  }
  return bishop_move;
};

const knightMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][]
): MoveType[] => {
  let knight_moving: MoveType[] = [
    { horizontal: horizontal + 2, vertical: vertical + 1 },
    { horizontal: horizontal + 2, vertical: vertical - 1 },
    { horizontal: horizontal - 2, vertical: vertical + 1 },
    { horizontal: horizontal - 2, vertical: vertical - 1 },
    { horizontal: horizontal + 1, vertical: vertical + 2 },
    { horizontal: horizontal - 1, vertical: vertical + 2 },
    { horizontal: horizontal + 1, vertical: vertical - 2 },
    { horizontal: horizontal - 1, vertical: vertical - 2 },
  ];

  data.forEach((item) => {
    item.forEach((value) => {
      let exists = knight_moving.find(
        (el) =>
          el.horizontal === value.horizontal && el.vertical === value.vertical
      );
      if (exists !== undefined) {
        knight_moving = knight_moving.filter((item) => item !== exists);
        if (value.pion === null) {
          knight_moving.push({ ...exists, status: "move" });
        } else if (
          value.pion?.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "")
        ) {
          knight_moving.push({ ...exists, status: "eat" });
        }
      }
    });
  });

  return knight_moving;
};

const rookMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][]
): MoveType[] => {
  let rook_move: MoveType[] = [];
  let x_min: boolean = false;
  let x_max: boolean = false;
  let y_min: boolean = false;
  let y_max: boolean = false;

  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      data.forEach((item) =>
        item.forEach((value) => {
          //x min
          if (
            value.horizontal === horizontal - j &&
            value.vertical === vertical &&
            value.pion === null
          ) {
            if (!x_min) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal - j &&
            value.vertical === vertical &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !x_min
            ) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            x_min = true;
          }
          //x max
          if (
            value.horizontal === horizontal + j &&
            value.vertical === vertical &&
            value.pion === null
          ) {
            if (!x_max) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal + j &&
            value.vertical === vertical &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !x_max
            ) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            x_max = true;
          }
          //y max
          if (
            value.horizontal === horizontal &&
            value.vertical === vertical + i &&
            value.pion === null
          ) {
            if (!y_max) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal &&
            value.vertical === vertical + i &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !y_max
            ) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            y_max = true;
          }
          //y min
          if (
            value.horizontal === horizontal &&
            value.vertical === vertical - i &&
            value.pion === null
          ) {
            if (!y_min) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "move",
              });
            }
          } else if (
            value.horizontal === horizontal &&
            value.vertical === vertical - i &&
            value.pion !== null
          ) {
            if (
              value.pion.replace(/[^0-9]/g, "") !==
                pion.replace(/[^0-9]/g, "") &&
              !y_min
            ) {
              rook_move.push({
                vertical: value.vertical,
                horizontal: value.horizontal,
                status: "eat",
              });
            }
            y_min = true;
          }
        })
      );
    }
  }
  return rook_move;
};

const pawnMove = (
  vertical: number,
  horizontal: number,
  pion: string,
  data: IndexType[][],
  turn: number
): MoveType[] => {
  let pawn_move: MoveType[] = [];
  if (pion === "P1") {
    data.forEach((item) =>
      item.forEach((value) => {
        if (
          (value.horizontal === horizontal - 1 &&
            value.vertical === vertical - 1 &&
            value.pion !== null) ||
          (value.horizontal === horizontal + 1 &&
            value.vertical === vertical - 1 &&
            value.pion !== null)
        ) {
          if (
            value.pion?.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "")
          ) {
            pawn_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: value.vertical === 1 ? "upgrade" : "eat",
            });
          }
        } else if (
          value.horizontal === horizontal &&
          value.vertical === vertical - 1 &&
          value.pion === null
        ) {
          pawn_move.push({
            vertical: value.vertical,
            horizontal: value.horizontal,
            status: value.vertical === 1 ? "upgrade" : "move",
          });
        }
      })
    );
    if (turn === 1) {
      pawn_move.push({
        vertical: vertical - 2,
        horizontal: horizontal,
        status: "move",
      });
    }
    return pawn_move;
  } else if (pion === "P2") {
    data.forEach((item) =>
      item.forEach((value) => {
        if (
          (value.horizontal === horizontal - 1 &&
            value.vertical === vertical + 1 &&
            value.pion !== null) ||
          (value.horizontal === horizontal + 1 &&
            value.vertical === vertical + 1 &&
            value.pion !== null)
        ) {
          if (
            value.pion?.replace(/[^0-9]/g, "") !== pion.replace(/[^0-9]/g, "")
          ) {
            pawn_move.push({
              vertical: value.vertical,
              horizontal: value.horizontal,
              status: value.vertical === 8 ? "upgrade" : "eat",
            });
          }
        } else if (
          value.horizontal === horizontal &&
          value.vertical === vertical + 1 &&
          value.pion === null
        ) {
          pawn_move.push({
            vertical: value.vertical,
            horizontal: value.horizontal,
            status: value.vertical === 8 ? "upgrade" : "move",
          });
        }
      })
    );
    if (turn === 2) {
      pawn_move.push({
        vertical: vertical + 2,
        horizontal: horizontal,
        status: "move",
      });
    }
    return pawn_move;
  } else {
    return pawn_move;
  }
};

const getCheck = (data: IndexType[][], player: string): boolean => {
  const currentPion: IndexType[] = [];
  const crossPion: IndexType[] = [];
  data.forEach((item) =>
    item.forEach((value) => {
      if (value.pion !== null) {
        if (value.pion.replace(/[^0-9]/g, "") === player) {
          currentPion.push(value);
        } else if (value.pion !== null) {
          crossPion.push(value);
        }
      }
    })
  );

  // king
  const kingPosition = currentPion.find((pion) => pion.pion === `K${player}`);

  if (kingPosition === undefined) {
    return false; // No king found for the current player, so no check is possible.
  }

  for (const item of crossPion) {
    if (item.pion !== null) {
      let movements: MoveType[] = [];
      switch (item.pion.replace(/[0-9]/g, "")) {
        case "Q":
          movements = queenMove(
            item.vertical,
            item.horizontal,
            item.pion,
            data
          );
          break;
        case "B":
          movements = bishopMove(
            item.vertical,
            item.horizontal,
            item.pion,
            data
          );
          break;
        case "Kn":
          movements = knightMove(
            item.vertical,
            item.horizontal,
            item.pion,
            data
          );
          break;
        case "R":
          movements = rookMove(item.vertical, item.horizontal, item.pion, data);
          break;
        default:
          movements = pawnMove(
            item.vertical,
            item.horizontal,
            item.pion,
            data,
            99
          );
          break;
      }

      for (const value of movements) {
        if (
          value.horizontal === kingPosition.horizontal &&
          value.vertical === kingPosition.vertical &&
          value.status === "eat"
        ) {
          return true; // King is in check
        }
      }
    }
  }
  return false;
};

const getMoveNode = (
  current: IndexType,
  data: IndexType[][],
  turn: number,
  whiteKing?: KingType,
  blackKing?: KingType
): MoveType[] => {
  const vertical = current.vertical;
  const horizontal = current.horizontal;
  const pion = current.pion !== null ? current.pion : "";

  switch (pion.replace(/[0-9]/g, "")) {
    case "K":
      return kingMove(vertical, horizontal, pion, data, whiteKing, blackKing);
    case "Q":
      return queenMove(vertical, horizontal, pion, data);
    case "B":
      return bishopMove(vertical, horizontal, pion, data);
    case "Kn":
      return knightMove(vertical, horizontal, pion, data);
    case "R":
      return rookMove(vertical, horizontal, pion, data);
    default:
      return pawnMove(vertical, horizontal, pion, data, turn);
  }
};

export { getMoveNode, getCheck };
