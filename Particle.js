class Particle {
    constructor() {
        this.pos = createVector(random(0, width), random(0, height));
        this.vel = p5.Vector.random2D();
        this.accel = createVector();

        this.maxSpeed = 1.5;
        this.maxForce = 0.5;
    }

    seekPattern() {
        let size = width/2;
        let x = map(this.pos.x, 0, size, 0, 1) * scale;
        let y = map(this.pos.y, 0, size, 0, 1) * scale;
        let values = chladni(x,y);
        
        let target = this.pos.copy();

        if (abs(values) > threshold) {
            target.x += random(-3, 3);
            target.y += random(-3, 3);
        } 
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        return steering;
    }

    move() {
        //x and y border
        if (this.pos.x > width) this.pos.x = 0;
        else if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        else if (this.pos.y < 0) this.pos.y = height;

        this.accel.add(this.seekPattern());
        this.vel.add(this.accel);
        //this.vel.limit(maxSpeed)
        this.pos.add(this.vel);
        this.accel.mult(0);
    }

    colorList() {
        let list = []
        
        list.push(new Colors("#64AEF6", "#FBE859"))
        list.push(new Colors("#DB3525", "#D78AD5"))
        list.push(new Colors("#182CD4", "#C4FA6F"))
        return list
    }

    colorMap(dist, distMax, colors) {
        let r = map(dist, 0, distMax, colors.colorDuo[0].r, colors.colorDuo[1].r); 
        let g = map(dist, 0, distMax, colors.colorDuo[0].g, colors.colorDuo[1].g); 
        let b = map(dist, 0, distMax, colors.colorDuo[0].b, colors.colorDuo[1].b); 
        let a = map(dist, 0, distMax, 255, 0); 
        return {r,g,b,a}
    }

    colorize(colors) {
        let centerX = width/2;
        let centerY = height/2;
        let distance = dist(this.pos.x, this.pos.y, centerX, centerY);
        let distanceMax;
        let lim= 0.9
        if (height > width) distanceMax = width
        else distanceMax = height*lim

        let i = floor((Math.random(0, colors.length)));
        let colorValues = this.colorMap(distance, distanceMax*lim, colors[i]);
        fill(color(colorValues.r, colorValues.g, colorValues.b, colorValues.a));
    }
    

    show() { 
        let colors = this.colorList()
        this.colorize(colors)
        noStroke();
        circle(this.pos.x, this.pos.y, 3);
    }
}