class Bird {
  constructor(x, y, w, h, birdImage) {
    this.w = w;
    this.h = h;
    this.birdImage = birdImage;

    // Define Fixtures
    var fd  = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));
    // Some physics
    fd.density = 3;
    fd.friction = 0.5;
    fd.restitution  = 0.5;

    // Define Body
    var bd = new  box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Create the body
    this.body  = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    // Some additional Stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  };

  contains(x, y) {
    var worldPoint = scaleToWorld(x, y);
    var f = this.body.GetFixtureList();
    var inside = f.TestPoint(worldPoint);
    return inside;
  };

  killBody() {
  world.DestroyBody(this.body);
}

// Is the particle ready for deletion?
done() {
  // Let's find the screen position of the particle
  let pos = scaleToPixels(this.body.GetPosition());
  // Is it off the bottom of the screen?
  if (pos.y > height + this.w * this.h) {
    this.killBody();
    return true;
  }
  return false;
}

  show() {
    var pos = scaleToPixels(this.body.GetPosition());
    var angle = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.birdImage, 0, 0, this.w, this.h);
    pop();
  };
};
