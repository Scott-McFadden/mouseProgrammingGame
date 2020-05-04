import React, {Component} from 'react';
import {Box, Layer, Text} from "grommet";

/// this displays the winner message

class Winner extends Component {

    ShowMe() {

        if (this.props.show)

            return (
                <Layer modal={true}
                       position="center"
                       closer={true}
                       flush={true}
                       onClickOutside={this.props.handleClose}
                       onclose={this.props.handleClose}
                >
                    <Box pad='large' gap='medium'>
                        <Text size="large">You Win!</Text>
                        <Text size="small">You beat the board with {this.props.moves} moves!</Text>
                    </Box>
                </Layer>
            );
        else
            return null;
    }

    render() {
        return this.ShowMe();
    }

}
    export    default    Winner;