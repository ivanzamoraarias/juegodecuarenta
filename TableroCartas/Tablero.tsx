import {GLView} from "expo-gl";
// @ts-ignore
import Expo2DContext from 'expo-2d-context';
import React, {Component} from 'react';
import {StackNavigationProp} from "@react-navigation/stack";
import {View} from "react-native";
import {Asset} from "expo-asset";
type GameProps = {
    navigation: StackNavigationProp<{ Home: undefined },
        'Home'>
}
class Tablero extends React.Component <GameProps, any> {
    _onGLContextCreate = async(gl: any) => {
        const ctx:any = new Expo2DContext(gl);
        this.drawRobot(ctx);
        //this.drawCard(ctx,{x:100,y:1000});
        //this.drawCard(ctx,{x:450,y:1000});
        //this.drawCard(ctx,{x:800,y:1000});

        //ctx.stroke();
        //ctx.flush();
    }

    private drawCard(ctx: any, vec:{x:number,y:number}) {
        ctx.save();
        ctx.fillStyle = "red";
        ctx.translate(vec.x, vec.y);
        ctx.fillRect(0, 0, 200, 300);
        ctx.restore();

    }

    private drawRobot(ctx:any) {
        ctx.translate(50, 200)
        ctx.scale(4, 4)
        ctx.fillStyle = "grey";
        ctx.fillRect(20, 40, 100, 100);
        ctx.fillStyle = "white";
        ctx.fillRect(30, 100, 20, 30);
        ctx.fillRect(60, 100, 20, 30);
        ctx.fillRect(90, 100, 20, 30);
        ctx.beginPath();
        ctx.arc(50, 70, 18, 0, 2 * Math.PI);
        ctx.arc(90, 70, 18, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(50, 70, 8, 0, 2 * Math.PI);
        ctx.arc(90, 70, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(70, 40);
        ctx.lineTo(70, 30);
        ctx.arc(70, 20, 10, 0.5 * Math.PI, 2.5 * Math.PI);
        ctx.stroke();
        ctx.flush();
    }

    render() {
        console.log("HOLAAAAA======");
        return (

            <GLView
                style={{ flex: 1 }}
                onContextCreate={this._onGLContextCreate}
            />
        );
    }

}
export default Tablero;