import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log("middleware");

  // 로그인 상태 확인, 쿠키 사용
  let isLoggedIn = request.cookies.get("token")?.value;

  // console.log("isLoggedIn", isLoggedIn);
  // console.log("pathname", pathname);
  // 로그인 페이지 접근 시 로그인 상태에 따라 처리
  if (pathname === "/login") {
    if (isLoggedIn) {
      // console.log("로그인상태입니다");
      return NextResponse.redirect(new URL("/pay", request.url));
    } else {
      // console.log("로그인상태가 아닙니다");
      return NextResponse.next();
    }
  }

  // 로그인 상태가 아니고 로그인 페이지가 아닌 다른 페이지에 접근 시 /login으로 리디렉션
  if (!isLoggedIn && pathname !== "/login") {
    // console.log(
    //   "로그인 상태가 아니고 로그인 페이지가 아닌 다른 페이지에 접근 시 /login으로 리디렉션"
    // );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
