import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from '../assets/vendor/three/three.module.js';
const source=readFileSync(new URL('../home-sky.js',import.meta.url),'utf8');
const flight=source.slice(source.indexOf('  const phase='),source.indexOf('  body.lookAt('));
const sampleCode=new Function('THREE','elapsed','camera','flightScale','body','right','up','forward','heading',flight+';return {point:body.position.clone(),heading:heading.clone().normalize(),depth};');
for(const aspect of [1440/900,390/844]){
 const camera=new THREE.PerspectiveCamera(38,aspect,1,20000);
 const frustum=new THREE.Frustum().setFromProjectionMatrix(camera.projectionMatrix);
 const scale=Math.max(1,.9/aspect);
 const sample=t=>sampleCode(THREE,t,camera,scale,new THREE.Object3D(),new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,-1),new THREE.Vector3());
 const first=sample(0),repeat=sample(2*Math.PI/.4);
 assert(first.point.distanceTo(repeat.point)<1e-6&&first.heading.dot(repeat.heading)>.999999,'Flight must loop without a jump');
 for(const t of [Math.PI/(2*.4),3*Math.PI/(2*.4)])assert(!frustum.intersectsSphere(new THREE.Sphere(sample(t).point,300)),'Entire whale must leave each edge');
 assert(sample(0).depth/sample(Math.PI/.4).depth>5,'Preserve close and distant passes');
}
const main=readFileSync(new URL('../script.js',import.meta.url),'utf8');
assert(!main.includes('Quantization-Aware Training for Reasoning LLMs')&&!main.includes('面向推理型大语言模型的量化感知训练'),'Removed research must stay absent in both languages');
const coordinator=main.slice(main.indexOf('const skyCanvas ='),main.indexOf('const activateView ='));
function page({view='home',reduced=false,saveData=false,hidden=false}={}){
 const callbacks=new Map(),nodes=new Map();let queued=0;
 const node=id=>{if(!nodes.has(id))nodes.set(id,{hidden:false,textContent:'',dataset:{},setAttribute(){},addEventListener(type,fn){callbacks.set(id+':'+type,fn);}});return nodes.get(id);};
 const document={body:{dataset:{view}},documentElement:{lang:'en'},hidden,getElementById:node,addEventListener(){}};
 const window={requestIdleCallback(){queued++;},setTimeout(){queued++;}};
 const motion={matches:reduced,addEventListener(){}};
 const update=new Function('document','window','navigator','prefersReducedMotion','assetVersion',coordinator+';return updateSkyBackground;')(document,window,{connection:{saveData}},motion,'test');
 return {update,node,callbacks,get queued(){return queued;}};
}
for(const options of [{view:'research'},{reduced:true},{saveData:true},{hidden:true}]){
 const p=page(options);p.update();assert.equal(p.queued,0,'Inactive, reduced-motion and data-saving pages must not load 3D assets');
}
const p=page({saveData:true});p.update();p.callbacks.get('sky-motion-toggle:click')();assert.equal(p.queued,1,'Explicit play should enable a data-saving page');
const model=readFileSync(new URL('../assets/sky/blue-whale.glb',import.meta.url));
assert.equal(model.toString('utf8',0,4),'glTF');
const gltf=JSON.parse(model.toString('utf8',20,20+model.readUInt32LE(12)).trim());
assert(gltf.animations.length>0&&gltf.animations[0].samplers.length>0,'Keep the original animated whale');
for(const buffer of gltf.buffers)assert(!buffer.uri,'Model buffers must remain self-contained');
console.log('PASS: fixed flight, full exits, near/far depth, lazy loading, reduced motion, data saver, native model animation.');
