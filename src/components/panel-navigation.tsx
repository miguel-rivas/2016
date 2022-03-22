import { ReactElement } from "react";
import Row from './row';
import Column from './column';
import Btn from './btn';
import { useDispatch, useSelector } from 'react-redux';
import classNames from "classnames";
import { toggleTheme } from '../redux/theme';
import { togglePanelVisibility } from "../redux/panel";

function playSound() {
  let context = new AudioContext();
  let newSound = context.createOscillator();
  let newGain = context.createGain();
  newSound.connect(newGain);
  newSound.frequency.value = 300;
  newGain.connect(context.destination);
  newSound.start(0);
  newGain.gain.exponentialRampToValueAtTime(
    0.00000001,
    context.currentTime + 0.5
  );
};

function Navigation(props): ReactElement {
  const dispatch = useDispatch();
  const navigationRoutes = [
    { icon: "monster", name: "home", polygons: [{ scale: 1, },], },
  ];
  const result = [];
  navigationRoutes.forEach((item, index) => {
    result.push(
      <Btn
        key={`nav-${index}`}
        onClick={() => {
          dispatch(togglePanelVisibility());
          playSound();
        }}
        icon={item.icon}
      />
    );
  });
  return <>{result}</>;
}

function PanelNavigation(): ReactElement {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: any) => state.theme);
  const themeBtnClasses = classNames(
    { "active": !theme }
  );

  return (
    <Column size="50" addClass="main-panel">
      <div className="container">
        <Row vertical={true}>
          <Column size="100%">
            <Navigation />
            <Btn
              onClick={() => {
                dispatch(toggleTheme());
                playSound();
              }}
              icon="brightness-4"
              color="charcoal"
              addClass={themeBtnClasses}
            />
          </Column>
        </Row>
      </div>
    </Column>
  );
}

export default PanelNavigation;