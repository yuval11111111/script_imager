# Script imager by Yuval
## installation
install node.js v21.7.2 from https://nodejs.org/en

than clone the project to your pc 
```
git clone https://github.com/yuval11111111/script_imager
```
and than install the correct libraries
```
npm i fs canvas
```
## How to use
+ put your script in the code.txt file

    for all white text put **#--** at the start of each line
+ choose what words you want to color with what color **works only with hex codes**
+ after choosing the colors go to the code.txt file and put before each color change #your hex color code here than "--"

example:
```
#368cd6--const #32c1ff--value #--= #699850--"value"
```
[result](https://imgur.com/OBEKM6S)
+ after coloring your code (you have to do all white or colored text, the system can't understand uncolored) you can activate the index file and the system will generate an image of your code
## activation
+ open a powershell window and navigate to the project's folder and type
```
node index
```
and press enter