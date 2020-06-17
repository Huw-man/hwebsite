uniform vec4 u_color;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    gl_FragColor = vec4(v_normal, 1);
    // vec3 Ia = vec3(1.0);
    // float ka = 0.2;
    // float kd = 0.2;
    // float ks = 0.5;
    // float p = 20.0;
    // vec3 l = u_light_pos - v_position.xyz;
    // vec3 v = cameraPosition - v_position.xyz;
    // vec3 h = (v + l) / length(v+l);

    // gl_FragColor = vec4( ka * Ia +
    // kd * (u_light_intensity / pow(length(l), 2)) * max(0.0, dot(v_normal.xyz, l / length(l))) +
    // ks * (u_light_intensity / pow(length(l), 2)) * pow(max(0.0, dot(v_normal.xyz, h / length(h))), p) ,
    //  1 );

}
