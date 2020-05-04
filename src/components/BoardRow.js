import React, {Component} from 'react';
import "./BoardRow.css";
import GameBlock from "./GameBlock";
import {Box} from 'grommet';

class BoardRow extends Component
{
    getBlocks()
    {
        let ret = [];
        for(let ccol=0; ccol < this.props.columns.length; ccol++)
        {
           // console.log(ccol);

            ret.push( <GameBlock key={"GB" + this.props.row + "_" + ccol}
                              blockNumber={this.props.columns[ccol].blockNumber}
                              blockHeight={this.props.size}
                              blockWidth={this.props.size}
                              direction={this.props.columns[ccol].arrow} />);
        }
        return ret;
    }

    render(){
        return (
            <Box  direction="row" >
                {this.getBlocks()}
            </Box>
        );
    }
}

export default BoardRow;