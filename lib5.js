
//////////////////////////////////////////////////////////////////////////////////////////
//
// THIS IS THE SUPPORT LIBRARY.  YOU PROBABLY DON'T WANT TO CHANGE ANYTHING HERE JUST YET.
//
//////////////////////////////////////////////////////////////////////////////////////////

let Mat4=function(){let T=this,_=(m,i,j,k,l)=>[m[i],m[j],m[k],m[l]],E=(a,b)=>a!==undefined?a:b?b:0,U=t=>Math.cos(t),V=t=>Math.sin(t),Q=t=>t*t,a,b,c,i,j,k,l,I,J,K,L,r,s,t=0,d=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*E(b[2])+a[3]*E(b[3],1),D=()=>P([1,0,0,0,0,1,0,0,0,0,1,0]),f=a=>m(M(a,m())),P=a=>a.concat([0,0,0,1]),S=[D()],F=a=>f(P(a)),m=a=>a!==undefined?S[t]=a:S[t],x=m=>_(m,0,1,2,3),y=m=>_(m,4,5,6,7),z=m=>_(m,8,9,10,11),w=m=>_(m,12,13,14,15),v=(m,a)=>[d(x(m),a)/(r=a[3]?d(w(m),a):1),d(y(m),a)/r,d(z(m),a)/r,E(a[3],1)],M=(a,b)=>[d(i=x(a),I=_(b,0,4,8,12)),d(i,J=_(b,1,5,9,13)),d(i,K=_(b,2,6,10,14)),d(i,L=_(b,3,7,11,15)),d(j=y(a),I),d(j,J),d(j,K),d(j,L),d(k=z(a),I),d(k,J),d(k,K),d(K,L),d(l=w(a),I),d(l,J),d(l,K),d(l,L)];T.save=()=>S[t+1]=S[t++];T.restore=()=>--t;T.identity=()=>m(D());T.translate=(x,y,z)=>f([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);T.rotateX=a=>F([1,0,0,0,0,c=U(a),s=V(a),0,0,-s,c,0]);T.rotateY=a=>F([c=U(a),0,-(s=V(a)),0,0,1,0,0,s,0,c,0]);T.rotateZ=a=>F([c=U(a),s=V(a),0,0,-s,c,0,0,0,0,1,0]);T.scale=(x,y,z)=>F([x,0,0,0,0,E(y,x),0,0,0,0,E(z,x),0]);T.perspective=(x,y,z)=>F([1,0,0,x,0,1,0,y,0,0,1,z]);T.transform=a=>v(m(),a);T.value=()=>m()}

var fragmentShaderHeader = [''
,'   precision highp float;'
,'   vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }'
,'   vec4 mod289(vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }'
,'   vec4 permute(vec4 x) { return mod289(((x*34.)+1.)*x); }'
,'   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - .85373472095314 * r; }'
,'   vec3 fade(vec3 t) { return t*t*t*(t*(t*6.-15.)+10.); }'
,'   float noise(vec3 P) {'
,'      vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.)),'
,'           f0 = fract(P), f1 = f0 - vec3(1.), f = fade(f0);'
,'      vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy),'
,'           iz0 = i0.zzzz, iz1 = i1.zzzz,'
,'           ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1),'
,'           gx0 = ixy0 * (1. / 7.), gy0 = fract(floor(gx0) * (1. / 7.)) - .5,'
,'           gx1 = ixy1 * (1. / 7.), gy1 = fract(floor(gx1) * (1. / 7.)) - .5;'
,'      gx0 = fract(gx0); gx1 = fract(gx1);'
,'      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.)),'
,'           gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.));'
,'      gx0 -= sz0 * (step(0., gx0) - .5); gy0 -= sz0 * (step(0., gy0) - .5);'
,'      gx1 -= sz1 * (step(0., gx1) - .5); gy1 -= sz1 * (step(0., gy1) - .5);'
,'      vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),'
,'           g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),'
,'           g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),'
,'           g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);'
,'      vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3))),'
,'           norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));'
,'      g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;'
,'      g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;'
,'      vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),'
,'                         dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),'
,'                    vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),'
,'                         dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);'
,'      return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);'
,'   }'
,'   float turbulence(vec3 P) {'              // Turbulence is a fractal sum of abs(noise).
,'      float f = 0., s = 1.;'                // The domain is rotated after every iteration
,'      for (int i = 0 ; i < 9 ; i++) {'      //    to avoid any visible grid artifacts.
,'         f += abs(noise(s * P)) / s;'
,'         s *= 2.;'
,'         P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);'
,'      }'
,'      return f;'
,'   }'
,'   float ray_sphere(vec3 V, vec3 W, vec4 sphere) {'
,'      V -= sphere.xyz;'
,'      float r = sphere.w;'
,'      float WV = dot(W, V);'
,'      float discr = WV * WV - dot(V, V) + r * r;'
,'      return discr >= 0. ? -WV - sqrt(discr) : -1.;'
,'   }'
].join('\n');

var nfsh = fragmentShaderHeader.split('\n').length; // NUMBER OF LINES OF CODE IN fragmentShaderHeader

var isFirefox = navigator.userAgent.indexOf('Firefox') > 0;
var errorMsg = '';

let stride = 3;
let triMesh = [-1,-1,0, -1,1,0, 1,-1,0, .8,.8,0];

function gl_start(canvas, vertexShader, fragmentShader) {           // START WEBGL RUNNING IN A CANVAS

   setTimeout(function() {
      try { 
         canvas.gl = canvas.getContext('experimental-webgl');              // Make sure WebGl is supported.
      } catch (e) { throw 'Sorry, your browser does not support WebGL.'; }

      canvas.setShaders = function(vertexShader, fragmentShader) {         // Add the vertex and fragment shaders:

         gl = this.gl, program = gl.createProgram();                        // Create the WebGL program.

         function addshader(type, src) {                                        // Create and attach a WebGL shader.
            function spacer(color, width, height) {
               return '<table bgcolor=' + color +
                            ' width='   + width +
                            ' height='  + height + '><tr><td>&nbsp;</td></tr></table>';
            }
            errorMessage.innerHTML = '<br>';
            errorMarker.innerHTML = spacer('black', 1, 1) + '<font size=5 color=black>\u25B6</font>';
            var shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
               let msg = gl.getShaderInfoLog(shader);
               console.log('Cannot compile shader:\n\n' + msg);

               let a = msg.substring(6, msg.length);
               if (a.substring(0, 3) == ' 0:') {
                  a = a.substring(3, a.length);
                  let line = parseInt(a) - nfsh + 1;
                  let nPixels = isFirefox ? 17 * line - 10 : 18 * line - 1;
                  errorMarker.innerHTML = spacer('black', 1, nPixels) + '<font size=5>\u25B6</font>';
               }

               let j = a.indexOf(':');
               a = a.substring(j+2, a.length);
               if ((j = a.indexOf('\n')) > 0)
                  a = a.substring(0, j);
               errorMessage.innerHTML = a;
            }
            gl.attachShader(program, shader);
         };

         addshader(gl.VERTEX_SHADER  , vertexShader  );                         // Add the vertex and fragment shaders.
         addshader(gl.FRAGMENT_SHADER, fragmentShaderHeader + fragmentShader);

         gl.linkProgram(program);                                               // Link the program, report any errors.
         if (! gl.getProgramParameter(program, gl.LINK_STATUS))
            console.log('Could not link the shader program!');
         gl.useProgram(program);
         gl.program = program;

         gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

         gl.enable    (gl.DEPTH_TEST);
         gl.depthFunc (gl.GEQUAL);
         gl.clearDepth(-1.0);

         var aPos = gl.getAttribLocation(program, 'aPos');
         var aNor = gl.getAttribLocation(program, 'aNor');
         gl.enableVertexAttribArray(aPos);
         gl.enableVertexAttribArray(aNor);

	 let bpe = Float32Array.BYTES_PER_ELEMENT

         gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, stride * bpe, 0 * bpe);
         gl.vertexAttribPointer(aNor, 3, gl.FLOAT, false, stride * bpe, 3 * bpe);
      }

      canvas.setShaders(vertexShader, fragmentShader);                     // Initialize everything,

      canvas.mouseInfo = [0,0,0];
      canvas.addEventListener('mousemove', function(e) {
         let r = this.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
         this.mouseInfo[0] = 2 * x / r.width - 1;
         this.mouseInfo[1] = (r.height - 2 * y) / r.width;
      });
      canvas.addEventListener('mousedown', function(e) { this.mouseInfo[2] = 1; });
      canvas.addEventListener('mouseup'  , function(e) { this.mouseInfo[2] = 0; });

      setInterval(function() {                                             // Start the animation loop.
         gl = canvas.gl;
         if (gl.startTime === undefined)                                            // First time through,
            gl.startTime = Date.now();                                              //    record the start time.
         gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
         animate(gl);
         //gl.drawArrays(gl.TRIANGLE_STRIP, 0, triMesh.length / stride); // --NO LONGER NEEDED
      }, 30);

   }, 100); // Wait 100 milliseconds after page has loaded before starting WebGL.
}

