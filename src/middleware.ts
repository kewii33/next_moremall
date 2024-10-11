import { chain } from "./middleware/chain";
import { routerHandlerMiddleware } from "./middleware/routeHandlerMiddleware";
import { updateSessionMiddleware } from "./middleware/updateSessionMiddleware";

const middlewareList = [updateSessionMiddleware, routerHandlerMiddleware];

export default chain(middlewareList);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
