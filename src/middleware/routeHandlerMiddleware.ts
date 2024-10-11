import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./middlewareType";
import { serverSupabase } from "@/utils/supabase/server";

export const routerHandlerMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const supabase = serverSupabase();
    const { data } = await supabase.auth.getUser();

    if (!data.user && request.nextUrl.pathname.startsWith("/mypage")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return middleware(request, event, NextResponse.next());
  };
};
