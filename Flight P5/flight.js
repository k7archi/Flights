function flight(x_,y_,Ident){
this.x = x_;
this.y = y_;
this.dir = new p5.Vector(x_,y_);
this.id = Ident;

this.update = function(){
}

this.show = function(){
  push();
  translate(this.x,this.y);
  noStroke();
  fill(255,0,0);
  ellipse(0, 0, 8,8);
  noStroke();
  fill(0,150);
  textSize(10);
  text(this.id,4,4);
  pop();
}


}
