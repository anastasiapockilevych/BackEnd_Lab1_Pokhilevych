// ==================== ЗАВДАННЯ 11.2 ====================
function sendEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) {
                reject(new Error(`Failed to send to ${email}`));
            } else {
                resolve(`Email sent to ${email}`);
            }
        }, 100);
    });
}

/**
 * @param {string[]} emails 
 * @returns {Promise<{sent: number, failed: number, details: object[]}>}
 */
async function sendBulkEmails(emails) {
    // 1. Створюємо масив промісів для відправки листів
    const emailPromises = emails.map(email => sendEmail(email));
    
    // 2. Чекаємо, поки всі спроби відправки завершаться (успішно чи з помилкою)
    const results = await Promise.allSettled(emailPromises);
    
    // 3. Рахуємо статистику
    let sent = 0;
    let failed = 0;
    
    results.forEach(result => {
        if (result.status === 'fulfilled') sent++;
        else failed++;
    });
    
    // 4. Повертаємо звіт
    return {
        sent: sent,
        failed: failed,
        details: results
    };
}

// Перевірка:
const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com'];
sendBulkEmails(emails)
    .then(result => console.log('Тест 11.2:', result));