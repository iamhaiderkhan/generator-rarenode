
// Password = admin@adqore123
module.exports = {
    up: queryInterface => queryInterface.bulkInsert('users', [{
        first_name: "Haider",
        last_name: "Khan",
        email: 'this.haiderkhan@gmail.com',
        password: '2GahU1jLcxPUqfZPfEhLYJbMla0AAGKgbiAd3Vk7OJg=', // password is `haider@k_!./*`
        created_at: new Date(),
        updated_at: new Date(),
    }], {}),

    down: queryInterface => queryInterface.bulkDelete('users', [{
        first_name: "Haider",
        last_name: "Khan",
        email: 'this.haiderkhan@gmail.com',
        password: '2GahU1jLcxPUqfZPfEhLYJbMla0AAGKgbiAd3Vk7OJg=',
        created_at: new Date(),
        updated_at: new Date(),
    }], {}),
};
