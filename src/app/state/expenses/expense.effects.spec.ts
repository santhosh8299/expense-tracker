import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExpenseEffects } from './expense.effects';

describe('ExpenseEffects', () => {
  let actions$: Observable<any>;
  let effects: ExpenseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ExpenseEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
