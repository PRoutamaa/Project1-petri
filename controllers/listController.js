import { renderFile } from "../deps.js";
import * as listService from "../services/listServices.js";
import * as listItemService from "../services/listItemServices.js";
import * as requestUtils from "../Utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };


const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.createList(name);

    return requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.deactivateList(urlParts[2]);

    return await requestUtils.redirectTo("/lists");
};

const viewLists = async () => {
    const data = {
        lists: await listService.findAllActiveLists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        listName: await listService.findById(urlParts[2]),
        list: await listItemService.findAllUncollectedItems(urlParts[2]),
        collectedList: await listItemService.findAllcollectedItems(urlParts[2]),
};

    return new Response(await renderFile("list.eta", data), responseDetails);
};  

const mainPage = async () => {
    const data = {
        listCount: await listService.listCount(),
        itemCount: await listItemService.itemCount(),
    };
    return new Response(await renderFile("mainPage.eta", data), responseDetails);
};

export { addList, deactivateList, viewList, viewLists, mainPage };