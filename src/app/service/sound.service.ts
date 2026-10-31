import { Service } from '@angular/core';

@Service()
export class SoundService {

    bullshit() {
        if (typeof navigator.vibrate === 'function') {
            navigator.vibrate(500);
        }
    }
}
