import NextAuth from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
// export default NextAuth(authOptions).auth;

export async function middleware(req: NextRequest){
  const session = await getToken({req, secret:process.env.SECRET});
  if(!session){
    const requestedPage= req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${ requestedPage }`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [''],
};