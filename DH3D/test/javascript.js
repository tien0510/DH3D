// biến thuộc tính (attribute ) chỉ làm việc trong V_shader
var VSHADER_SOURCE = // biến thuộc tính
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n'+
  'attribute vec4 a_color;\n' +
  'attribute float a_size;\n' +
  'varying vec4 v_color;\n' + // varying variablephải có v_color vì fshader k làm việc với a_color

  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  gl_PointSize = a_size;\n' +
  '  v_color = a_color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n' +
'varying vec4 v_color;\n' +
  'void main() {\n' +
    ' gl_FragColor = v_color;\n' +
  
  '}\n';
var step= 0.0;
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var n = initVertexBuffers(gl);

  var translate = 0.0;
  var step = 0.02;
  var currentAngle = 0.0;
// gl.clearColor(0, 0, 0, 1);
  var modelMatrix = new Matrix4();
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var tick = function() {
        translate = translate + step;  
        currentAngle = currentAngle + 0.5;
      if(translate < -0.75){
        translate = -0.75;
      }

      if(translate > 0.50){
         translate = 0.50;
      }
      // Vẽ tam giác với góc quay cụ thể được cập nhật
      // draw(gl, n, translate, modelMatrix, u_ModelMatrix);
      modelMatrix.setTranslate(translate,0,0);
         // modelMatrix.setTranslate(0.3,0.3,0.0);
        // modelMatrix.rotate(currentAngle, 0.0, 0.0, 1.0); // Rotation angle, rotation axis (0, 0, 1)
        // modelMatrix.translate(-0.3,-0.3,0.0);


        // modelMatrix.setScale(0.5,0.5,0.0);
        gl.uniformMatrix4fv (u_ModelMatrix, false, modelMatrix.elements);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
        requestAnimationFrame(tick); 
      };
    tick(); 
  gl.clearColor(0, 0, 0, 1);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    -0.5, -0.5, 1.0, 0.0,0.0,//10.0,// mỗi phần tử chiếm 4 byte, chứa khoảng 20 byte, 8 byte cho positon , 12 cuối cho a_size
    0.5 ,-0.5 ,0.0, 1.0,0.0,//20.0  , 
    0.5,0.5, 0.0, 0.0,1.0,//30.0,
   -0.5, 0.5, 0.0, 1.0,1.0//,30

  ]);
  var FSIZE = vertices.BYTES_PER_ELEMENT;// 4
  var n = 4; // The number of vertices
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();//buowsc 1
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//buov 2
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);//buov 3
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_color = gl.getAttribLocation(gl.program,'a_color');
  // var a_size = gl.getAttribLocation(gl.program,'a_size');

  //======
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);//buoc 4
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
  // gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, FSIZE*6, FSIZE*5)

                      // location, size,tyoe,normalized,stride(số byte giữa mỗi đỉnh),offset(vị trí byte bắt đầu)
  //==========
  gl.enableVertexAttribArray(a_Position);//buoc 5
  gl.enableVertexAttribArray(a_color);
  // gl.enableVertexAttribArray(a_size);

  return n;
}
