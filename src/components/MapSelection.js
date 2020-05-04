import React, {Component} from 'react';
import {Box, Text, Button} from 'grommet';
import {Map} from "grommet-icons"

class MapSelection extends Component {

    state = {
        value: "",
        selected: this.props.selectedMap
    };


    render() {

        return <div>
            <h2  align="center">Mouse Programming Game</h2>
            <Box align="center" round="xsmall">
                <Text  margin="6px">Pick A Game Board</Text>
                <select id="boardSelect" size="5" onChange={e => this.setValue(e)}>
                    {this.getOptions()}
                </select>
                <br/>
                <Button
                    icon={<Map/>}
                    label="Load Map"
                    onClick={() => this.props.handleClick(this.state.value)}/>
        </Box>
        </div>
    };
    setValue(e)
    {
        this.setState({value: e.currentTarget.value});
    }
    getOptions() {
        let ret = [];
        if (this.props.maps)
        for (let a = 0; a < this.props.maps.length; a++)
            ret.push(<option key={"a"+a} value={this.props.maps[a].fname}>
                {this.props.maps[a].name}</option>);

        return ret;
    }
}


export default MapSelection;