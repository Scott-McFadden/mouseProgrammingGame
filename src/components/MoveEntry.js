import React, {Component} from 'react';

import "./MoveEntry.css";
import {Play, Previous, Down, Next, Trash} from "grommet-icons";
import {Button, Box} from "grommet";


class MoveEntry extends Component {

    vmoves = [];

    state = {
        moves: [],
        dMoves: [],
        insertPosition: 0
    };

    fixArray(myMoves) {
        this.vmoves = [];
        myMoves.forEach((v, idx) => {
            this.vmoves.push(this.makeEntry(idx, v));
        });
        this.setState({dMoves: this.vmoves, insertPosition: this.vmoves.length -1});
        this.insertPosition = this.vmoves.length -1;
    }

    makeEntry(i, v) {
        let vname = "forward";
        if (v === "l")
            vname = "left";
        if (v === 'r')
            vname = "right";
        return {idx: i, ele: v, name: vname};
    }

    onDragStart = (e, index) => {
        this.draggedItem = this.vmoves[index];
        this.itemIndex = index;

    };
    onDragOver = (e, idx) => {
        if (idx !== undefined)
            this.currentIndex = idx;
        //    e.preventDefault();
        //console.log("over", idx);
    };

    onDragEnd = ( ) => {
        if (this.currentIndex < this.itemIndex)
            this.currentIndex--;
        this.vmoves.splice(this.itemIndex, 1);
        this.vmoves.splice(this.currentIndex, 0, this.draggedItem);
        this.setState({dMoves: this.vmoves});
        this.forceUpdate();
    };

    startButton() {
        console.log("start button clicked");
        let newMoves = [];
        this.state.dMoves.forEach((item) => {
            newMoves.push(item.ele);
        });
        this.props.startMoves(newMoves);
    }

    componentDidMount() {
        this.fixArray(this.props.moves);
    }

    mouseSelect(e) {

        this.coloredElement = e.currentTarget;
        if (this.coloredElement) {
                this.insertPosition = this.coloredElement.parentElement.id.substr(1);
                this.setState({ insertPosition: this.insertPosition});
        }
    }

    addForward()
    {
        this.placeMove({idx: this.insertPosition, ele: "f", name: "Forward"});
    }

    addRight()
    {
        this.placeMove( {idx: this.insertPosition, ele: "r", name: "Right"});
    }

    addLeft()
    {
        this.placeMove({idx: this.insertPosition, ele: "l", name: "Left"});
    }

    placeMove(moveElement)
    {
        if(this.insertPosition === this.vmoves.length-1){
            this.vmoves.push(moveElement);
            this.insertPosition++;
        }

        else {
            this.insertPosition++;
            this.vmoves.splice(this.insertPosition,0, moveElement);
        }
        //console.log(this.insertPosition, this.vmoves.length-1);
        this.setState({dMoves: this.vmoves, insertPosition: this.insertPosition});
    }

    doTrash()
    {
        this.vmoves.splice(this.insertPosition,1);
        this.insertPosition = this.insertPosition>0 ? this.insertPosition -1 :0;
        this.setState({dMoves: this.vmoves, insertPosition: this.insertPosition});

    }

    getStyle(idx)
    {
        let ret = "white";
        // noinspection EqualityComparisonWithCoercionJS
        // eslint-disable-next-line eqeqeq
        if (idx == this.state.insertPosition)
            ret = "yellow";
        // noinspection EqualityComparisonWithCoercionJS
        // eslint-disable-next-line eqeqeq
        if (idx == this.state.insertPosition - 1)
            ret = "lightblue";

        return ret;
    }
    render() {
        return (
            <div className={MoveEntry}>
                <Box flex={true} align='center' height="600px" overflow='auto'>
                    <ul>
                        {this.state.dMoves.map((move, idx) => (
                            <li id={"m" + idx} key={idx} onDragOver={() => this.onDragOver(idx)}>
                                <div className="drag" id={"ms" + idx}
                                     draggable="true"
                                     onDragStart={e => this.onDragStart(e, idx)}
                                     onDragEnd={e => this.onDragEnd(e)}
                                     onDragOver={(e) => this.onDragOver(e, idx)}
                                     onClick={(e) => this.mouseSelect(e)}
                                     style={{backgroundColor:this.getStyle(idx)}}
                                >
                                     {idx+1}. {move.name}
                                </div>
                            </li>))}
                    </ul>
                </Box>
                <Box
                    border={{color: "darkblue"}}
                     direction="row"
                     pad="xsmall" align="stretch"
                     round="xsmall">
                    <Button icon={<Previous/>}
                            onClick={() => this.addLeft()}/>
                    <Button icon={<Down/>}
                            onClick={() => this.addForward()}/>
                    <Button icon={<Next/>}
                            onClick={() => this.addRight()}/>
                    <Button icon={<Trash/>}
                            onClick={() => this.doTrash()}/>
                </Box>
                <Button icon={<Play/>} margin="small"
                        label="start"
                        onClick={() => this.startButton()}/>
            </div>
        );
    }
}

export default MoveEntry