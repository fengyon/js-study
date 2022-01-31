const hadDead = (() => {
    let ranCount = 0;
    const limit = 100000;
    return (str) => {
        if (ranCount > limit) {
            throw Error(`超出执行次数( ${limit} )：` + str)
        } else {
            ranCount++
            return true
        }
    }
})();
const createHadDead = (limit) => {
    let ranCount = 0;
    return (str) => {
        if (ranCount++ > limit) {
            throw Error(`超出执行次数( ${limit} )：` + str)
        } else {
            return true
        }
    }
}
module.exports = {
    hadDead,
    createHadDead
}