declare module "zlibjs/bin/unzip.min.js" {
  export namespace Zlib {
    export class Unzip {
      constructor(data: Array<number> | Uint8Array);
      public getFilenames(): Array<string>;
      public decompress(filename: string): Uint8Array;
    }
  }
}
