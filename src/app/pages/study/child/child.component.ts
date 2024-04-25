import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ds-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  standalone: true,

})
export class ChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  ngOnChanges(changes: SimpleChanges): void {
    console.log('grandchild ===> ngOnChange');
  }

  ngOnInit(): void {
    console.log('grandchild ===> ngOnInit');

  }
  ngDoCheck(): void {
    console.log('grandchild ===> ngDoCheck');

  }
  ngAfterContentInit(): void {
    console.log('grandchild ===> ngAfterContentInit');
    
  }
  ngAfterContentChecked(): void {
    console.log('grandchild ===> ngAfterContentChecked');

  }
  ngAfterViewInit(): void {
    console.log('grandchild ===> ngAfterViewInit');

  }
  ngAfterViewChecked(): void {
    console.log('grandchild ===> ngAfterViewChecked');

  }
  ngOnDestroy(): void {
    console.log('grandchild ===> ngOnDestroy');

  }
}
