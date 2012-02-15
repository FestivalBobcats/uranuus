

// g = acceleration

// weight = mg where g is a constant

// velocity = gravity * time

// F = ma


// HAVE: mass
// NEED: acceleration
// NEED: weight



function Universe(P){
	
	var WIDTH = 800,
			HEIGHT = 600;
	
	var frames = 0;
	
	
	
	// gravitational constant
	var G = 6.67384 * Math.pow(10, -11);
	
	var PARTICLE_COUNT = 200,
			particles = [];
	
	var CENTER = {x: WIDTH / 2, y: HEIGHT / 2};
	
	function Particle(){
		this.position = new P.PVector(Math.random() * WIDTH, Math.random() * HEIGHT);
		this.velocity = new P.PVector(0, 0);
		this.radius = Math.random() * 3,
		this.mass = this.radius * 2000;
		// this.age = 0;
		
		var self = this;
		
		
		// the attractive force (F) between two bodies is proportional to the product
		// of their masses (m1 and m2), and inversely proportional to the square of
		// the distance (inverse square law) (r) between them
		function attractiveForce(particle){
			return G * (particle.mass * self.mass) / Math.pow(distanceFrom(particle), 2);
		}
		
		// using the phtagorean theorem
		function distanceFrom(particle){
			var a = Math.pow(particle.position.x - self.position.x, 2),
					b = Math.pow(particle.position.y - self.position.y, 2),
					c = Math.sqrt(a + b);
			return c;
		}
		
		function calculateVelocity(){
			particles.forEach(function(particle){
				
				if (particle != self) {
					// calculate the angle at which to apply the gravitational force
					var attraction = P.PVector.sub(self.position, particle.position);
					attraction.normalize();
					attraction.mult(Math.ceil(attractiveForce(particle)));
					
					attraction.mult(0.0001)
					
					self.velocity.sub(attraction);
				}
				
			});
			
			// self.velocity.limit(3);
			self.position.add(self.velocity);
		}
		
		this.render = function(){
			calculateVelocity();
			
			
			
			P.ellipse(self.position.x, self.position.y, self.radius * 2, self.radius * 2);
		};
	}
	
	P.setup = function(){
		P.size(WIDTH, HEIGHT);
		P.background(0);
		
		P.smooth();
		P.frameRate(24);

		// Spawn particles
		for (i = 0; i < PARTICLE_COUNT; i++) {
			var particle = new Particle();
			particles.push(particle);
		}
	};
	
	P.draw = function(){
		P.background(0);
		P.noStroke();
		P.fill(255);
		
		P.text(P.millis() / (frames || 1), 20, 20);
		
		particles.forEach(function(particle){
			particle.render();
		});
		
		frames++;
	};
}

window.onload = function(){
	var canvas = document.getElementById('universe');
	window.universe = new Processing(canvas, Universe);
};






