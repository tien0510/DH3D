// HelloTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix*a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n'+
  '}\n';
// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n'+
'uniform sampler2D u_Sampler;\n' +
'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';
//quay lập phương một góc 45 quanh trục là đường phân giác của hệ tọa độ
var angle = 0.0;
function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  var texture = gl.createTexture(); 
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  var image = new Image(); 
  image.src = 'crate.gif';
   var translate = 0.0;
  var step = 0.02;
  var currentAngle = 45.0;
  var ModelMatrix = new Matrix4();
  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var tick = function(){
	   translate = translate + step;  
        currentAngle = currentAngle + 0.5;
      if(translate > 0.55){
         translate = 0.55;
         // currentAngle = 0.0;
      }
      // Vẽ tam giác với góc quay cụ thể được cập nhật
      // draw(gl, n, translate, modelMatrix, u_ModelMatrix);
      ModelMatrix.setTranslate(translate,0,0);
      ModelMatrix.rotate(currentAngle, 1.0, 0.0, 1.0);
      ModelMatrix.scale(0.5,0.5,0.5);

	  gl.uniformMatrix4fv(u_xformMatrix, false, ModelMatrix.elements);
	  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	  loadTexture(gl, n, texture, u_Sampler, image); 
	  requestAnimationFrame(tick);	  
  }
  tick();   
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  //gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    -0.5,  0.5,  0.5, 0.0, 1.0,	    
	-0.5, -0.5,  0.5, 0.0, 0.0,
	 0.5,  0.5,  0.5, 1.0, 1.0,
	 0.5, -0.5,  0.5, 1.0, 0.0,
  // Back face
  -0.5,  0.5, -0.5, 0.0, 1.0,
  -0.5, -0.5, -0.5, 0.0, 0.0,
   0.5,  0.5, -0.5, 1.0, 1.0,
   0.5, -0.5, -0.5, 1.0, 0.0, 

  // Top face
  -0.5,  0.5,  0.5, 0.0, 1.0,
  -0.5,  0.5, -0.5, 0.0, 0.0,
   0.5,  0.5,  0.5, 1.0, 1.0,
   0.5,  0.5, -0.5, 1.0, 0.0,   

  // Bottom face
  -0.5, -0.5,  0.5, 0.0, 1.0,
  -0.5, -0.5, -0.5, 0.0, 0.0,
   0.5, -0.5,  0.5, 1.0, 1.0,
   0.5, -0.5, -0.5, 1.0, 0.0,
   
  // Right face
   0.5, -0.5,  0.5, 0.0, 0.0,//v0
   0.5, -0.5, -0.5, 1.0, 0.0,//v1
   0.5,  0.5,  0.5, 0.0, 1.0,//v2
   0.5,  0.5, -0.5, 1.0, 1.0,//v3
  // Left face
  -0.5, -0.5,  0.5, 0.0, 1.0,	
  -0.5, -0.5, -0.5, 0.0, 0.0,
  -0.5,  0.5,  0.5, 1.0, 1.0,
  -0.5,  0.5, -0.5, 1.0, 0.0,	
  ]);
  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  var n = 24; // The number of vertices
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);  
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');   
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*5, 0);
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*5, FSIZE*3); 
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_TexCoord);  
  return n;
}
function loadTexture(gl, n, texture, u_Sampler, image){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
	gl.activeTexture(gl.TEXTURE0);// Enable the texture unit 0
	gl.bindTexture(gl.TEXTURE_2D, texture);
	// Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	// Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);	
	gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
	gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
	gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
	gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4);
	gl.drawArrays(gl.TRIANGLE_STRIP, 20, 4);
}

