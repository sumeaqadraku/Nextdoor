const db = require('./src/models');

db.sequelize.sync({ alter: true }) // or { force: true } for full drop & recreate
  .then(() => {
    console.log('Database synced successfully ✅');
  })
  .catch(err => {
    console.error('Failed to sync database ❌', err);
  });