// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix *a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var currentAngle = 45.0;

	var modelMatrix = new Matrix4();


	modelMatrix.setRotate(currentAngle, 1.0, 1,1.0); 

	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	gl.enable(gl.DEPTH_TEST);


  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
  initTextures(gl, n);


}

function initVertexBuffers(gl) {
	var verticesTexCoords = new Float32Array([ 
//front face
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
	var n = 24; // The number of vertices

	// Create the buffer object
	var vertexTexCoordBuffer = gl.createBuffer();

	// Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

	var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
	//Get the storage location of a_Position, assign and enable buffer
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

	// Get the storage location of a_TexCoord
	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	// Assign the buffer object to a_TexCoord variable
	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
	gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

	return n;
}

function initTextures(gl, n) {
	var texture = gl.createTexture();   // Create a texture object

	// Get the storage location of u_Sampler
	var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
	var image = new Image();  // Create the image object
	// Register the event handler to be called on loading an image
	image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
	// Tell the browser to load an image
	image.src = 'sky.jpg';

	return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT );
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(u_Sampler, 0); 

	gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
for (var i = 0; i <= 20; i+=4) {
  gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);

}
	// gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle
	// gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4); // Draw the rectangle
	// gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4); // Draw the rectangle
	// gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4); // Draw the rectangle
	// gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4); // Draw the rectangle
	// gl.drawArrays(gl.TRIANGLE_STRIP, 20, 4); // Draw the rectangle
}
