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

  tests.assert_false(
    'y axis slide check - collision 1',
    board.movable_inaxis(0, 0, 6, 0)
  );

  tests.assert_false(
    'y axis slide check - collision 2',
    board.movable_inaxis(6, 0, 0, 0)
  );

  tests.assert_true(
    'y axis slide check - collision 3',
    board.movable_inaxis(1, 0, 6, 0)
  );

  tests.assert_true(
    'y axis slide check - collision 4',
    board.movable_inaxis(6, 0, 1, 0)
  );

  board.setPiece(3, 6, 1);
  board.setPiece(3, 0, 1);

  tests.assert_false(
    'y axis slide check - collision 5',
    board.movable_inaxis(1, 6, 6, 6)
  );

  tests.assert_false(
    'y axis slide check - collision 6',
    board.movable_inaxis(6, 6, 1, 6)
  );

  tests.assert_true(
    'y axis slide check - collision 7',
    board.movable_inaxis(1, 6, 2, 6)
  );

  tests.assert_true(
    'y axis slide check - collision 8',
    board.movable_inaxis(6, 6, 4, 6)
  );

  tests.assert_true(
    'x axis slide check - collision 9',
    board.movable_inaxis(3, 0, 3, 6)
  );

  tests.assert_true(
    'x axis slide check - collision 10',
    board.movable_inaxis(3, 6, 3, 0)
  );

  tests.assert_false(
    'x axis slide check - collision 11',
    board.movable_inaxis(3, 0, 3, 7)
  );

  tests.assert_false(
    'x axis slide check - collision 12',
    board.movable_inaxis(3, 7, 3, 0)
  );

  tests.assert_false(
    'slant slide check - collision 1',
    board.movable_diagonal(0, 0, 7, 7)
  );

  tests.assert_true(
    'slant slide check - collision 2',
    board.movable_diagonal(1, 1, 6, 6)
  );

  tests.assert_false(
    'slant slide check - collision 3',
    board.movable_diagonal(7, 7, 0, 0)
  );

  tests.assert_true(
    'slant slide check - collision 4',
    board.movable_diagonal(6, 6, 1, 1)
  );

  tests.assert_false(
    'slant slide check - collision 5',
    board.movable_diagonal(1, 4, 4, 7)
  );

  tests.assert_false(
    'slant slide check - collision 6',
    board.movable_diagonal(4, 7, 1, 4)
  );

  board.log();

  tests.verdict();
}

TEST();