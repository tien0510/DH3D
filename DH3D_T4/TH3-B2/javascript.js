
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' + //1 biến truyền ma trận phép quay
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' + //2 nhân ma trận vào
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';
var currentAngle = 0.0;
var Angle_step = 45;
function up() {

Angle_step = 45;

}

function down() {

Angle_step = -45;

}
function main(){
  // var ModelMatrix = new Matrix4();
  // ModelMatrix.setTranslate(0.5,-0.5,0.0);
  // ModelMatrix.setIdentity();
  // ModelMatrix.translate(0.0,0.5,0.0);// dịch lên sau
  // ModelMatrix.rotate(45,0.0,0.0,1.0);//quay trước
  // ModelMatrix.scale(0.5,0.5,0.0);

  var canvas = document.getElementById ('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');//3lấy vị trí lưu trữ
 
  var ModelMatrix = new Matrix4();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  var tick = function(time){
    // currentAngle =  (currentAngle  + 0.5) ;
    currentAngle =  (Angle_step/1000 * time )%360;


    // ModelMatrix.setRotate(currentAngle,0,0,1);// quay sau
    // ModelMatrix.translate(0.35,0.0,0.0);// tính tiến
//t ịnh tiến quanh 1 điểm k thay đổi vị trí(tam giác quay quanh 1 đỉnh)
    ModelMatrix.setTranslate(0.0,0.5,0.0);
    ModelMatrix.rotate(currentAngle,0,0,1);
    ModelMatrix.translate(0.0,-0.5,0.0);


    gl.uniformMatrix4fv(u_ModelMatrix, false ,ModelMatrix.elements);//4 truyền vị trí lưu trữ
    gl.clear(gl.COLOR_BUFFER_BIT);// thiết lập lại màu nền xoá hình cũ
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    requestAnimationFrame(tick);
    };
    // tick();
    requestAnimationFrame(tick);
  
  gl.clear(gl.COLOR_BUFFER_BIT);// thiết lập lại màu nền xoá hình cũ
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
  //draw
  
}  

function initVertexBuffers(gl){
  var vertices = new Float32Array([
   0.0 ,0.5,
   -0.5, -0.5,
   0.5, -0.5
  ]);
  var n = 3;
  var VertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  //gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}
