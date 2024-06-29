import { Observable } from 'rxjs';
import { Card } from './dsc';

export abstract class DSCApiService {
  abstract getCards(): Observable<Card[]>;
  abstract addCard(card: Card): Promise<Card>;
  abstract removeCard(card: Card): Promise<void>;
  abstract updateCard(key: string, value: Card): Promise<void>;
}
