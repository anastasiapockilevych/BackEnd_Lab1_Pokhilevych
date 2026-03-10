// ==================== ЗАВДАННЯ 21.4 ====================
/**
 * Створіть чергу з обмеженням часу виконання
 * Якщо завдання не виконується за заданий час - скасуйте його
 */
class TimedQueue {
    constructor(timeout = 5000) {
        this.queue = [];
        this.timeout = timeout;
        this.processing = false;
    }

    add(promiseFactory) {
        this.queue.push(promiseFactory);
        if (!this.processing) {
            this.process();
        }
    }

    async process() {
        this.processing = true;
        
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            
            try {
                // Створюємо проміс-таймер, який завжди завершується помилкою через заданий час
                const timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout limit exceeded'));
                    }, this.timeout);
                });
                
                // Влаштовуємо "перегони" між реальним завданням і таймером-вбивцею
                await Promise.race([task(), timeoutPromise]);
            } catch (error) {
                // Якщо таймер виграв, ми потрапимо сюди
                console.log(`  Task cancelled: ${error.message}`);
            }
        }
        
        this.processing = false;
    }
}

// Перевірка:
const queue4 = new TimedQueue(500); // Ліміт часу - 500 мілісекунд

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        console.log('  Fast task completed'); // Це встигне за 200мс
        resolve();
    }, 200);
}));

queue4.add(() => new Promise(resolve => {
    setTimeout(() => {
        // Це займе 1000мс, тому Promise.race відхилить його раніше (на 500мс)
        // Примітка: в реальному JS console.log все одно може вивестись пізніше, 
        // але сам проміс у черзі вже буде скасовано.
        console.log('  This should not print (or prints too late)');
        resolve();
    }, 1000);
}));

console.log('Тест 21.4: Черга з таймаутом');