import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Image, Text, View } from "react-native";
import { ID } from "@components";
import {
  ID_HEIGHT,
  ID_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@utils/Constants";
import Wood from "@assets/views/Swipe/Wood.png";
import ScannerBackground from "@assets/views/Swipe/ScannerBackground.png";
import ScannerForeground from "@assets/views/Swipe/ScannerForeground.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams, Screens } from "@utils/Screens";
import { GameActionTypes } from "@store/Game/GameTypes";
import { setWonTask } from "@store/Game/GameActions";
import { connect } from "react-redux";

const keyHeight = WINDOW_HEIGHT - (WINDOW_WIDTH * 3) / 4 - ID_HEIGHT / 6;
const keyPositions = [
  { x: ID_WIDTH / 3, y: keyHeight },
  { x: WINDOW_WIDTH - ID_WIDTH / 3, y: keyHeight },
];

interface Props {
  winTask: () => void;
}

const SwipeScreenBase: React.FC<Props> = ({ winTask }) => {
  const SWIPES_NEEDED = 3;

  const [message, setMessage] = useState<string | null>(null);
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const [numSwiped, setNumSwiped] = useState(0);

  const showMessage = useCallback((text) => {
    setMessage(text);
    messageOpacity.setValue(1.0);
    Animated.timing(messageOpacity, {
      toValue: 0,
      duration: 200,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (numSwiped >= SWIPES_NEEDED) {
      winTask();
    }
  }, [numSwiped]);

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      <Image
        source={Wood}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "repeat",
          transform: [{ scale: 2 }, { rotate: "90deg" }],
        }}
      />
      <Image
        source={ScannerBackground}
        style={{
          position: "absolute",
          width: "100%",
          height: (WINDOW_WIDTH * 3) / 4,
          bottom: -32,
          resizeMode: "stretch",
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      />
      <ID
        initialX={WINDOW_WIDTH / 2 - ID_WIDTH / 2}
        initialY={ID_HEIGHT / 2}
        maxY={keyHeight - ID_HEIGHT / 2}
        keyPositions={keyPositions}
        xVelThreshold={1200}
        onError={(text) => showMessage(text)}
        onRead={() => setNumSwiped((val) => val + 1)}
        onThrow={() => {}}
      />
      <Image
        source={ScannerForeground}
        style={{
          position: "absolute",
          width: "100%",
          height: (WINDOW_WIDTH * 3) / 4 + 1,
          resizeMode: "stretch",
          bottom: -32,
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: (WINDOW_WIDTH * 3) / 16,
          left: WINDOW_WIDTH / 2 - 64,
          fontSize: 64,
          color: "yellow",
        }}
      >
        {numSwiped}
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: (WINDOW_WIDTH * 3) / 48,
          left: WINDOW_WIDTH / 2 + 24,
          fontSize: 64,
          color: "yellow",
        }}
      >
        {SWIPES_NEEDED}
      </Text>
      <Animated.View
        style={{
          opacity: messageOpacity,
          position: "absolute",
          alignSelf: "center",
          top: "50%",
        }}
      >
        <Text>{message}</Text>
      </Animated.View>
    </View>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<GameActionTypes>) => ({
  winTask: () => dispatch(setWonTask(true)),
});
const SwipeScreen = connect(null, mapDispatchToProps)(SwipeScreenBase);

export default SwipeScreen;
