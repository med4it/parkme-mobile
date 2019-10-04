import moment from "moment";

export const getDataFromDoc = doc => ({
  id: doc.id,
  ...doc.data()
});

export const formatDate = date =>
  moment(date)
    .utcOffset("+0100")
    .format("YYYY-MM-DD HH:mm");