let drawMesh = (m, mesh, material) => {
   setUniform('Matrix4fv', 'uMat', false, m.value());
   setUniform('Matrix4fv', 'uM', false, material);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh), gl.STATIC_DRAW);
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, mesh.length / stride);
}

function animate() { }

var gl;
function setUniform(type, name, a, b, c, d, e, f) {
   let loc = gl.getUniformLocation(gl.program, name);
   (gl['uniform' + type])(loc, a, b, c, d, e, f);
}

//------------------------ ANIMATION --------------------------

// YOU MIGHT WANT TO MOVE THESE SUPPORT FUNCTIONS INTO THE LIBRARY,
// SO YOU CAN USE THEM LATER IN OTHER THINGS YOU CREATE.

let m = new Mat4();                                    // DEFINE A NEW 4x4 MATRIX OBJECT.

let plastic = (r,g,b,p,s) => {
   if (p === undefined) p = 10;
   if (s === undefined) s = 1;
   return [.2*r,.2*g,.2*b,0, r,g,b,0, s,s,s,p, 0,0,0,0];
} 

let metal = (r,g,b,p,s) => {
   if (p === undefined) p = 10;
   if (s === undefined) s = 1;
   return [.2*r,.2*g,.2*b,0, r,g,b,0, s*r,s*g,s*b,p, 0,0,0,0];
} 

