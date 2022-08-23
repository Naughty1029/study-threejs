uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1.0);

  modelPosition.y += 0.3;

  vec4 viewPosition = viewMatrix *modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;
}