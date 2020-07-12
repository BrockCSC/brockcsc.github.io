import { CscFile } from 'app/shared/api';

export class Exec {
  $key: string;
  name: string;
  title: string;
  description: string;
  isCurrentExec: boolean;
  image: CscFile;
}
