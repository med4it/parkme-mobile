export const getDataFromDoc = doc => ({
  id: doc.id,
  ...doc.data()
});
