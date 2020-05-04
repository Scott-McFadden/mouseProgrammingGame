import React, {Component} from 'react';
import BoardRow from "../components/BoardRow";
import axios from "axios";
import Header from "../components/Header.js";
import Winner from "../components/Winner.js";
import {Box, Text, Button} from "grommet";
import {PowerReset, Map} from 'grommet-icons';
import "./ProgrammingGame1.css"
import MoveEntry from "../components/MoveEntry";
import MapSelection from "../components/MapSelection";


class ProgrammingGame1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            availableBoards: [],
            selectedBoard: {},
            blockHeight: 100,
            blockWidth: 100,
            topMargin: 150,
            leftMargin: 20,
            //     blocki: 1,
            //     blockd: 'uparrow',

            mouseLocation: {Row: 0, Col: 0, direction: "down"},
            boardName: "loading",
            points: 0,
            score: 0,
            moves: 0,
            boardSize: {},
            boardMap: [],
            // plannedMoves: ["f", "f", "l", "f", "f",
            //                "f", "l", "f", "r", "f",
            //                "f", "f", "r", "f", "f",
            //                "r", "f", "l", 'f', 'r',
            //                "f", "f", "f", 'l', 'f',
            //                "f", "r", "f", "f", 'r',
            //                "f", 'f', "l", 'l', "f",
            //                'f', 'l', 'f', 'f', 'f',
            //     'f', 'f','f', 'f'],
            plannedMoves: ["f"],
            showCrash: false,

            showWin: false,
            crash: {
                crashType: "",
                msg: ""
            },
            invalidBoard: false,
            showMapSelectionButton: false,
            showReset: false
        };
        this.closeWinner = this.closeWinner.bind(this);
        this.startButton2 = this.startButton2.bind(this);
    };

    // enumerations
    blockTypes = {
        blank: 1,
        horizontal: 2,
        cross: 3,
        vertical: 4,
        downT: 5,
        leftT: 6,
        upT: 7,
        rightT: 8,
        downRightCorner: 9,
        downLeftCorner: 10,
        upRightCorner: 11,
        upLeftCorner: 12,
        start: 13,
        End: 14
    };
    blockFill = {
        cheese: "cheese",
        leftArrow: "leftarrow",
        downArrow: "downarrow",
        rightArrow: "rightarrow",
        upArrow: "uparrow",
        crash: "crash",
        upMouse: "mup",
        downMouse: "mdown",
        rightMouse: "mright",
        leftMouse: "mleft",
        none: "none"
    };
    availableBoards = [];
    selectedBoard = "";

    showMapSelection = false;

    boardMap = [{
        "row": 0,
        "columns": [
            {
                "blockNumber": 13,
                "column": 0,
                "arrow": "mdown"
            }]
    }];          // working copy of board
    boardSize = {};         // boundries of board
    score                   // player score
    moves = 0;              // number of moves made
    col = {};                // current column

    crash = {
        crashType: "",
        msg: ""
    };
    origMouseLocation = {
        "row": 0,
        "col": 0,
        "direction": "mdown"
    };
    mouseLocation = {
        "row": 0,
        "col": 0,
        "direction": "mdown"
    };
    oldMouseLocation = this.mouseLocation;
    winPositions = [];

    // loading       0          1             2         3       4        5   6
    boardStates = ["loading", "select", "invalid", "board", "moving", "win", "crash"];
    boardState=0;

    // constructor
    async componentDidMount() {
        let response = await axios.get("/data/BoardList.json");
        console.log(response.data);
        this.availableBoards = response.data.boards;
        if (this.availableBoards)
           this.selectedBoard = this.availableBoards[0];
        if(this.boardState === 0 ) this.boardState = 1;

        this.setState({
            availableBoards: this.availableBoards,
            selectedBoard: this.selectedBoard,
            boardState: this.boardState,
            showMapSelection: this.showMapSelection
        });

    }

    async getSelectedBoard(name) {
        if (name === "" || name === undefined)
            return;
        let response = await axios.get("/data/" + name);
        //console.log("getSelectedBoard", response.data);
        this.loadBoard(response.data);
    }

    loadBoard(data) {
        this.boardMap = data.board;
        this.cheeseLocations = data.cheeseLocations;
        this.mouseLocation = data.mouse;
        this.origMouseLocation.row  = this.mouseLocation.row;
        this.origMouseLocation.col  = this.mouseLocation.col;
        this.origMouseLocation.direction  = this.mouseLocation.direction;
        this.boardState = this.boardStates.indexOf("board");

        this.SetUpBoard();

        this.setState({
            name: data.name,
            blockHeight: data.blockSize,
            biockWidth: data.blockSize,
            boardSize: {
                row: this.boardMap.length,
                col: this.boardMap[0].columns.length
            },
            boardMap: this.boardMap,
            points: this.points,
            moves: this.moves,
            crash: this.crash,
            boardState: this.boardState
        });
    }

    // set up the board
    SetUpBoard() {
        this.points = 0;
        this.score = 0;
        this.moves = 0;
        this.boardSize = {
            row: this.boardMap.length,
            col: this.boardMap[0].columns.length
        };
        for (let a = 0; a < this.cheeseLocations.length; a++) {
            this.PlaceCheese(this.cheeseLocations[a]);
        }
        this.winPositions = this.SetWinPosition();

        //console.log("setup board - mouse location " + this.mouseLocation.row + " " + this.mouseLocation.col);
        if (this.ValidatePlacement(this.mouseLocation))
            this.PlaceMouse(this.mouseLocation);  // the mouse will overwrite the cheese.
        else
            this.boardState=this.boardStates.indexOf("invalid");
    }

    // updates the board state
    SetNewBoardState() {
        this.setState({
            boardMap: this.boardMap,
            points: this.points,
            moves: this.moves,
            crash: this.crash,
            boardState: this.boardState,
        });
       //this.render();
    }


    SetWinPosition() {
        let win = [];

        for (let a = 0; a < this.boardMap.length; a++)
            for (let b = 0; b < this.boardMap[a].columns.length; b++) {
                if (this.boardMap[a].columns[b].blockNumber === 14) {
                    win.push({row: a, col: b});
                }
            }
        if (!win) {
            this.SetCrash(
                "setWinPosition",
                "Win Position not found on Board Map (need at least one BlockNumber 14)");
        }

        return win;
    }

    SetCrash(cType, cmsg) {
        console.log(cmsg);
        this.crash = {
            crashType: cType,
            msg: cmsg
        };
        this.boardState = this.boardStates.indexOf("crash");
        let loc = this.mouseLocation;

        if (cType !== "setWinPosition")
        {
            if (this.mouseLocation.row > this.boardSize.row - 1 ||
                this.mouseLocation.col > this.boardSize.col - 1 ||
                this.mouseLocation.row < 0 ||
                this.mouseLocation.col < 0)
                loc = this.oldMouseLocation;

            this.boardMap[loc.row].columns[loc.col].arrow = "crash";
        }
        //this.SetNewBoardState();
    }

    // test to ensure that the placesment is valid and does not overwrite a wall.
    // also used to ensure mouse movement does not collide with a wall
    ValidatePlacement(position) {
        if (position.row > this.boardSize.row - 1 ||
            position.col > this.boardSize.col - 1 ||
            position.col < 0 ||
            position.row < 0
        ) {
            this.SetCrash(
                "ran off the board ",
                "Fell off the board at (" + position.row + ", " + position.col + ")");
            return false;
        }

        let walltype = this.boardMap[position.row].columns[position.col].blockNumber;
        if (!(walltype === 13 || walltype === 1 || walltype === 14)) {
            this.SetCrash(
                "ran into a wall",
                "Ran into a Wall at (" + position.row + ", " + position.col + ")");
            return false
        }

        return true;
    }

    // place a cheese item on the board at the location specified.
    PlaceCheese(position) {
        if (this.ValidatePlacement(position))
            this.boardMap[position.row].columns[position.col].arrow = this.blockFill.cheese;
        else {
            this.SetCrash(
                "BadCheese",
                "cheese placement at (" + position.row + ", " + position.col + ") is invalid ");
        }
    }

    // move the mouse
    PlaceMouse(loc, oldloc) {
        //console.log("place mouse",loc );
        this.boardMap[loc.row].columns[loc.col].arrow = loc.direction;
        if (oldloc)
            this.boardMap[oldloc.row].columns[oldloc.col].arrow = oldloc.direction;
    }

    render() {
        let board = [];
        for (let crow = 0; crow < this.state.boardMap.length; crow++) {
            board.push(
                <BoardRow row={crow} columns={this.state.boardMap[crow].columns} size={this.state.blockHeight}/>
            )
        }

        return (<div>

                {(this.boardState === this.boardStates.indexOf("loading"))  && <p>Loading....</p>}
                {(this.boardState === this.boardStates.indexOf("select")) &&
                <MapSelection
                    maps={this.state.availableBoards}
                    selectedMap={this.state.availableBoards[0]}
                    handleClick={(fname) => this.getSelectedBoard(fname)}
                />}
                {(this.boardState === this.boardStates.indexOf("board") ||
                    this.boardState === this.boardStates.indexOf("moving") ||
                    this.boardState === this.boardStates.indexOf("win") ||
                    this.boardState === this.boardStates.indexOf("invalid") ||
                    this.boardState === this.boardStates.indexOf("crash")
                )  &&
                    <table style={{visibility: "colaspsed"}}>

                        <tr>
                            <td colSpan="2" width="100%" className="td">
                                <Header
                                    title={this.state.name}
                                    points={this.state.points}
                                    moves={this.state.moves}
                                    invalidBoard={this.boardState === this.boardStates.indexOf("invalid")}
                                    crash={this.state.crash}
                                    showCrash={this.boardState === this.boardStates.indexOf("crash")}
                                />


                            </td>
                        </tr>
                        <tr>
                            <td className="td" valign="top">{board}
                                <br/>
                                <Button icon={<PowerReset/>} onClick={(e) => this.resetBoard(e)} label="Reset"/>
                                <Button icon={<Map/>} onClick={()=> this.selectNewMap()} label="Load New Map"/> </td>
                            <td className="td" valign="top">
                                <Box
                                    direction="column"
                                    border={{color: "darkblue"}}
                                    pad="medium"
                                    round="xsmall"
                                    width="300px"
                                >
                                    <Text>Moves</Text>
                                <MoveEntry
                                    moves={this.state.plannedMoves}
                                    startMoves={this.startButton2}/>
                                </Box>


                            </td>
                        </tr>

                    </table>
                }
                {this.boardState === this.boardStates.indexOf("win") &&
                    <Winner show={true}
                         handleClose={this.closeWinner}
                         moves={this.state.moves}
                    />
                }
                {this.boardState > this.boardStates.indexOf("crash")  && <p>not valid board state</p>}

            </div>
        );
    }

    closeWinner() {
        this.boardState=this.boardStates.indexOf("select")
        this.setState({boardState: this.boardState});
        this.resetBoard();
    }

    selectNewMap() {
        this.boardState=this.boardStates.indexOf("select")
        this.setState({boardState: this.boardState});
    }

    resetBoard() {
        for (let a = 0; a < this.boardMap.length; a++)
            for (let b = 0; b < this.boardMap[a].columns.length; b++) {
                this.boardMap[a].columns[b].arrow = "";
            }

        for (let a = 0; a < this.cheeseLocations.length; a++) {
            this.PlaceCheese(this.cheeseLocations[a]);
        }

        this.PlaceMouse(this.origMouseLocation);
        this.mouseLocation.row = this.origMouseLocation.row;
        this.mouseLocation.col=this.origMouseLocation.col;
        this.mouseLocation.direction = this.origMouseLocation.direction;

        this.moves = 0;
        this.score = 0;
        this.points = 0;
        this.boardState = this.boardStates.indexOf("board");
        this.crash = {};

        this.SetNewBoardState();
    }

    // maps the mouse direction operations
    MouseDirectionMap = {
        mup: {
            dir: "mup",
            newDir: {l: "mleft", r: "mright", f: "mup"},
            oldDir: "uparrow",
            move(loc) {
                loc.row--;
            },
        },
        mdown: {
            dir: "mdown",
            newDir: {l: "mright", r: "mleft", f: "mdown"},
            oldDir: "downarrow",
            move(loc) {
                loc.row++;
            },
        },
        mleft: {
            dir: "mleft",
            newDir: {l: "mdown", r: "mup", f: "mleft"},
            oldDir: "leftarrow",
            move(loc) {
                loc.col--;
            },
        },

        mright: {
            dir: "mright",
            newDir: {l: "mup", r: "mdown", f: "mright"},
            oldDir: "rightarrow",
            move(loc) {
                loc.col++;
            },
        }
    };

    MoveMouse(direction) {

        if (direction === 'f') {
            // make old location the current location
            this.oldMouseLocation =
                {
                    direction: this.MouseDirectionMap[this.mouseLocation.direction].oldDir,
                    row: this.mouseLocation.row,
                    col: this.mouseLocation.col
                };
            this.MouseDirectionMap[this.mouseLocation.direction].move(this.mouseLocation);

        }
        // set new position icon
        this.mouseLocation.direction = this.MouseDirectionMap[this.mouseLocation.direction].newDir[direction];

        console.log(this.oldMouseLocation, this.mouseLocation, direction, this.boardState);

    }

    async startButton2(moves) {
        console.log("start button 2 clicked");
        await this.startButton(moves);
    }

    async startButton(moves) {
        console.log("startButton");
        this.boardState = this.boardStates.indexOf("moving");
        let nonForwardMoves = 0;
        let movePlan = moves;

        for (let a = 0; a < movePlan.length && this.boardState === 4 ; a++)
        {
            this.moves++;
            this.MoveMouse(movePlan[a].toLowerCase());

            if (this.ValidatePlacement(this.mouseLocation)) {
                if (movePlan[a].toLowerCase() === 'f') {
                    this.points += 10;
                    nonForwardMoves = 0;
                }
                else {
                    this.points++;
                    nonForwardMoves++;
                    if (nonForwardMoves > 4) {
                        this.SetCrash("Spin", "You spun out!  Try reducing the number of consecutive turns.")
                        break;
                    }
                }
                this.CheckCheese(this.mouseLocation);
                if (this.boardState !== this.boardStates.indexOf("crash") )
                    this.PlaceMouse(this.mouseLocation, this.oldMouseLocation);
                this.CheckForWin(this.mouseLocation);
            }

            this.SetNewBoardState();


              await this.sleep(250);

        }
        if (this.boardState === this.boardStates.indexOf("moving")  )
        {
            this.boardState = this.boardStates.indexOf("board");
            this.setState({boardState: this.boardState});
        }
    }

    CheckCheese(loc) {
        if (this.boardMap[loc.row].columns[loc.col].arrow === "cheese") {
            this.points += 100;
        }
    }

    CheckForWin(loc) {
        this.winPositions.forEach((a) => {
            if (loc.row === a.row && loc.col === a.col) {
                this.boardState = this.boardStates.indexOf("win");
            }
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default ProgrammingGame1;