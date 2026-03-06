// types/three-obj.d.ts
declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Group, LoadingManager } from 'three';
  import { Loader } from 'three/src/loaders/Loader';

  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: string): Group;
  }
}
