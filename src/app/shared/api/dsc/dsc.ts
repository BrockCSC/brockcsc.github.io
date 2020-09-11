import { CscFile } from '../storage/cscFile';
export class Card {
  title: string;
  text: string;
  img: CscFile;
  imgAlt: string;
  position: number;
  $key: string;
}