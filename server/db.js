const { Sequelize } = require('sequelize');

// Database initialization
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Choose dialect (mysql, postgres, sqlite, etc.)
});

// Define schema for conversations table
const Conversations = sequelize.define('Conversations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Define schema for leads table
const Leads = sequelize.define('Leads', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Define schema for payments table
const Payments = sequelize.define('Payments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Define schema for subscriptions table
const Subscriptions = sequelize.define('Subscriptions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    plan: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

// Sync the models with the database
const syncDatabase = async () => {
    await sequelize.sync({ force: true }); // Caution with force: true, it drops existing tables
    console.log('Database & tables created!');
};

module.exports = { sequelize, syncDatabase, Conversations, Leads, Payments, Subscriptions };