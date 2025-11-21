import { Component } from '@angular/core';
import { Test } from '../test/test';

@Component({
  selector: 'app-main',
  imports: [Test],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
