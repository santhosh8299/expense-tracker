import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, input } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'ds-lifecyclehooks',
  templateUrl: './lifecyclehooks.component.html',
  styleUrl: './lifecyclehooks.component.css',
  standalone: true,
  imports: [ChildComponent]
})
export class LifecyclehooksComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  ngOnChanges(changes: SimpleChanges): void {
    console.log('child ===> ngOnChange');
  }

  ngOnInit(): void {
    console.log('child ===> ngOnInit');

  }
  ngDoCheck(): void {
    console.log('child ===> ngDoCheck');

  }
  ngAfterContentInit(): void {
    console.log('child ===> ngAfterContentInit');
    
  }
  ngAfterContentChecked(): void {
    console.log('child ===> ngAfterContentChecked');

  }
  ngAfterViewInit(): void {
    console.log('child ===> ngAfterViewInit');

  }
  ngAfterViewChecked(): void {
    console.log('child ===> ngAfterViewChecked');

  }
  ngOnDestroy(): void {
    console.log('child ===> ngOnDestroy');

  }
  testInput = input()
}
