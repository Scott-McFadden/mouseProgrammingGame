# mouseProgrammingGame
Stem oriented Mouse Programming Game - Javascript/react/grommet


When my schools STEM teacher sent an assignment for the mouse programming game I got to thinking and created a web based version of it.

I designed it so that more than one board could be used - so if the teacher wanted,  it could be drawn out over several weeks, making the board more complicated each week.    Boards are not too hard to design - they are described in JSON and are not too difficult to code up.   Actually, you could pretty much copy and paste a modified board design quite easily.

I also included three metrics.

The first one is the number of move.  This is self explanatory.   

The second it points.  Points are given as follows: 

10 move forward
1 for each turn.
100 for each cheese collected.

Score, the last metric, is the points divided by moves.   This judges the overall efficiency of the move plan. 

There are a couple of finish conditions.   First, their is the win condition, where the mouse moves to the end square.    Second, is the less desirable Crash.  This happens if the mouse moves off the board, into a wall, and if more than 4 turns in a row are executed.

Move plans are created in the right box.   They are created using the left, down, and right arrows.   The highlighted move (in yellow) can be removed when the trash button is clicked.   Also, clicking on the move in the list will highlight that particular move.   Moves can also be dragged and dropped in the list.   

 I am thinking that this is something that could be used in several different grades.   In the lower schools, it could be used to teach basic logic.   In the high school it could be used to teach computer coding by extending the functions - for example, new commands could be added to detect a wall in front of the mouse and read in move files.  Middle school kids could use the mods made by the high school kids to make the mouse move with logic.   Anyway, the possibilities are endless.
 
 
