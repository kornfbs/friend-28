import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  //padungsak.rvsd@gmail.com

  const user = await supabase.auth.getUser();
  const isAdmin = user.error ? false : user.data.user?.email == 'padungsak.rvsd@gmail.com' ? true : false;
  
  if (request.nextUrl.pathname.startsWith('/admin') && isAdmin) {
    return NextResponse.redirect(new URL('/', request.url))
  }


  return response
}

// { user['data']['user']['identity'][0]['email']}

// USER: {
//   data: {
//     user: {
//       id: '4641bc5b-fcca-4802-91b5-0faeac335f03',
//         aud: 'authenticated',
//           role: 'authenticated',
//             email: 'kornfbs@outlook.com',
//               email_confirmed_at: '2024-05-07T04:42:02.476795Z',
//                 phone: '',
//                   confirmation_sent_at: '2024-05-07T04:41:45.703043Z',
//                     confirmed_at: '2024-05-07T04:42:02.476795Z',
//                       last_sign_in_at: '2024-05-07T04:45:03.540785Z',
//                         app_metadata: { provider: 'email', providers: ['email'] },
//       user_metadata: {
//         email: 'kornfbs@outlook.com',
//           email_verified: false,
//             phone_verified: false,
//               sub: '4641bc5b-fcca-4802-91b5-0faeac335f03'
//       },
//       identities: [
//         {
//           identity_id: '0df8a08d-6a87-4ea1-a167-a97630593917',
//           id: '4641bc5b-fcca-4802-91b5-0faeac335f03',
//           user_id: '4641bc5b-fcca-4802-91b5-0faeac335f03',
//           identity_data: {
//             email: 'kornfbs@outlook.com',
//             email_verified: false,
//             phone_verified: false,
//             sub: '4641bc5b-fcca-4802-91b5-0faeac335f03'
//           },
//           provider: 'email',
//           last_sign_in_at: '2024-05-07T04:40:29.298147Z',
//           created_at: '2024-05-07T04:40:29.298201Z',
//           updated_at: '2024-05-07T04:40:29.298201Z',
//           email: 'kornfbs@outlook.com'
//         }
//       ],
//         created_at: '2024-05-07T04:40:29.294216Z',
//           updated_at: '2024-05-07T04:45:03.543069Z',
//             is_anonymous: false
//     }
//   },
//   error: null
// }