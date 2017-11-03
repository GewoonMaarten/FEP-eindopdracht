export class Afbeelding {
  file?:File;
  naam:string;
  url:string;

  constructor(file:File) {
    this.file = file;
  }

}
