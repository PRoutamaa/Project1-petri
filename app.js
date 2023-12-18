import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as requestUtils from "./Utils/requestUtils.js";
import * as listController from "./controllers/listController.js";
import * as listItemController from "./controllers/listItemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.mainPage();
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists();
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await listItemController.markAsCollected(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await listItemController.addItemToList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else {
    return requestUtils.redirectTo("/");
  }
};

serve(handleRequest, { port: 7777 });
