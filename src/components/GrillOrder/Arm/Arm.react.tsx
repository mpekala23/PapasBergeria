import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Button, Image, View } from "react-native";
import Hand from "@assets/views/GrillOrder/Arm.png";
import { getAngleBetween, getRandomInt } from "@utils/Math";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@utils/Constants";
import {
  TapGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";

const ARM_WIDTH = 360;
const ARM_HEIGHT = 120;

interface Props {
  center: { x: number; y: number };
  reachSpeed: number;
  delay: number;
  onGrab: ({ x: number, y: number }) => void;
}

function mapTypeToValue(coord: "x" | "y", type: number): number {
  if (type === 0) {
    return coord === "x"
      ? getRandomInt(-WINDOW_WIDTH / 2, WINDOW_WIDTH / 2)
      : -WINDOW_HEIGHT / 2 - ARM_WIDTH / 2;
  }
  if (type === 1) {
    return coord === "x"
      ? -WINDOW_WIDTH / 2 - ARM_WIDTH / 2
      : getRandomInt(-WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2);
  }
  if (type === 2) {
    return coord === "x"
      ? getRandomInt(-WINDOW_WIDTH / 2, WINDOW_WIDTH / 2)
      : WINDOW_HEIGHT / 2 + ARM_WIDTH / 2;
  }
  if (type === 3) {
    return coord === "x"
      ? WINDOW_WIDTH / 2 + ARM_WIDTH / 2
      : getRandomInt(-WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2);
  }
  return 0;
}

const Arm: React.FC<Props> = ({ center, reachSpeed, delay, onGrab }: Props) => {
  //const type = useRef(0).current;
  const type = useRef(getRandomInt(0, 3)).current;
  const initialX = useRef(mapTypeToValue("x", type)).current;
  const initialY = useRef(mapTypeToValue("y", type)).current;
  const angleBetween = getAngleBetween({ x: initialX, y: initialY }, center);
  const endX = (-Math.cos(angleBetween) * ARM_WIDTH) / 3;
  const endY = (-Math.sin(angleBetween) * ARM_WIDTH) / 3;
  const x = useRef(new Animated.Value(initialX)).current;
  const y = useRef(new Animated.Value(initialY)).current;
  const [reaching, setReaching] = useState(true);
  const [xReached, setXReached] = useState(false);
  const [yReached, setYReached] = useState(false);

  const reach = useCallback(() => {
    Animated.timing(x, {
      toValue: endX,
      duration: reachSpeed,
      useNativeDriver: true,
      delay,
    }).start();
    Animated.timing(y, {
      toValue: endY,
      duration: reachSpeed,
      useNativeDriver: true,
      delay,
    }).start();
  }, []);

  const unreach = useCallback(() => {
    Animated.timing(x, {
      toValue: initialX,
      duration: reachSpeed / 2,
      useNativeDriver: true,
    }).start();
    Animated.timing(y, {
      toValue: initialY,
      duration: reachSpeed / 2,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    x.addListener((val) => {
      if (Math.abs(val.value - endX) < 1) {
        setXReached(true);
      }
    });
    y.addListener((val) => {
      if (Math.abs(val.value - endY) < 1) {
        setYReached(true);
      }
    });
    reach();
    return () => {
      x.removeAllListeners();
      y.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (xReached && yReached) {
      onGrab({ x: initialX, y: initialY });
      unreach();
    }
  }, [xReached, yReached]);

  const getSwatted = useCallback(() => {
    if (reaching) {
      setReaching(false);
      x.stopAnimation();
      y.stopAnimation();
      unreach();
    }
  }, [reaching]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: ARM_WIDTH,
        height: ARM_HEIGHT,
        transform: [{ translateX: x }, { translateY: y }],
      }}
    >
      <TapGestureHandler onHandlerStateChange={getSwatted}>
        <Image
          source={Hand}
          style={{
            width: "100%",
            height: "100%",
            transform: [
              {
                rotate: `${angleBetween}rad`,
              },
            ],
          }}
        />
      </TapGestureHandler>
    </Animated.View>
  );
};

export default Arm;
