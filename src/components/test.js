// var test = 0;
var requestApi = async function requestApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const r = Math.random();
            if (r <= 0.6) {
                resolve({
                    code: 0,
                    message: "ok"
                        // test
                });
            } else if (r <= 0.8) {
                reject({
                    code: -1,
                    message: "余额不足"
                        // test
                });
            } else {
                reject({
                    code: -2,
                    message: "累积转账金额超过限制"
                        // test
                });
            }
            // test++;
        }, 1000);
    });
};
export default requestApi;