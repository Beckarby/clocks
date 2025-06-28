import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';

interface BinaryColumn {
  value: number;
  bits: boolean[];
  maxBits: number;
  label: string;
}

@Component({
  selector: 'app-binary-clock',
  imports: [CommonModule],
  templateUrl: './binary-clock.component.html',
  styleUrl: './binary-clock.component.css'
})
export class BinaryClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Binary Clock';

  hoursTens: BinaryColumn = { value: 0, bits: [false, false], maxBits: 2, label: 'H1' };
  hoursUnits: BinaryColumn = { value: 0, bits: [false, false, false, false], maxBits: 4, label: 'H2' };
  minutesTens: BinaryColumn = { value: 0, bits: [false, false, false], maxBits: 3, label: 'M1' };
  minutesUnits: BinaryColumn = { value: 0, bits: [false, false, false, false], maxBits: 4, label: 'M2' };
  secondsTens: BinaryColumn = { value: 0, bits: [false, false, false], maxBits: 3, label: 'S1' };
  secondsUnits: BinaryColumn = { value: 0, bits: [false, false, false, false], maxBits: 4, label: 'S2' };

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateBinaryTime(date);
    });
  }

  private updateBinaryTime(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hStr = this.padZero(hours);
    const mStr = this.padZero(minutes);
    const sStr = this.padZero(seconds);

    this.hoursTens.value = parseInt(hStr.charAt(0));
    this.hoursUnits.bits = this.decimalToBinaryArray(this.hoursTens.value, this.hoursTens.maxBits);

    this.hoursUnits.value = parseInt(hStr.charAt(1));
    this.hoursUnits.bits = this.decimalToBinaryArray(this.hoursUnits.value, this.hoursUnits.maxBits);

    this.minutesTens.value = parseInt(mStr.charAt(0));
    this.minutesTens.bits = this.decimalToBinaryArray(this.minutesTens.value, this.minutesTens.maxBits);

    this.minutesUnits.value = parseInt(mStr.charAt(1));
    this.minutesUnits.bits = this.decimalToBinaryArray(this.minutesUnits.value, this.minutesUnits.maxBits);

    this.secondsTens.value = parseInt(sStr.charAt(0));
    this.secondsTens.bits = this.decimalToBinaryArray(this.secondsTens.value, this.secondsTens.maxBits);

    this.secondsUnits.value = parseInt(sStr.charAt(1));
    this.secondsUnits.bits = this.decimalToBinaryArray(this.secondsUnits.value, this.secondsUnits.maxBits);
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  // Convert a decimal to a binary array of booleans
  // where the array is ordered from least significant bit to most significant bit
  private decimalToBinaryArray(decimal: number, numBits: number): boolean[] {
    let binaryString = decimal.toString(2);
    while (binaryString.length < numBits) {
      binaryString = '0' + binaryString; // Pad with leading zeros
    }

    const bits = binaryString.split('').map(bit => bit === '1');
    return bits;
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); 
    }
  }

}
