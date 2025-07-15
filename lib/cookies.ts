import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, options: {
   httpOnly?: boolean;
   secure?: boolean;
   sameSite?: 'strict' | 'lax' | 'none';
   maxAge?: number;
}) {
   const cookieStore = await cookies();
   cookieStore.set({
      name,
      value,
      ...options
   });
}

export async function deleteCookie(name: string) {
   const cookieStore = await cookies();
   cookieStore.delete(name);
}

export async function getCookie(name: string) {
   const cookieStore = await cookies();
   return cookieStore.get(name);
} 