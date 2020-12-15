import React, { Dispatch, useCallback, useRef, useState } from "react";
import { Animated, Image, View } from "react-native";
import Chicken from "@assets/views/GrillOrder/Chicken.png";
import { Arm } from "@components";
import Hand from "@assets/views/GrillOrder/Arm.png";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@utils/Constants";
import { getAngleBetween } from "@utils/Math";
import { useFocusEffect } from "@react-navigation/native";
import { GameActionTypes } from "@store/Game/GameTypes";
import { setLostTask } from "@store/Game/GameActions";
import { connect } from "react-redux";

const REACH_SPEED = 1600;
const CHICKEN_SLOWDOWN = 1.7;

interface Props {
  loseTask: () => void;
}

const GrillOrderScreenBase: React.FC<Props> = ({ loseTask }) => {
  const NUM_HANDS = 6;
  const SPACING = 300;
  const [arms, setArms] = useState<JSX.Element[]>([]);
  const chickenX = useRef(new Animated.Value(0)).current;
  const chickenY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const result = [];
      for (let ix = 0; ix < NUM_HANDS; ix += 1) {
        result.push(
          <Arm
            center={{ x: 0, y: 0 }}
            reachSpeed={REACH_SPEED}
            delay={SPACING * ix}
            onGrab={({ x, y }: { x: number; y: number }) => {
              loseTask();
              Animated.timing(chickenX, {
                toValue: x,
                duration: REACH_SPEED / CHICKEN_SLOWDOWN,
                useNativeDriver: true,
              }).start();
              Animated.timing(chickenY, {
                toValue: y,
                duration: REACH_SPEED / CHICKEN_SLOWDOWN,
                useNativeDriver: true,
              }).start();
            }}
            key={ix.toString()}
          />
        );
      }
      setArms(result);
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          transform: [{ translateX: chickenX }, { translateY: chickenY }],
        }}
      >
        <Image
          source={Chicken}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>
      {arms}
    </View>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<GameActionTypes>) => ({
  loseTask: () => dispatch(setLostTask(true)),
});
const GrillOrderScreen = connect(
  null,
  mapDispatchToProps
)(GrillOrderScreenBase);

export default GrillOrderScreen;
