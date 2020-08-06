import React, {Component, FunctionComponent, PureComponent, useState} from "react";
import {StyleSheet, View, Button, Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {GLView} from "expo-gl";
import {Asset} from "expo-asset";
//import {Asset, GLView} from "expo";
//import GameView from "./GameView";


type GameProps = {
    navigation: StackNavigationProp<{ Home: undefined },
        'Home'>
}

class GameScene extends Component <GameProps, any> {
    private _rafID: any;

    constructor() {
        // @ts-ignore
        super();

    }

    componentWillUnmount() {
        cancelAnimationFrame(this._rafID);
    }
    onGLContextCreate = async (gl: any): Promise<void> => {
        console.log("AQUIIIII");
        const vert = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(
            vert,
            `
precision highp float;
attribute vec2 position;
varying vec2 uv;
void main () {
  uv = position;
  gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
}`
        );
        gl.compileShader(vert);

        const frag = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(
            frag,
            `
precision highp float;
uniform sampler2D texture;
varying vec2 uv;
void main () {
  gl_FragColor = texture2D(texture, vec2(uv.x, uv.y));
}`
        );
        gl.compileShader(frag);

        const program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const verts = new Float32Array([-2, 0, 0, -2, 2, 2]);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        const positionAttrib = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttrib);
        gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);


        const asset = Asset.fromModule(require('../assets/2_of_clubs.png'));
        await asset.downloadAsync();
        const texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset);
        gl.uniform1i(gl.getUniformLocation(program, 'texture'), 0);

        const onTick = (gl: any) => {
            gl.clearColor(0, 0, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);
            gl.endFrameEXP();
        };

        const animate = () => {

            if (gl) {
                this._rafID = requestAnimationFrame(animate);
                onTick(gl);
            }
        };
        animate();
    }

    public render() {
        console.log("HOLAAAA_______")
        return (
            <GLView style={{flex: 1}} onContextCreate={this.onGLContextCreate}/>
            // <View>
            //
            // </View>
        );
    }
}


export default GameScene;