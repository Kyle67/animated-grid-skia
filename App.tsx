import {
  Canvas,
  Group,
  SweepGradient,
  useTouchHandler,
  vec,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RoundedItem from "./components/RoundedItem";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDING,
  SQUARE_CONTAINER_SIZE,
  SQUARE_SIZE,
  SQUARES_AMOUNT_HORIZONTAL,
  SQUARES_AMOUNT_VERTICAL,
} from "./constants";

export default function App() {
  const touchedPoint = useSharedValue<{ x: number; y: number } | null>(null);

  const progress = useSharedValue(0);

  const touchHandler = useTouchHandler({
    onStart: (event) => {
      progress.value = withTiming(1, { duration: 300 });
      touchedPoint.value = { x: event.x, y: event.y };
    },
    onActive: (event) => {
      touchedPoint.value = { x: event.x, y: event.y };
      // console.log(touchedPoint.value);
    },
    onEnd: () => {
      progress.value = withTiming(0, { duration: 300 });
      touchedPoint.value = null;
    },
  });

  return (
    <View style={styles.container}>
      <Canvas
        style={[
          {
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
          },
        ]}
        onTouch={touchHandler}
      >
        <Group>
          {new Array(SQUARES_AMOUNT_HORIZONTAL).fill(0).map((_, i) => {
            return new Array(SQUARES_AMOUNT_VERTICAL)
              .fill(0)
              .map((_, j) => (
                <RoundedItem
                  key={`i${i}-j${j}`}
                  x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  point={touchedPoint}
                  progress={progress}
                />
              ));
          })}
          <SweepGradient
            c={vec(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={["cyan", "magenta", "yellow", "cyan"]}
          />
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
