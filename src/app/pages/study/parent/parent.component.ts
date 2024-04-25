import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LifecyclehooksComponent } from '../lifecyclehooks/lifecyclehooks.component';

@Component({
  selector: 'ds-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
  standalone: true,
  imports: [LifecyclehooksComponent]
})
export default class ParentComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  count = 0;
  ngOnChanges(changes: SimpleChanges): void {
    console.log('parent ===> ngOnChange');
  }

  ngOnInit(): void {
    console.log('parent ===> ngOnInit');

  }
  ngDoCheck(): void {
    console.log('parent ===> ngDoCheck');

  }
  ngAfterContentInit(): void {
    console.log('parent ===> ngAfterContentInit');
    
  }
  ngAfterContentChecked(): void {
    console.log('parent ===> ngAfterContentChecked');

  }
  ngAfterViewInit(): void {
    console.log('parent ===> ngAfterViewInit');

  }
  ngAfterViewChecked(): void {
    console.log('parent ===> ngAfterViewChecked');

  }
  ngOnDestroy(): void {
    console.log('parent ===> ngOnDestroy');

  }
}
