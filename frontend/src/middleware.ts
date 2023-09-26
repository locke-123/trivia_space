import { withAuth } from 'next-auth/middleware';

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/game')) {
        console.log('call middleware - /welcome')
    
        return await withAuth(req);
    }
  }

  // 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능 
export const config = {
    mathcher : ['/game/:path*']
}