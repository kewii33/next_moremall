import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./middlewareType";
import { updateSession } from "@/utils/supabase/middleware";

export const updateSessionMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    await updateSession(request);
    return middleware(request, event, NextResponse.next());
  };
};
