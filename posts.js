// Use https://gorest.co.in/ REST API for Testing and Prototyping
// Write function to fetch data from https://gorest.co.in/public/v2/posts
// This function should print in console array of objects with the following structure {id, title, user_id}
// and handle possible errors 

async function fetchGoRestPosts() {
    try {
        // 1. Робимо запит за вказаною в завданні URL
        const response = await fetch('https://gorest.co.in/public/v2/posts');

        // 2. Перевіряємо, чи успішна відповідь сервера (наприклад, чи немає статусу 500)
        if (!response.ok) {
            // Якщо сервер зламався (500) або нас заблокував (429), ми кидаємо помилку
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // 3. Зчитуємо дані
        const data = await response.json();

        // 4. Форматуємо масив суворо за вимогою: {id, title, user_id}
        const formattedPosts = data.map(post => {
            return {
                id: post.id,
                title: post.title,
                user_id: post.user_id
            };
        });

        // 5. Виводимо результат
        console.log(formattedPosts);

    } catch (error) {
        // 6. Обробляємо помилки (як того вимагає останній рядок завдання)
        console.error('Не вдалося отримати пости:', error.message);
    }
}

fetchGoRestPosts();