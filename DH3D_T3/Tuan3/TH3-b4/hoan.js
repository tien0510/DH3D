var VSHADER_SOURCE =
  'uniform mat4 u_ModelMatrix;\n'+
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

var step= 0.0;
function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

  var n = initVertexBuffers(gl);
  //Hàm tick

  var translate = 0.0;
  var step = 0.02;
  var modelMatrix = new Matrix4();
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var tick = function() {
      translate = translate+step;
      // if(translate < -0.75){
      //   translate = -0.75;
      // }

      // if(translate > 0.75){
      //    translate = 0.75;
      // }
    //Vẽ tam giác với góc quay cụ thể được cập nhật
    // draw(gl, n, translate, modelMatrix, u_ModelMatrix);
      modelMatrix.setTranslate(translate,0,0);
    gl.uniformMatrix4fv (u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
    requestAnimationFrame(tick); 
 };
	tick();

  gl.clearColor(0, 0, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.25,   -0.25, -0.25,   0.25, -0.25
  ]);
  var n = 3; 
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}

// function draw(gl, n, translate, modelMatrix, u_ModelMatrix)
// {
//     modelMatrix.setTranslate(translate,0,0);
//     gl.uniformMatrix4fv (u_ModelMatrix, false, modelMatrix.elements);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.TRIANGLES, 0, n);

// }


// function left(){
//   step = -0.02;
// }
// function right(){
//  step = +0.02;
// }