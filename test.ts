import { chess_board, index_t, correct_start_pos } from "./chess-board-state";
import { Asserts } from "./asserts";

function TEST() {
  const tests = new Asserts();
  const board = new chess_board();

  // test starting position
  const get_board_array = [];
  board.startingPosition();
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      get_board_array.push(board.getPiece(i as index_t, j as index_t));
    }
  }

  tests.assert_array_eq(
    'starting board',
    get_board_array,
    correct_start_pos
  );

  tests.assert_eq(
    'y axis slide check - collision 1',
    board.line_slide_possible(0, 0, 6, 0), false
  );

  tests.assert_eq(
    'y axis slide check - collision 2',
    board.line_slide_possible(6, 0, 0, 0), false
  );

  tests.assert_eq(
    'y axis slide check - collision 3',
    board.line_slide_possible(1, 0, 6, 0), true
  );

  tests.assert_eq(
    'y axis slide check - collision 4',
    board.line_slide_possible(6, 0, 1, 0), true
  );

  board.setPiece(3, 6, 1);
  board.setPiece(3, 0, 1);

  tests.assert_eq(
    'y axis slide check - collision 5',
    board.line_slide_possible(1, 6, 6, 6), false
  );

  tests.assert_eq(
    'y axis slide check - collision 6',
    board.line_slide_possible(6, 6, 1, 6), false
  );

  tests.assert_eq(
    'y axis slide check - collision 7',
    board.line_slide_possible(1, 6, 2, 6), true
  );

  tests.assert_eq(
    'y axis slide check - collision 8',
    board.line_slide_possible(6, 6, 4, 6), true
  );

  tests.assert_eq(
    'x axis slide check - collision 9',
    board.line_slide_possible(3, 0, 3, 6), true
  );

  tests.assert_eq(
    'x axis slide check - collision 10',
    board.line_slide_possible(3, 6, 3, 0), true
  );

  tests.assert_eq(
    'x axis slide check - collision 11',
    board.line_slide_possible(3, 0, 3, 7), false
  );

  tests.assert_eq(
    'x axis slide check - collision 12',
    board.line_slide_possible(3, 7, 3, 0), false
  );

  board.log();

  tests.verdict();
}

TEST();