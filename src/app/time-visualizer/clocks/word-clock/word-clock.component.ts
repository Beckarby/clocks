import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';
import { CommonModule } from '@angular/common';

interface Letter {
  char: string;
  isActive: boolean;
}

@Component({
  selector: 'app-word-clock',
  imports: [CommonModule],
  templateUrl: './word-clock.component.html',
  styleUrl: './word-clock.component.css'
})
export class WordClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Word Clock';

  wordGrid: Letter[][] = [];

  // this probably could be improved but right now i dont want to think
  private layoutConfig = [
    // Row 1
    { text: "IT", row: 0, col: 0, length: 2 },
    { text: "IS", row: 0, col: 3, length: 2 },
    { text: "A", row: 0, col: 6, length: 1 },
    { text: "QUARTER", row: 0, col: 8, length: 7 },

    //Row 2
    { text: "TWENTY", row: 1, col: 0, length: 6 },
    { text: "FIVE", row: 1, col: 7, length: 4 },
    { text: "PAST", row: 1, col: 12, length: 4 },

    // Row 3
    { text: "HALF", row: 2, col: 0, length: 4 },
    { text: "TO", row: 2, col: 5, length: 2 },
    { text: "TEN", row: 2, col: 8, length: 3 },
    { text: "OCLOCK", row: 2, col: 12, length: 6 },

    // ROW 4 (Hours 1-6)
    { text: "ONE", row: 3, col: 0, length: 3 },
    { text: "TWO", row: 3, col: 4, length: 3 },
    { text: "THREE", row: 3, col: 8, length: 5 },

    // Row 5 (Hours 7-12)
    { text: "FOUR", row: 4, col: 0, length: 4 },
    { text: "FIVE", row: 4, col: 5, length: 4 },
    { text: "SIX", row: 4, col: 10, length: 3 },

    // Row 6
    { text: "SEVEN", row: 5, col: 0, length: 5 },
    { text: "EIGHT", row: 5, col: 6, length: 5 },
    { text: "NINE", row: 5, col: 12, length: 4 },

    // Row 7
    { text: "TEN", row: 6, col: 0, length: 3 },
    { text: "ELEVEN", row: 6, col: 4, length: 6 },
    { text: "TWELVE", row: 6, col: 11, length: 6 }
  ];

  private maxRows = 7;
  private maxCols = 18;

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) {
    this.initializeWordGrid();
  }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateWordClock(date);
    });
  }

  private initializeWordGrid(): void {

    // Initialize the word grid with empty letters
    for (let r = 0; r < this.maxRows; r++) {
      this.wordGrid[r] = [];
      for (let c = 0; c < this.maxCols; c++) {
        this.wordGrid[r][c] = { char: ' ', isActive: false }; 
      }
    }
    // Fill the grid with the words from the layout configuration
    this.layoutConfig.forEach(word => {
      for (let i = 0; i < word.length; i++) {
        const char = word.text.charAt(i);
        if (word.row < this.maxRows && (word.col + i) < this.maxCols) {
          this.wordGrid[word.row][word.col + i].char = char;
        }
      }
    });
  }

  private resetWordGrid(): void {
    this.wordGrid.forEach(row => {
      row.forEach(letter => (letter.isActive = false));
    })
  }

  private activeWord(wordText: string): void {
    const wordInfo = this.layoutConfig.find(word => word.text === wordText);
    if (wordInfo) {
      for (let i = 0; i < wordInfo.length; i++) {
        if (wordInfo.row < this.maxRows && (wordInfo.col + i) < this.maxCols) {
          this.wordGrid[wordInfo.row][wordInfo.col + i].isActive = true;
        }
      }
    }
  }

  private updateWordClock(date: Date): void {
    this.resetWordGrid();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    this.activeWord("IT");
    this.activeWord("IS");

    const roundedMinutes = Math.round(minutes / 5) * 5; // Round to nearest 5 minutes

    let displayHour = hours;

    switch (roundedMinutes) {
      case 0:
      case 60:
        this.activeWord("OCLOCK");
        displayHour = hours;
        break;
      case 5:
        this.activeWord("FIVE");
        this.activeWord("PAST");
        break;
      case 10:
        this.activeWord("TEN");
        this.activeWord("PAST");
        break;
      case 15:
        this.activeWord("A");
        this.activeWord("QUARTER");
        this.activeWord("PAST");
        break;
      case 20:
        this.activeWord("TWENTY");
        this.activeWord("PAST");
        break;
      case 25:
        this.activeWord("TWENTY");
        this.activeWord("FIVE");
        this.activeWord("PAST");
        break;
      case 30:
        this.activeWord("HALF");
        this.activeWord("PAST");
        break;
      case 35:
        this.activeWord("TWENTY");
        this.activeWord("FIVE");
        this.activeWord("TO");
        displayHour = (hours + 1) % 24;
        break;
      case 40:
        this.activeWord("TWENTY");
        this.activeWord("TO");
        displayHour = (hours + 1) % 24;
        break;
      case 45:
        this.activeWord("A");
        this.activeWord("QUARTER");
        this.activeWord("TO");
        displayHour = (hours + 1) % 24;
        break;
      case 50:
        this.activeWord("TEN");
        this.activeWord("TO");
        displayHour = (hours + 1) % 24;
        break;
      case 55:
        this.activeWord("FIVE");
        this.activeWord("TO");
        displayHour = (hours + 1) % 24;
        break;
    }

    let displayHour12 = displayHour % 12;
    if (displayHour12 === 0) displayHour12 = 12;

    const hourWords: { [key: number]: string } = {
      1: "ONE",
      2: "TWO",
      3: "THREE",
      4: "FOUR",
      5: "FIVE",
      6: "SIX",
      7: "SEVEN",
      8: "EIGHT",
      9: "NINE",
      10: "TEN",
      11: "ELEVEN",
      12: "TWELVE"
    };
    this.activeWord(hourWords[displayHour12]); 
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

}
