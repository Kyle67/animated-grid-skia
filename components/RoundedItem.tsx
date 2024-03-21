import {
  Extrapolate,
  Group,
  interpolate,
  RoundedRect,
} from "@shopify/react-native-skia";
import { FC, memo } from "react";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_DISTANCE } from "../constants";

type RoundedItemProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  point: SharedValue<{ x: number; y: number } | null>;
  progress: SharedValue<number>;
};

const RoundedItem: FC<RoundedItemProps> = memo(
  ({ point, progress, ...squareProps }) => {
    const { x, y, width, height } = squareProps;

    const previousDistance = useSharedValue(0);
    const previousTouchedPoint = useSharedValue({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    });

    // console.log({ squareProps });

    const distance = useDerivedValue(() => {
      if (point.value === null) return previousDistance.value;

      previousDistance.value = Math.sqrt(
        (point.value.x - x) ** 2 + (point.value.y - y) ** 2
      );
      return previousDistance.value;
    }, [point.value]);
    // console.log(point.value);

    const scale = useDerivedValue(() => {
      return interpolate(
        distance.value * progress.value,
        [0, MAX_DISTANCE / 2],
        [1, 0],
        {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP,
        }
      );
    }, [distance, progress]);

    //   console.log(scale);

    // const scaledWidth = useDerivedValue(() => {
    //   return scale.value * width;
    // }, [scale]);

    // const scaledHeight = useDerivedValue(() => {
    //   return scale.value * height;
    // }, [scale]);

    // console.log({ scaledHeight, scaledWidth, time: new Date() });

    const transform = useDerivedValue(() => {
      return [{ scale: scale.value }];
    }, [scale]);

    const origin = useDerivedValue(() => {
      if (point.value === null) return previousTouchedPoint.value;

      previousTouchedPoint.value = point.value;
      return previousTouchedPoint.value;
    }, [point]);

    return (
      <Group origin={origin} transform={transform}>
        <RoundedRect
          {...squareProps}
          r={4}
          // width={scaledWidth}
          // height={scaledHeight}
        />
      </Group>
    );
  }
);

export default RoundedItem;
