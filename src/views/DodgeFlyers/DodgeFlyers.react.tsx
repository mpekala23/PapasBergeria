import { Wall } from "@components";
import { useFocusEffect } from "@react-navigation/native";
import { setLostTask } from "@store/Game/GameActions";
import { GameActionTypes } from "@store/Game/GameTypes";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@utils/Constants";
import { getRandomInt } from "@utils/Math";
import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Easing, Image, View } from "react-native";
import {
  Directions,
  FlingGestureHandler,
  State as GestureState,
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import GrassTexture from "@assets/views/DodgeFlyers/GrassTexture.png";
import DirtTexture from "@assets/views/DodgeFlyers/DirtTexture.png";

const BLOCK_SIZE = 64;
const CRITICAL_Y = 2;
const MIN_POS = -1;
const MAX_POS = 1;
const WALL_SPACING = 4;

interface Props {
  loseTask: () => void;
}

const DodgeFlyersScreenBase: React.FC<Props> = ({ loseTask }) => {
  const SPEED = 200;
  const NUM_WALLS = 10;
  const [pos, setPos] = useState<number>(0);
  const playerSlide = useRef(new Animated.Value(0)).current;
  const [dangers, setDangers] = useState<number[]>([]);
  const [walls, setWalls] = useState<JSX.Element[]>([]);
  const textureSlide = useRef(new Animated.Value(-100 * BLOCK_SIZE)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(textureSlide, {
        toValue: 100 * BLOCK_SIZE,
        duration: 200 * SPEED,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
      const result = [];
      let lastRemove = -99999999.1;
      const occupies: number[] = [];
      for (let jx = MIN_POS; jx <= MAX_POS; jx += 1) {
        occupies.push(jx);
      }
      for (let ix = 0; ix < NUM_WALLS; ix += 1) {
        const selectFrom = occupies.filter(
          (occupation) => occupation !== lastRemove
        );
        const removeIx = getRandomInt(0, selectFrom.length - 1);
        lastRemove = selectFrom[removeIx];
        const covers = occupies.filter(
          (occupation) => occupation !== lastRemove
        );
        result.push(
          <Wall
            covers={covers}
            BLOCK_SIZE={BLOCK_SIZE}
            speed={SPEED}
            startingY={-6 - ix * WALL_SPACING}
            criticalY={CRITICAL_Y}
            onCritical={() => {
              setDangers(covers);
            }}
            onUncritical={() => {
              setDangers([]);
            }}
            key={ix.toString()}
          />
        );
      }
      setWalls(result);
    }, [])
  );

  useEffect(() => {
    Animated.timing(playerSlide, {
      toValue: pos * BLOCK_SIZE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [pos]);

  useEffect(() => {
    if (dangers.some((danger) => danger === pos)) {
      loseTask();
    }
  }, [pos, dangers]);

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === GestureState.ACTIVE) {
          if (MIN_POS < pos) setPos((cur) => cur - 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === GestureState.ACTIVE) {
            if (pos < MAX_POS) setPos((cur) => cur + 1);
          }
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Animated.View
            style={{
              position: "absolute",
              height: BLOCK_SIZE * 300,
              width: WINDOW_WIDTH,
              transform: [{ translateY: textureSlide }],
            }}
          >
            <Image
              source={GrassTexture}
              style={{ width: "100%", height: "100%", resizeMode: "repeat" }}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              height: BLOCK_SIZE * 300,
              width: (MAX_POS - MIN_POS + 1) * BLOCK_SIZE,
              transform: [{ translateY: textureSlide }],
            }}
          >
            <Image
              source={DirtTexture}
              style={{ width: "100%", height: "100%", resizeMode: "repeat" }}
            />
          </Animated.View>
          {walls}
          {false &&
            dangers.map((danger) => {
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                    backgroundColor: "yellow",
                    transform: [
                      { translateX: BLOCK_SIZE * danger },
                      { translateY: BLOCK_SIZE * CRITICAL_Y },
                    ],
                  }}
                />
              );
            })}
          <Animated.View
            style={{
              position: "absolute",
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: "yellow",
              borderRadius: BLOCK_SIZE / 2,
              transform: [
                { translateX: playerSlide },
                { translateY: BLOCK_SIZE * CRITICAL_Y },
              ],
            }}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<GameActionTypes>) => ({
  loseTask: () => dispatch(setLostTask(true)),
});
const DodgeFlyersScreen = connect(
  null,
  mapDispatchToProps
)(DodgeFlyersScreenBase);

export default DodgeFlyersScreen;
