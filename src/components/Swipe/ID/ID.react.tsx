import { distance } from "@utils/Math";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image } from "react-native";
import {
  PanGestureHandler,
  State as GestureState,
} from "react-native-gesture-handler";
import { ID_HEIGHT, ID_WIDTH, WINDOW_WIDTH } from "@utils/Constants";
import { getRandomId } from "@utils/Swipe";

interface Props {
  initialX: number;
  initialY: number;
  maxY: number;
  xVelThreshold: number;
  keyPositions: { x: number; y: number }[];
  onError: (text: "too fast" | "wrong id" | "bad read") => void;
  onRead: () => void;
  onThrow: () => void;
}

const ID: React.FC<Props> = ({
  initialX,
  initialY,
  maxY,
  keyPositions,
  xVelThreshold,
  onError,
  onRead,
  onThrow,
}) => {
  const translationX = useRef(new Animated.Value(initialX)).current;
  const translationY = useRef(new Animated.Value(initialY)).current;
  const [panable, setPanable] = useState(true);
  const [hitBottom, setHitBottom] = useState(false);
  const [keyState, setKeyState] = useState(0);
  const [harvard, setHarvard] = useState(true);
  const [source, setSource] = useState<any>();
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const newCard = getRandomId(0.7);
    setHarvard(newCard.harvard);
    setSource(newCard.source);
  }, []);

  const cancelGesture = useCallback(() => setPanable(false), []);
  useEffect(() => {
    if (!panable) setPanable(true);
  }, [panable]);

  const reset = useCallback(() => {
    Animated.timing(translationX, {
      toValue: initialX,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(translationY, {
      toValue: initialY,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setKeyState(0);
      setHitBottom(false);
    });
  }, []);

  const swipe = useCallback(() => {
    setSwiped(true);
    const newCard = getRandomId(0.7);
    setHarvard(newCard.harvard);
    setSource(newCard.source);
    translationX.setValue(initialX);
    translationY.setValue(initialY);
    setHitBottom(false);
    setKeyState(0);
    setTimeout(() => {
      setSwiped(false);
    }, 10);
  }, []);

  return (
    <PanGestureHandler
      enabled={panable}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === GestureState.END) {
          if (keyState >= keyPositions.length && hitBottom) {
            if (harvard) {
              onRead();
              swipe();
            } else {
              onError("wrong id");
              reset();
            }
          } else {
            if (!harvard && e.nativeEvent.velocityX < 0) {
              onThrow();
              swipe();
            } else {
              onError("bad read");
              reset();
            }
          }
        }
      }}
      onGestureEvent={(e) => {
        const abs = {
          x: e.nativeEvent.translationX + initialX,
          y: Math.min(e.nativeEvent.translationY, maxY) + initialY,
        };
        if (
          keyState < keyPositions.length &&
          distance(abs, keyPositions[keyState]) < 100
        ) {
          setKeyState((state) => state + 1);
        }
        if (hitBottom || initialY + e.nativeEvent.translationY > maxY) {
          translationX.setValue(initialX + e.nativeEvent.translationX);
          if (!hitBottom) setHitBottom(true);
        } else {
          translationX.setValue(initialX + e.nativeEvent.translationX);
          translationY.setValue(initialY + e.nativeEvent.translationY);
        }
        if (hitBottom && e.nativeEvent.velocityX > xVelThreshold) {
          cancelGesture();
          setTimeout(reset, 10);
          onError("too fast");
        }
        if (
          hitBottom &&
          e.nativeEvent.velocityX < 0 &&
          e.nativeEvent.absoluteX > 100
        ) {
          cancelGesture();
          setTimeout(reset, 10);
          onError("bad read");
        }
      }}
    >
      <Animated.View
        style={{
          width: ID_WIDTH,
          height: ID_HEIGHT,
          transform: [
            { translateX: translationX },
            { translateY: translationY },
          ],
        }}
      >
        {!swiped && source && (
          <Image source={source} style={{ width: "100%", height: "100%" }} />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ID;
