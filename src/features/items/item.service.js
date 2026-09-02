import Item from "./item.model.js";


//for getting list of all lost/found notes
export const getItems = async() => {
  return Item.find().sort({createdAt: -1});
};

//for creating something lost/found notes
export const createItem = async (itemData) => {
  return Item.create(itemData);
};
