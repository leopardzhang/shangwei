const year = new Date().getFullYear();
const month = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
const day = new Date().getDate() >= 10 ? new Date().getDate() : `0${new Date().getDate()}`;

const folderName = `${year}.${month}.${day}`;

module.exports = { folderName };
