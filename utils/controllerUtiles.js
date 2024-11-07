exports.generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.createDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};