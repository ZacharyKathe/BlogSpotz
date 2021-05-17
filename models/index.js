const User = require('./User');
const Project = require('./Project');
const Posts = require('./Posts');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Posts.belongsTo(Project, {
  foreignKey: 'projectId',
  onDelete: "CASCADE"
})
Project.hasMany(Posts, {
  foreignKey: 'projectId',
})
module.exports = { User, Project, Posts };
