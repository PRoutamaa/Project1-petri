import * as listItemService from "../services/listItemServices.js";
import * as requestUtils from "../Utils/requestUtils.js";

const addItemToList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const itemName = formData.get("name");
    await listItemService.addItemToList(urlParts[2], itemName);
    
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
  };
  
  const markAsCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listItemService.markAsCollected(urlParts[2], urlParts[4]);
  
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
  };

export { addItemToList, markAsCollected };