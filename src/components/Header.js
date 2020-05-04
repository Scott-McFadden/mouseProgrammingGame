import React, {Component} from 'react';

class Header extends Component {
    render() {
        let score  = (this.props.moves > 0  ? this.props.points/this.props.moves : 0).toFixed(2);
        let crashmsg;
        if (this.props.showCrash)
        {
            crashmsg = <p>{this.props.crash.msg}</p>;
        }
        return (
            <table width="100%">
                <tr>
                    <td width="40%" align="left">
                        <h1>{this.props.title}</h1>
                    </td>
                    <td align="right" width="*">Score: {score} Points: {this.props.points} Moves: {this.props.moves} <br/> {crashmsg}</td>

                </tr>
            </table>
        );
    };
}
export default Header;