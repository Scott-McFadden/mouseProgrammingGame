import React, {Component} from 'react';


class ArrowBlock extends Component {
    render() {
        let blockToRender;
        let blockHeight;
        let blockWidth
        if (this.props.direction  && !(this.props.direction === 'none')){
            blockWidth=this.props.blockWidth;
            blockHeight=this.props.blockHeight;
            blockToRender = "images/" + this.props.direction + ".png";
        }


        else
        {
            blockHeight=1;
            blockWidth=1;
            blockToRender = "images/none.png";
        }


        let topValue = this.props.topMargin + (this.props.row * this.props.blockHeight) + 5;
        let leftValue = this.props.leftMargin + (this.props.column * this.props.blockWidth) + 5;
        let imageStyle = {
            position: "absolute",
            top: topValue + "px",
            left: leftValue + "px",
            zIndex: 1
        }
        return (<img id={this.props.id} src={blockToRender}
                     height={blockHeight}
                     width={blockWidth}
                     border='0'
                     style={imageStyle}
                     alt="block"
        />);

    }

}
    export    default    ArrowBlock;