import * as THREE from './assets/vendor/three/three.module.js';
import { GLTFLoader } from './assets/vendor/three/GLTFLoader.js';
export async function createSkyBackground(canvas, version) {
 const assetUrl=name=>new URL(`./assets/sky/${name}?v=${encodeURIComponent(version)}`,import.meta.url).href;
 const [gltf,cloudTexture]=await Promise.all([
  new GLTFLoader().loadAsync(assetUrl('blue-whale.glb')),
  new THREE.TextureLoader().loadAsync(assetUrl('cloud.png'))
 ]);
 let playing=false,contextLost=false;
 const renderer=new THREE.WebGLRenderer({canvas,antialias:false,powerPreference:'low-power'});
 renderer.setPixelRatio(1);
 renderer.debug.onShaderError=()=>{throw new Error('Sky shader is unavailable');};
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1;
 const scene=new THREE.Scene();
 scene.add(new THREE.HemisphereLight(0x98bbdf,0x182844,1.25));
 const sun=new THREE.DirectionalLight(0xffe9cd,1.9);sun.position.set(-280,330,-60);scene.add(sun);
 const fill=new THREE.DirectionalLight(0xbfd6e4,.65);fill.position.set(100,50,280);scene.add(fill);

 cloudTexture.colorSpace=THREE.SRGBColorSpace;
 if(!gltf.animations.length)throw new Error('蓝鲸动画缺失');
 const whale=gltf.scene, mixer=new THREE.AnimationMixer(whale);
 mixer.clipAction(gltf.animations[0]).play();mixer.update(0);
 const bounds=new THREE.Box3().setFromObject(whale), sphere=bounds.getBoundingSphere(new THREE.Sphere());
 if(!Number.isFinite(sphere.radius)||sphere.radius<=0)throw new Error('蓝鲸尺寸无效');
 const body=new THREE.Group();scene.add(body);body.add(whale);
 const scale=225/sphere.radius;whale.scale.multiplyScalar(scale);whale.position.addScaledVector(sphere.center,-scale);
 body.position.set(0,42,0);
 const camera=new THREE.PerspectiveCamera(38,1,1,20000);
 const driftingClouds=Array.from({length:24},(_,i)=>{
  const layer=i%3;
  const material=new THREE.SpriteMaterial({map:cloudTexture,color:0xb4c6d3,transparent:true,opacity:.18,depthWrite:false,fog:true});
  const sprite=new THREE.Sprite(material);scene.add(sprite);
  return {sprite,layer,upper:i%6===0,depth:850+layer*750+(i%5)*55,size:340+(i%4)*95,seed:(i*.61803398875)%1,speed:52-layer*17};
 });
 let flightScale=1;
 const right=new THREE.Vector3(),up=new THREE.Vector3(),forward=new THREE.Vector3(),heading=new THREE.Vector3(),ahead=new THREE.Vector3();
 const target=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
 const uniforms={baseColor:{value:new THREE.Color('#132b45')},skyColor:{value:new THREE.Color('#6787a4')},horizonColor:{value:new THREE.Color('#839caf')},cloudShadow:{value:new THREE.Color('#536f84')},cloudLight:{value:new THREE.Color('#c5ccd0')},accentBlue:{value:new THREE.Color('#7ac6ff')},accentGreen:{value:new THREE.Color('#7cf7c1')},inverseProjection:{value:camera.projectionMatrixInverse},cameraWorld:{value:camera.matrixWorld},eye:{value:camera.position},time:{value:0},resolution:{value:new THREE.Vector2()},near:{value:1},far:{value:2400}};
 const material=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,vertexShader:`varying vec2 uvOut;void main(){uvOut=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`
 precision highp float;
 varying vec2 uvOut;uniform vec3 baseColor,skyColor,horizonColor,cloudShadow,cloudLight,accentBlue,accentGreen;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye;uniform float time,near,far;uniform vec2 resolution;
 float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
 float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
 float fbm(vec3 p){float v=0.,a=.55;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec3(11.7,5.3,8.1);a*=.49;}return v;}
 float density(vec3 p){vec3 q=p+vec3(time*18.,0.,time*5.);float n=fbm(q*.006)*.7+fbm(q*.022)*.3;float layer=1.-smoothstep(40.,150.,abs(p.y+170.));return smoothstep(.40,.62,n)*layer;}
 void main(){vec2 ndc=uvOut*2.-1.;vec4 view=inverseProjection*vec4(ndc,1.,1.);vec3 vr=normalize(view.xyz/view.w),ray=normalize((cameraWorld*vec4(vr,0.)).xyz);float depth=1.;float viewDepth=near*far/(far-depth*(far-near));float surface=depth<.99999?viewDepth/(-vr.z):2400.;
 vec3 sunDir=normalize(vec3(-.6,.45,-.4));float glow=pow(max(dot(ray,sunDir),0.),10.);vec3 sky=mix(skyColor,baseColor,smoothstep(-.12,.65,ray.y));sky=mix(sky,horizonColor,exp(-pow((ray.y+.045)*7.,2.))*.48);sky+=vec3(.035,.027,.017)*glow;
 vec4 cloud=vec4(0.);float stepSize=25.;float t=12.5;
 for(int i=0;i<96;i++){if(t>surface||cloud.a>.985)break;vec3 p=eye+ray*t;float d=density(p);if(d>.015){float shade=density(p+sunDir*55.);float light=clamp(1.-shade*2.1,.2,1.);vec3 tint=mix(cloudShadow,cloudLight,light);tint=mix(tint,sky,1.-exp(-t*.00042));float alpha=1.-exp(-d*stepSize*.025);cloud.rgb+=(1.-cloud.a)*tint*alpha;cloud.a+=(1.-cloud.a)*alpha;}t+=stepSize;}
 vec3 behind=sky;
 vec3 color=cloud.rgb+(1.-cloud.a)*behind;float vignette=1.-.12*dot(ndc,ndc);color*=vignette;color=mix(color,baseColor,smoothstep(.35,1.6,length(ndc))*.25);color+=accentGreen*.002*exp(-5.*dot(uvOut-vec2(.9,.35),uvOut-vec2(.9,.35)));color+=accentBlue*.006*exp(-7.*dot(uvOut-vec2(.1,.9),uvOut-vec2(.1,.9)));color+=(hash(vec3(gl_FragCoord.xy,time*.01))-.5)/255.;gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});
 const cloudBake=new THREE.Scene();cloudBake.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 const screenCamera=new THREE.Camera();
 const backdropMaterial=new THREE.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{map:{value:target.texture},time:{value:0}},vertexShader:material.vertexShader,fragmentShader:`
 varying vec2 uvOut;uniform sampler2D map;uniform float time;
 void main(){vec2 uv=.96*uvOut+.02;uv+=vec2(sin(time*.065)*.014,cos(time*.045)*.008);gl_FragColor=texture2D(map,uv);
 #include <colorspace_fragment>
 }`});
 const screen=new THREE.Scene();screen.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),backdropMaterial));
 scene.fog=new THREE.FogExp2(0x6a849b,.00015);
 renderer.autoClear=false;
 let needsResize=true;
 function resize(){
  needsResize=false;
  const w=innerWidth,h=innerHeight;
  renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(pointer: coarse)').matches?1:1.25,Math.sqrt(1400000/(w*h))));renderer.setSize(w,h);
  const ratio=Math.min(1,720/w,720/h,Math.sqrt(260000/(w*h)));
  target.setSize(Math.round(w*ratio),Math.round(h*ratio));
  camera.aspect=w/h;flightScale=Math.max(1,.9/camera.aspect);scene.fog.density=.00015/flightScale;camera.position.set(320,180,920);if(w<h)camera.position.multiplyScalar(3.2);
  camera.lookAt(0,-28,0);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  right.setFromMatrixColumn(camera.matrixWorld,0);up.setFromMatrixColumn(camera.matrixWorld,1);camera.getWorldDirection(forward);
  uniforms.time.value=0;renderer.setRenderTarget(target);renderer.clear();renderer.render(cloudBake,screenCamera);renderer.setRenderTarget(null);
  canvas.dataset.cloudBakes=String(Number(canvas.dataset.cloudBakes||0)+1);
 }
 resize();
 let last=0,elapsed=0,measuredAt=performance.now(),frames=0;
 function render(now){
  const dt=last?Math.min((now-last)/1000,.15):0;last=now;
  if(playing&&!document.hidden){elapsed+=dt;mixer.update(dt*.85);}
  const phase=elapsed*.4+Math.PI;
  const span=(1550*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect+460/flightScale)*flightScale;
  const depth=(1550-1050*Math.cos(phase))*flightScale;
  body.position.copy(camera.position).addScaledVector(forward,depth).addScaledVector(right,span*Math.sin(phase)).addScaledVector(up,(35+80*Math.sin(phase*2))*flightScale);
  heading.copy(forward).multiplyScalar(1050*Math.sin(phase)*flightScale).addScaledVector(right,span*Math.cos(phase)).addScaledVector(up,160*Math.cos(phase*2)*flightScale);
  body.lookAt(ahead.copy(body.position).add(heading));body.rotateZ(-.06);
  canvas.dataset.flightDepth=depth.toFixed(0);
  for(const cloud of driftingClouds){
   const d=cloud.depth*flightScale,size=cloud.size*flightScale;
   const half=d*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect+size;
   const progress=(cloud.seed+elapsed*cloud.speed*flightScale/(half*2))%1;
   cloud.sprite.position.copy(camera.position).addScaledVector(forward,d).addScaledVector(right,(progress*2-1)*half).addScaledVector(up,(cloud.upper?d*.17:-d*(.13+cloud.layer*.03))+Math.sin(elapsed*.14+cloud.seed*10)*18*flightScale);
   cloud.sprite.scale.set(size*(1+.03*Math.sin(elapsed*.12+cloud.seed*8)),size*(cloud.upper?.3:.64),1);
   cloud.sprite.material.opacity=(cloud.upper?.14:.24+cloud.layer*.035)*Math.sin(progress*Math.PI)**2;
   cloud.sprite.material.rotation=Math.sin(elapsed*.035+cloud.seed*6)*.06;
  }
  backdropMaterial.uniforms.time.value=elapsed;
  renderer.clear();renderer.render(screen,screenCamera);renderer.clearDepth();renderer.render(scene,camera);
  canvas.dataset.animationTime=elapsed.toFixed(3);canvas.dataset.renderCount=String(Number(canvas.dataset.renderCount||0)+1);
  frames++;if(now-measuredAt>2000){canvas.dataset.fps=(frames*1000/(now-measuredAt)).toFixed(1);frames=0;measuredAt=now;}
 }

 const setPlaying=value=>{
  playing=value;
  canvas.dataset.playing=String(playing&&!contextLost);
  last=0;
  frames=0;measuredAt=performance.now();
  if(contextLost)return;
  if(needsResize&&document.body.dataset.view==='home')resize();
  renderer.setAnimationLoop(playing?render:null);
  if(!playing&&document.body.dataset.view==='home'&&!document.hidden)render(performance.now());
 };
 let resizeTimer;
 addEventListener('resize',()=>{
  needsResize=true;clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
   if(contextLost||document.body.dataset.view!=='home')return;
   resize();last=0;render(performance.now());
  },150);
 });
 canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();contextLost=true;renderer.setAnimationLoop(null);canvas.dataset.ready='false';
 });
 canvas.addEventListener('webglcontextrestored',()=>{
  contextLost=false;resize();last=0;render(performance.now());canvas.dataset.ready='true';setPlaying(playing);
 });
 render(performance.now());
 canvas.dataset.ready='true';
 console.assert(gltf.animations[0].duration>0&&cloudTexture.image.width>0,'Sky assets must contain the native animation and cloud texture');
 return {setPlaying};
}
