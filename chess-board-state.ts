export type index_t = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const correct_start_pos = [
  0x04, 0x02, 0x03, 0x05, 0x06, 0x03, 0x02, 0x04,
  0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x81, 0x81,
  0x84, 0x82, 0x83, 0x85, 0x86, 0x83, 0x82, 0x84
];

/** `&` with a piece, `128` if black, `0` if white. */
const BLACK = 0b10000000;
const WHITE = 0b00000000;

type white_t = 0b00000000;
type black_t = 0b10000000;
type color_t = white_t | black_t;

/** `&` with a king piece, `16` if king can't castle anymore. */
const CASTLED = 0b10000;

/** `&` with a piece, `8` it was moved already. */
const MOVED = 0b1000;

const PAWN = 1;
const KNIGHT = 2;
const BISHOP = 3;
const ROOK = 4;
const QUEEN = 5;
const KING = 6;
const EMPTY = 0;
const PIECE_MASK = 0b00000011;

const OUTBOUND = 255;

/** Chess board representation class. */
export class chess_board {
  private board: Uint8Array;
  private white: color_t;

  constructor() {
    this.board = new Uint8Array(12 * 10);
    this.white = WHITE;
    for (let i = 0; i < this.board.length; ++i) {
      this.board[i] = OUTBOUND;
    }
    this.clear();
  }

  public line_slide_possible(xs: index_t, ys: index_t, xd: index_t, yd: index_t) : boolean {
    if (xs === xd) {
      const distance = yd - ys;
      const step = (distance < 0) ? -1 : 1;
      for (let j = (ys + step) as index_t; j !== yd; j += step) {
        if (this.getPiece(xs, j) !== EMPTY) {
          return false;
        }
      }
      return true;
    } else if (ys === yd) {
      const distance = xd - xs;
      const step = (distance < 0) ? -1 : 1;
      for (let i = (xs + step) as index_t; i !== xd; i += step) {
        if (this.getPiece(i, ys) !== EMPTY) {
          return false;
        }
      }
      return true;
    } else {
      console.error('not a straight line');
      return false;
    }
  }

  /** Move a piece in the board.
   * @remarks starting point`(xs, ys)`, destination point `(xd, yd)`.
   * @param xs piece row position in the 8x8 board.
   * @param ys piece col position in the 8x8 board.
   * @param xd piece row target position in the 8x8 board.
   * @param yd piece col target position in the 8x8 board.
   */
  public move(xs: index_t, ys: index_t, xd: index_t, yd: index_t) : boolean {
    const piece = this.getPiece(xs, ys);

    // check if moving in the same location.
    if(xs === xd && ys === yd) {
      console.error('Invalid move - cannot move in the same square');
      return false;
    }

    // check if piece is empty
    if(piece === EMPTY) {
      console.error('Invalid move - empty piece');
      return false;
    }

    // check if destination is not a sentinel value.
    if(piece === OUTBOUND) {
      console.error('target square is out of bound');
      return false;
    }

    // check if piece color match the turn.
    if (this.white === (BLACK & piece)) {
      console.error('moved');
    } else {
      console.error('Invalid move - color mismatch');
      return false;
    }

    // check if piece color is the with the target square piece.
    const scolor = this.getPiece(xs, ys) & BLACK;
    const dcolor = this.getPiece(xd, yd) & BLACK;
    if (scolor === dcolor) {
      console.error('Invalid move - target piece has the same color');
      return false;
    }

    // piece move checks.
    switch(PIECE_MASK | piece) {
      case PAWN: {
        // check pawn if first move.
        // check pawn if 
        break;
      }
      case ROOK: {
        break;
      }
      case KNIGHT: {
        break;
      }
      case BISHOP: {
        break;
      }
      case KING: {
        break;
      }
      case QUEEN: {
        break;
      }
    }

    // all checks passed
    this.setPiece(xs, ys, EMPTY);
    this.setPiece(xd, yd, piece);

    this.white = (this.white) ? WHITE : BLACK;
    return true;
  }

