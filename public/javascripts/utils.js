const moment = require("moment");
const users = [];
module.exports = {
  formatMessage: (username, text) => {
    return {
      username,
      text,
      time: moment().format("h:mm a"),
    };
  },
  userJoin: (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
  },
  getCurrentUser: (id) => {
    return users.find((user) => user.id === id);
  },
};
