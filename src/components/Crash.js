import React, {Component} from 'react';
import {Layer, Box, Text} from "grommet";

class Crash extends Component {

    ShowMe() {

        let msg

        if (this.props.crashType)
            msg = this.crashType;
        else
            msg = this.props.crashMessage;

            if (this.props.show)

                return (
                    <Layer modal={true}
                           position="center"
                           closer={true}
                           flush={true}
                           onclose={this.props.handleClose}
                    >
                        <Box pad='large' gap='medium'>
                            <Text size="large">Crash!</Text>
                            <Text size="small">{msg}</Text>
                        </Box>
                    </Layer>
                );
            else
                return null;


    }
        render()
        {


            return this.ShowMe();

        }
    }

    export
    default
    Crash;