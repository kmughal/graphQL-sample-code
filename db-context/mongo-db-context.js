module.exports = (mPool) => {
  return {
    getUserHistoryByKey(id) {
      return mPool.collection("users").findOne({
        userId: id
      });
    }
  };
};