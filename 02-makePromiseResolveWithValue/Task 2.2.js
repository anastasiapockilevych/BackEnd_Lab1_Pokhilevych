/**
 * Створіть функцію, яка приймає масив чисел
 * і повертає проміс з сумою цих чисел
 * * @param {number[]} numbers 
 * @returns {Promise<number>}
 */
function sumNumbers(numbers) {
    // Рахуємо суму всіх чисел у масиві
    const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
    
    // Повертаємо суму як виконаний проміс
    return Promise.resolve(sum);
}

// Перевірка:
sumNumbers([1, 2, 3, 4, 5])
    .then(sum => console.log('Тест 2.2:', sum)); // Очікується: 15