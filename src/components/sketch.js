import p5 from 'p5/lib/p5.min';

const sketch = (p) => {
    class Rotor {
        constructor(id, baseSize, sequence, rotation) {
            this.id = id;
            this.baseSize = baseSize;
            this.sequence = sequence;
            this.d = this.baseSize * this.sequence.length * 2;
            this.r = this.d / 2;
            this.speed = -0.01;
            this.counter = 0;
            this.rotation = p.radians(rotation);
            this.triggers = [];
            this.colors = [];
            this.sphereSizes = [];
            for(let i=0; i< this.sequence.length; i++) {
                this.triggers.push(false);
                this.colors.push(0);
                this.sphereSizes.push(2);
            }

        }
        draw() {
            p.push();
            p.rotateY(this.rotation + this.counter * (18 - this.sequence.length) / 40);
            //p.rotateZ(this.rotation + this.counter * (18 - this.sequence.length) / 50);
            //p.rotateX(this.id * 30);
            p.noFill();
            p.stroke(255,30);
            p.push();
            //p.rotateY(p.radians(90));
            //p.line(0,-this.r + 10,0,0,-this.r - 10,0);
            //p.line(0,-this.r,-100,0,-this.r,100);
            p.pop();
            //p.ellipse(0,0, this.d, this.d);

            p.stroke(0,40);
            p.arc(0,0, this.d, this.d, p.PI + p.PI/3 + p.PI/3, p.TWO_PI * 2);
            p.arc(0,0, this.d, this.d, p.PI, p.PI + p.PI/3);
            p.stroke(0,160);
            p.arc(0,0, this.d, this.d, 0, p.PI);
            p.arc(0,0, this.d, this.d, p.PI + p.PI/3, p.PI + p.PI/3 + p.PI/3);

            let step = p.TWO_PI / this.sequence.length * 1.0;

            for( let i = 0; i< this.sequence.length; i++) {
                p.push();
                //p.translate( p.sin( step * i + this.counter) * this.r, p.cos( step * i + this.counter) * this.r, 0 );
                p.translate( p.sin( step * i - p.millis() / (this.sequence.length * 100.0))* this.r, p.cos( step * i - p.millis() / (this.sequence.length * 100.0))* this.r);
                p.noStroke();
                p.fill('#b2bbed');
                p.sphere(this.sphereSizes[i]);
                if(this.sequence[i] == 0) {
                    //p.fill(255,100);
                } else {
                    if( p.sin( step * i - p.millis() / (this.sequence.length * 100.0)) > 0 ) {
                        if( this.triggers[i]==false) {
                            this.colors[i] = 255;
                            this.sphereSizes[i] = 8;
                        }
                        this.triggers[i] = true;
                    } else {
                        this.triggers[i] = false;
                    }
                    p.fill('#3F51B5');
                    //p.fill(this.colors[i],0,0,200);
                }
                p.sphere(this.sphereSizes[i]);
                p.pop();
                this.colors[i] -= 4;
                if(this.sphereSizes[i] > 2)this.sphereSizes[i] -= 1;
            }
            p.pop();
            this.counter += this.speed;
        }
    }

    let r0, r1, r2, r3, r4, r5, r6;

    let po = 12;
    

    p.setup = () => {
        let canvas = p.createCanvas(600, 600, p.WEBGL);
        r0 = new Rotor( 0, 10, [ 1, 0], 0 );
        r1 = new Rotor( 1, 10, [ 1, 0, 1], 0 );
        r2 = new Rotor( 2, 10, [ 1, 0, 1, 1], 0, );
        r3 = new Rotor( 3, 10, [ 1, 1, 0, 1, 1, 0, 1], 0, );
        r4 = new Rotor( 4, 10, [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1], 0 );
        r5 = new Rotor( 5, 10, [ 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1], 0 );
        r6 = new Rotor( 6, 10, [ 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1], 0 );
    }

    p.draw = () => {
        p.camera(100,0, 380, 0, 0, 0, 0, 1, 0);
        p.background(255);
        p.smooth();
        
        r0.draw();
        r1.draw();
        r2.draw();
        r3.draw();
        r4.draw();
        r5.draw();
        r6.draw();
    }
}
export default sketch;