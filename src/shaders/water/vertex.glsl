#define M_PI 3.1415926535897932384626433832795

uniform float time;

varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

vec3 gerstnerWave(vec4 wave, vec3 pos, inout vec3 tangent, inout vec3 binormal) {
    float steepness = wave.z;
    float wavelength = wave.w;
    float k = 2.0 * M_PI / wavelength;
    float c = sqrt(9.8 / k);
    vec2 d = normalize(wave.xy);
    float f = k * (dot(d, pos.xz) - c * time * 0.001);
    float a = steepness / k;

    tangent += vec3(
        -d.x * d.x * (steepness * sin(f)),
        d.x * (steepness * cos(f)),
        -d.x * d.y * (steepness * sin(f))
    );

    binormal += vec3(
        -d.x * d.y * (steepness * sin(f)),
        d.y * (steepness * cos(f)),
        -d.y * d.y * (steepness * sin(f))
    );

    return vec3(
        d.x * (a * cos(f)),
        a * sin(f),
        d.y * (a * cos(f))
    );
}

void main() {
    // WaveA dir, steepness, wavelength
    vec4 waveA = vec4(0, 1, 0.5, 10);
    vec4 waveB = vec4(1, 0, 0.25, 20);


    vec4 vtangent = tangent.xyz;
    vec3 binormal = vec3(0, 0, 1);
    vec3 newP = position;

    // newP += gerstnerWave(waveA, position, vtangent, binormal);
    newP += gerstnerWave(waveB, position, vtangent, binormal);

    v_position = newP;
    v_uv = uv;
    v_normal = normalize(cross(binormal, vtangent));

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newP, 1.0 );
}