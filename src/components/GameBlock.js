import React, {Component} from 'react';
import {Box} from 'grommet';

class GameBlock extends Component {
    // render ()
    // {
    //    let blockToRender = "images/wall" + (this.props.blockNumber ?  this.props.blockNumber : 1) + ".png";
    //    let topValue = this.props.topMargin + (this.props.row * this.props.blockHeight  )+ 5;
    //    let leftValue = this.props.leftMargin + (this.props.column * this.props.blockWidth )+5;
    //     let imageStyle = {
    //         position: "absolute",
    //         top: topValue + "px",
    //         left:leftValue + "px",
    //         zIndex: 0
    //     }
    //    return ( <img id={this.props.id} src={blockToRender}
    //          height={this.props.blockHeight}
    //          width={this.props.blockWidth}
    //          border='0'
    //          style={imageStyle}
    //          alt="block"
    //    />);
    //
    // }

    render() {
        const url = "url(./images/wall" + (this.props.blockNumber ? this.props.blockNumber : "1") + ".png)";
        const pad =  this.props.blockHeight.toString() + "px";

        let blockToRender;
        let blockHeight;
        let blockWidth
        if (this.props.direction && !(this.props.direction === 'none')) {
            blockWidth = this.props.blockWidth;
            blockHeight = this.props.blockHeight;
            blockToRender = "images/" + this.props.direction + ".png";
        } else {
            blockHeight = 1;
            blockWidth = 1;
            blockToRender = "./images/none.png";
        }

        return (
            <Box  height={pad} width={pad}
                 background={url}
            >
                <img src={blockToRender} height={blockHeight}
                     width={blockWidth} border='0' alt="arrow"/>
            </Box>
        );
    }

}

export default GameBlock;