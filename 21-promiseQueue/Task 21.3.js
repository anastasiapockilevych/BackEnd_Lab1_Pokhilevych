// ==================== ЗАВДАННЯ 21.3 ====================
/**
 * Створіть чергу з можливістю паузи та відновлення
 */
class ControllableQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.paused = false;
    }

    add(promiseFactory) {
        // Додаємо завдання в чергу
        this.queue.push(promiseFactory);
        
        // Починаємо обробку, тільки якщо черга не обробляється І не на паузі
        if (!this.processing && !this.paused) {
            this.process();
        }
    }

    pause() {
        // Ставимо на паузу (наступні завдання не почнуться)
        this.paused = true;
    }

    resume() {
        // Знімаємо з паузи
        this.paused = false;
        
        // Якщо є завдання в черзі і ми зараз нічого не обробляємо - запускаємо
        if (!this.processing && this.queue.length > 0) {
            this.process();
        }
    }

    async process() {
        this.processing = true;
        
        // Цикл працює, поки є завдання І поки НЕ натиснута пауза
        while (this.queue.length > 0 && !this.paused) {
            const task = this.queue.shift(); // Беремо перше завдання
            await task(); // Чекаємо його виконання
        }
        
        this.processing = false;
    }
}

// Перевірка:
const queue3 = new ControllableQueue();

queue3.add(() => Promise.resolve(console.log('  Task A')));
queue3.add(() => Promise.resolve(console.log('  Task B')));

setTimeout(() => {
    queue3.pause();
    console.log('  Queue paused');
}, 100);

setTimeout(() => {
    queue3.add(() => Promise.resolve(console.log('  Task C')));
    queue3.resume();
    console.log('  Queue resumed');
}, 500);

console.log('Тест 21.3: Контрольована черга');