  public setTurnWhite() {
    this.white = WHITE;
  }

  public setTurnBlack() {
    this.white = BLACK;
  }

  /** Set a piece in the 8x8 board using the indecies of the squares. */
  public setPiece(i: index_t, j: index_t, piece: number) {
    this.board[(i + 2) * 10 + (j + 1)] = piece;
  }

  /** Get a piece in the 8x8 board using the indecies of the squares. */
  public getPiece(i: index_t, j: index_t) {
    return this.board[(i + 2) * 10 + (j + 1)];
  }

  /** Remove all pieces in the board. */
  public clear() {
    for (let i: index_t = 0; i < 8; ++i) {
      for (let j: index_t = 0; j < 8; ++j) {
        this.setPiece(i as index_t, j as index_t, EMPTY);
      }
    }
  }

  /** Set pieces to the classical default position. */
  public startingPosition() {
    this.clear();
    this.white = WHITE;

    this.setPiece(0, 0, ROOK);
    this.setPiece(0, 1, KNIGHT);
    this.setPiece(0, 2, BISHOP);
    this.setPiece(0, 3, QUEEN);
    this.setPiece(0, 4, KING);
    this.setPiece(0, 5, BISHOP);
    this.setPiece(0, 6, KNIGHT);
    this.setPiece(0, 7, ROOK);

    this.setPiece(1, 0, PAWN);
    this.setPiece(1, 1, PAWN);
    this.setPiece(1, 2, PAWN);
    this.setPiece(1, 3, PAWN);
    this.setPiece(1, 4, PAWN);
    this.setPiece(1, 5, PAWN);
    this.setPiece(1, 6, PAWN);
    this.setPiece(1, 7, PAWN);

    this.setPiece(7, 0, BLACK | ROOK);
    this.setPiece(7, 1, BLACK | KNIGHT);
    this.setPiece(7, 2, BLACK | BISHOP);
    this.setPiece(7, 3, BLACK | QUEEN);
    this.setPiece(7, 4, BLACK | KING);
    this.setPiece(7, 5, BLACK | BISHOP);
    this.setPiece(7, 6, BLACK | KNIGHT);
    this.setPiece(7, 7, BLACK | ROOK);

    this.setPiece(6, 0, BLACK | PAWN);
    this.setPiece(6, 1, BLACK | PAWN);
    this.setPiece(6, 2, BLACK | PAWN);
    this.setPiece(6, 3, BLACK | PAWN);
    this.setPiece(6, 4, BLACK | PAWN);
    this.setPiece(6, 5, BLACK | PAWN);
    this.setPiece(6, 6, BLACK | PAWN);
    this.setPiece(6, 7, BLACK | PAWN);
  }

  /** Display the raw board in the console */
  public log_raw() {
    console.log(`color: ${(this.white) ? 'White' : 'Black'}\n`);
    for (let i = 0; i < 120; i += 10) {
      console.log(
        this.board[i].toString(16).padStart(2,'0'),
        this.board[i + 1].toString(16).padStart(2,'0'),
        this.board[i + 2].toString(16).padStart(2,'0'),
        this.board[i + 3].toString(16).padStart(2,'0'),
        this.board[i + 4].toString(16).padStart(2,'0'),
        this.board[i + 5].toString(16).padStart(2,'0'),
        this.board[i + 6].toString(16).padStart(2,'0'),
        this.board[i + 7].toString(16).padStart(2,'0'),
        this.board[i + 8].toString(16).padStart(2,'0'),
        this.board[i + 9].toString(16).padStart(2,'0')
      );
    }
  }

  /** Display the board in the console */
  public log() {
    console.log(`color: ${(this.white) ? 'White' : 'Black'}\n`);
    for (let i = 0; i < 8; ++i) {
      console.log(
        this.getPiece(i as index_t, 0).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 1).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 2).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 3).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 4).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 5).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 6).toString(16).padStart(2, '0'),
        this.getPiece(i as index_t, 7).toString(16).padStart(2, '0')
      )
    }
  }
}