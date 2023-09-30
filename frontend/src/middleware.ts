import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export async function middleware(req: NextRequestWithAuth) {
    if (req.nextUrl.pathname.startsWith('/game')) {
        console.log('call middleware - /game')
    
        return await withAuth(req);
    }
  }

  // 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능 
export const config = {
    mathcher : ['/game/:path*']
}