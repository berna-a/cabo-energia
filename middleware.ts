import { next } from '@vercel/functions';

// A server-side gate, not a client-side password screen. Fail closed when unset.
export default async function middleware(request: Request) {
  const password=process.env.PROPOSAL_PASSWORD;
  const authorization=request.headers.get('authorization')||'';
  let valid=false;
  if(password && authorization.startsWith('Basic ')){
    try {
      const actual=new TextEncoder().encode(atob(authorization.slice(6)));
      const expected=new TextEncoder().encode(`cabo:${password}`);
      const [a,b]=await Promise.all([crypto.subtle.digest('SHA-256',actual),crypto.subtle.digest('SHA-256',expected)]);
      const av=new Uint8Array(a),bv=new Uint8Array(b);let difference=0;
      for(let i=0;i<av.length;i++)difference|=av[i]^bv[i];
      valid=difference===0;
    }catch{valid=false;}
  }
  if(!valid)return new Response('Área interna Cabo Energia. Autenticação necessária.',{status:401,headers:{'WWW-Authenticate':'Basic realm="Cabo Energia", charset="UTF-8"','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'}});
  return next({headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}
export const config={runtime:'nodejs',matcher:['/proposta/:path*','/assets/PropostasPage(.*)']};
