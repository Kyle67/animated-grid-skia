import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

export const SQUARES_AMOUNT_HORIZONTAL = 10;
export const SQUARE_CONTAINER_SIZE = WINDOW_WIDTH / SQUARES_AMOUNT_HORIZONTAL;
export const PADDING = 10;
export const SQUARE_SIZE = Math.floor(SQUARE_CONTAINER_SIZE - PADDING);

export const SQUARES_AMOUNT_VERTICAL =
  Math.floor(WINDOW_HEIGHT / SQUARE_CONTAINER_SIZE) - 3;

export const CANVAS_WIDTH = WINDOW_WIDTH;
export const CANVAS_HEIGHT = SQUARES_AMOUNT_VERTICAL * SQUARE_CONTAINER_SIZE;

export const MAX_DISTANCE = Math.sqrt(CANVAS_WIDTH ** 2 + CANVAS_HEIGHT ** 2);
