/**
 * Створіть функцію-обгортку для синхронних функцій,
 * яка перехоплює помилки та повертає проміс
 * * @param {Function} fn - Синхронна функція
 * @param {any[]} args - Аргументи для функції
 * @returns {Promise<any>}
 */
function tryCatchPromise(fn, ...args) {
    try {
        // Пробуємо викликати функцію з переданими аргументами
        const result = fn(...args);
        // Якщо все добре, повертаємо успішний проміс
        return Promise.resolve(result);
    } catch (error) {
        // Якщо сталася помилка, перехоплюємо її і повертаємо проміс із помилкою
        return Promise.reject(error);
    }
}

// Перевірка:
const goodFunction = (a, b) => a + b;
const badFunction = () => { throw new Error('Oops!'); };

tryCatchPromise(goodFunction, 5, 3)
    .then(result => console.log('Тест 2.7a (успіх):', result)) // 8
    .catch(error => console.log('  Помилка:', error.message));

tryCatchPromise(badFunction)
    .then(result => console.log('  Не повинно виконатися'))
    .catch(error => console.log('Тест 2.7b (помилка):', error.message)); // 'Oops!'