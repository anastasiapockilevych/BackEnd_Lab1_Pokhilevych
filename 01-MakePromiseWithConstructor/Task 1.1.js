/**
 * Створіть проміс, який resolve або reject залежно від параметра
 * @param {boolean} itShouldResolve - Чи повинен проміс успішно виконатися
 * @returns {Promise<string, string>}
 */
function makePromiseWithConstructor(itShouldResolve) {
    return new Promise((resolve, reject) => {
        if (itShouldResolve === true) {
            resolve('Success!');
        } else {
            reject('Failed!');
        }
    });
}

// Перевірка:
makePromiseWithConstructor(true)
    .then(result => console.log('Тест 1.1 (resolve):', result))
    .catch(error => console.log('  Помилка:', error));

makePromiseWithConstructor(false)
    .then(result => console.log('  Не повинно виконатися'))
    .catch(error => console.log('Тест 1.1 (reject):', error));