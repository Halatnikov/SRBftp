/////////////////////////////////////////////////////////
// Outline effect
//
varying mediump vec2 vTex;
uniform lowp sampler2D samplerFront;

precision highp float;
uniform highp float pixelWidth;
uniform highp float pixelHeight;
uniform highp float red;
uniform highp float green;
uniform highp float blue;
uniform highp float width;
uniform highp float justoutline;

void main(void)
{
	vec4 front = texture2D(samplerFront, vTex);

	float dx = pixelWidth*width;
	float dy = pixelHeight*width;
    float diag = 0.7071;
	
    float a0 = texture2D(samplerFront, vTex + vec2(-dx*diag, dy*diag)).a;
    float a1 = texture2D(samplerFront, vTex + vec2(dx*diag, -dy*diag)).a;
    float a2 = texture2D(samplerFront, vTex + vec2(-dx*diag, -dy*diag)).a;
    float a3 = texture2D(samplerFront, vTex + vec2(dx*diag, dy*diag)).a;
    float a4 = texture2D(samplerFront, vTex + vec2(-dx, 0.0)).a;
    float a5 = texture2D(samplerFront, vTex + vec2(dx, 0.0)).a;
    float a6 = texture2D(samplerFront, vTex + vec2(0.0, dy)).a;
    float a7 = texture2D(samplerFront, vTex + vec2(0.0, -dy)).a;
	
    float ina=max(max(max(max(max(max(max(a0,a1),a2),a3),a4),a5),a6),a7)-front.a;
    if(justoutline!=1.0)
    {
        float outa = ina + front.a*(1.0-ina);
        vec3 outrgb = (vec3(red/255.0, green/255.0, blue/255.0)*ina + front.rgb*front.a*(1.0-ina));
        gl_FragColor = vec4(outrgb, outa);
    }
    else if(ina>0.0)
    {
        gl_FragColor = vec4(vec3(red/255.0, green/255.0, blue/255.0)*ina, ina);
    }
}