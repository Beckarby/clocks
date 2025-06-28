import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../core/services/time.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-time-controller',
  imports: [],
  templateUrl: './time-controller.component.html',
  styleUrls: ['./time-controller.component.css']
})
export class TimeControllerComponent implements OnInit{
    currentDisplayTime$: Observable<string>;

    constructor(private timeService: TimeService) {
        this.currentDisplayTime$ = this.timeService.currentTime$.pipe(
            map(date => date.toLocaleTimeString('en-US', { hour12: false }))
        );
    }

    ngOnInit(): void {
        
    }

    setUpdateInterval(ms: number): void {
        this.timeService.setInterval(ms);
    }

}
