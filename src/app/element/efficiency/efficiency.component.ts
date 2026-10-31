import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'bb-efficiency',
  styleUrl: './efficiency.component.scss',
  templateUrl: './efficiency.component.html',
})
export class EfficiencyComponent {

  readonly value = input.required<number>();

  readonly bullets = computed(() => {
    const sz = 10;
    const thresh = this.value() * sz;
    const ret = new Array(sz);
    for(let i = 0; i < sz; ++i) {
      ret[i] = (i + 0.5) <= thresh;
    }
    return ret;
  });
}
