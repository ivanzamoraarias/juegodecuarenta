import React, { PureComponent } from "react";
import { GLView } from 'expo-gl';
import REGL from "regl";
import { View, Text } from "react-native";



class GameView extends PureComponent<any, any> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {};
  }

  public onContextCreate(gl: any) {
    console.log("perro", this.props);
    const regl = REGL(gl);
    console.log("Hasta aqui esta bien 1");
    const rngl = gl.getExtension("RN");
    console.log("Hasta aqui esta bien 2");
    //const clear = this.props.clearCommand(regl, rngl);
    console.log("Hasta aqui esta bien 3");
    const draw = this.props.drawCommand(regl, rngl);
    console.log("Hasta aqui esta bien");
    this.setState({
      frame: (props: any) => {
        //clear(props);
        draw(props);
        gl.endFrameEXP();
      }
    });
  };

  public render() {

    if (this.state.frame) this.state.frame(this.props);

    return (
      <View>
        <Text>{"Listo para jugar Cuarenta ? "}</Text>

        <GLView
          style={this.props.style}
          onContextCreate={this.onContextCreate}
        />
      </View>
    );
  }
}

export default GameView;