let normalize = v => {
   let s = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
   return [v[0] / s, v[1] / s, v[2] / s];
}

let lights = [];

let clearLights = () => lights = [];

let addLight = (dir,color) => {
   dir = normalize(dir);
   let newLight = [dir[0],dir[1],dir[2], color[0],color[1],color[2], 0,0,0];
   for (let n = 0 ; n < newLight.length ; n++)
      lights.push(newLight[n]);
}

function animate(gl) {
   let time = (Date.now() - startTime) / 1000;

   setUniform('3fv', 'uMouse', canvas1.mouseInfo);
   setUniform('1f', 'uTime', time);
   setUniform('1f', 'uFL', 3.5);

   // SPECIFY BACKGROUND COLOR AND LIGHT SOURCES

   bgColor = [.5,.8,1];

   lightDir = [Math.cos(3 * time),1,Math.sin(3 * time)];

   clearLights();
   addLight(lightDir, bgColor);
   addLight([-1,-1,-1], [.25,.1,.05]);

   setUniform('Matrix3fv', 'uL', false, lights);

   // CLEAR EVERYTHING TO THE BACKGROUND COLOR

   gl.clearColor(bgColor[0],bgColor[1],bgColor[2],1);

   // ANIMATE AND DRAW ALL THE OBJECTS IN THE SCENE

   m.identity();
   m.rotateY(.5);
   m.rotateX(time);
   m.scale(.5);

   drawMesh(m, torus32x32, metal(.9,.6,.1,5));

   m.scale(.4);
   m.rotateY(4 * time);
   drawMesh(m, torus32x32, plastic(1,.1,.1));

   m.scale(.4,.4,1);
   drawMesh(m, sphere16x8, metal(.2,.2,.8));

   m.identity();
   m.translate(.5,.5,0);
   m.scale(.1);
   drawMesh(m, sphere16x8, plastic(1,1,1));
}

gl_start(canvas1, vs, fs);

