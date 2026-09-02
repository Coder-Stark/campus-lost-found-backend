import { getItems, createItem } from "./item.service.js";

export const getItemsController = async (req, res, next) => {
  try{
    const items = await getItems();

    res.status(200).json({
      success: true,
      data: items,
    });

  }catch(error){
    next(error);
  }
};


export const createItemController = async (req, res, next) => {
  try{
    const item = await createItem(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });

  }catch(error){
    next(error);
  }
};