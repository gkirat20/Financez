const express = require('express');
const app = express();

// Importing routes
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');
const userProfilesRoutes = require('./routes/userProfiles');
const rolesRoutes = require('./routes/roles');
const accountRolesRoutes = require('./routes/accountRoles');
const dataListingsRoutes = require('./routes/dataListings');
const collaborationsRoutes = require('./routes/collaborations');
const collaborationMembersRoutes = require('./routes/collaborationMembers');
const notificationsRoutes = require('./routes/notifications');
const auditLogsRoutes = require('./routes/auditLogs');
const dataInsightsRoutes = require('./routes/dataInsights');
const feedbacksRoutes = require('./routes/feedbacks');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up routes
app.use('/api/accounts', accountsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/userProfiles', userProfilesRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/accountRoles', accountRolesRoutes);
app.use('/api/dataListings', dataListingsRoutes);
app.use('/api/collaborations', collaborationsRoutes);
app.use('/api/collaborationMembers', collaborationMembersRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/auditLogs', auditLogsRoutes);
app.use('/api/dataInsights', dataInsightsRoutes);
app.use('/api/feedbacks', feedbacksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Setting up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
