import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";

interface Props {
  covers: number[];
  BLOCK_SIZE: number;
  speed: number;
  startingY: number;
  criticalY: number;
  onCritical: () => void;
  onUncritical: () => void;
}

const Wall: React.FC<Props> = ({
  covers,
  BLOCK_SIZE,
  speed,
  startingY,
  criticalY,
  onCritical,
  onUncritical,
}) => {
  const [y, setY] = useState(startingY);
  const yAnim = useRef(new Animated.Value(startingY * BLOCK_SIZE)).current;

  useEffect(() => {
    Animated.timing(yAnim, {
      toValue: 6 * BLOCK_SIZE,
      duration: speed * (6 - startingY),
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setY((val) => val + 1);
    });

    setTimeout(onCritical, (criticalY - startingY - 1) * speed);
    setTimeout(onUncritical, (criticalY - startingY) * speed);
  }, []);

  return (
    <>
      {covers.map((pos) => (
        <Animated.View
          style={{
            position: "absolute",
            width: BLOCK_SIZE,
            height: BLOCK_SIZE,
            backgroundColor: "black",
            transform: [
              { translateX: pos * BLOCK_SIZE },
              { translateY: yAnim },
            ],
          }}
          key={pos.toString()}
        />
      ))}
    </>
  );
};

export default Wall;
