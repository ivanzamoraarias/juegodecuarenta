import React from "react";
import {Image, View, StyleSheet} from "react-native";

const ImageChat = () => {
    return(
        <View style={styles.container}>
            <Image
            style={styles.logo}
                source={{
                    uri:'https://1.bp.blogspot.com/-slPQMdRIiE0/XchjiHQcOgI/AAAAAAAALm8/OK-GsqynYm4qhL7DuCvnyzN24etS76jOACKgBGAsYHg/s1600/IMG_20191028_130922.jpg'
                }}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: '66%',
        height: '58%',
    },
});

export default ImageChat;