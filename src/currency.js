const convertCurrency = {
    formatCurrency: function (num) {
        return Number(num).toFixed(2).toLocaleString() + ' ';
    }
}

export default convertCurrency;