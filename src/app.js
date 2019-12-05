/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var PacmanLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var scoreLabel = new cc.LabelTTF("Score: ", "Solway", 38);
        //position the label on the center of the screen
        scoreLabel.x = 300;
        scoreLabel.y = 500;
        //add the label as a child to this layer
        this.addChild(scoreLabel, 1);

        

        //add "Cherry" splash screen"
        // this.sprite1 = new cc.Sprite(res.Cherry_png, cc.Rect( 0, 0, 30, 30 ));
        // this.sprite1.attr({ 
        //     x: size.width / 3,
        //     y: size.height / 3
        // });
        // this.addChild(this.sprite1, 0);

        //NEW!!!
        // this.draw=new cc.DrawNode();
        // this.addChild(this.draw);

        //draw.drawRect(origin, destination, fillColor, lineWidth, lineColor)
        // this.draw.drawRect(cc.p(150, 120), cc.p(480, 480), null, 2, cc.color(255, 0, 255, 255)); // not fill

      //!!!!!!!!!!!!!MAP!!!!!!!!!!!!!!!!

      pacmanSet = {
        x: 4,
        y: 6
      };

        var level = [
            [1,1,1,1,1,1,1,1],
            [1,0,3,0,0,0,0,1],
            [1,0,1,1,1,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1],
            [1,0,0,0,2,0,0,1],
            [1,1,1,1,1,1,1,1]
            ];

         
          for(var y = 0; y < level.length ; y = y + 1) {
            for(var x = 0; x < level[y].length ; x = x + 1) {

              if (level[y][x] == 1) {

                var wall = new cc.Sprite(res.Wall_jpg); 
                wall.attr({ 
                    x: [x] * 50 + 250,
                    y: -[y] * 50 + 450
                });
                this.addChild(wall, 2);

              } else if (level[y][x] == 2) {
                //add "Pacman" splash screen"
                var pacman = new cc.Sprite(res.Pacman_png);
                pacman.attr({ 
                    x: [x] * 50 + 250,
                    y: -[y] * 50 + 450
                });
                this.addChild(pacman, 2);

              } else if (level[y][x] == 3) {
                //add "Cherry" splash screen"
                var cherry = new cc.Sprite(res.Cherry_png);
                cherry.attr({ 
                    x: [x] * 50 + 250,
                    y: -[y] * 50 + 450
                });
                this.addChild(cherry, 0);

              } else if (level[y][x] == 0) {
                //add "Food" splash screen"
                var food = new cc.DrawNode();
                this.addChild(food);
                food.drawDot(cc.p([x] * 50 + 250, -[y] * 50 + 450), 5, cc.color(0, 0, 255, 128));

              }

            }
          }

           //!!!!!!!!!!!!!ACTION!!!!!!!!!!!!!!!!
           var KeyCode={
            LEFT:37,
            UP:38,
            RIGHT:39,
            DOWN:40
            };
            var MoveOffSet = 50;

            var listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            swallowTouches: true,
            onKeyPressed: function (keyCode,event) {
            var target = event.getCurrentTarget();
            var position = target.getPosition();
            switch(keyCode)
            {
            case KeyCode.LEFT:
              if ( level[pacmanSet.y][pacmanSet.x - 1] !== 1) {
                pacmanSet.x = pacmanSet.x - 1;
                position.x -= MoveOffSet;
          }
            break;
        
            case KeyCode.RIGHT:
              if ( level[pacmanSet.y][pacmanSet.x + 1] !== 1) {
              pacmanSet.x = pacmanSet.x + 1;
              position.x += MoveOffSet;
            }
            break;
        
            case KeyCode.UP:
              if ( level[pacmanSet.y - 1][pacmanSet.x] !== 1) {
                pacmanSet.y = pacmanSet.y - 1;
                position.y += MoveOffSet;
            }
            break;
        
            case KeyCode.DOWN:
              if ( level[pacmanSet.y + 1][pacmanSet.x] !== 1) {
                pacmanSet.y = pacmanSet.y + 1;
                position.y -= MoveOffSet;
            }
            break;
            }
            target.setPosition(position);
            },
            onKeyReleased: function (event) {
            cc.log('onKeyReleased');
            }
            });
            cc.eventManager.addListener(listener, pacman);

        return true;
    }
});

var PacmanScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PacmanLayer();
        this.addChild(layer);
    }
});
