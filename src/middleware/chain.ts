import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./middlewareType";

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export const chain = (
  functions: MiddlewareFactory[],
  index = 0
): CustomMiddleware => {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response;
  };
};
