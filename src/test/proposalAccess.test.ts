import { afterEach, describe, expect, it, vi } from 'vitest';
import middleware from '../../middleware';

afterEach(()=>vi.unstubAllEnvs());
describe('internal proposals server gate',()=>{
  it('fails closed without a configured password',async()=>{
    vi.stubEnv('PROPOSAL_PASSWORD','');
    const response=await middleware(new Request('https://example.test/proposta'));
    expect(response.status).toBe(401);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });
  it('rejects incorrect and malformed credentials',async()=>{
    vi.stubEnv('PROPOSAL_PASSWORD','test-only-password');
    for(const authorization of ['Basic !!!',`Basic ${btoa('cabo:wrong')}`]){
      expect((await middleware(new Request('https://example.test/proposta',{headers:{authorization}}))).status).toBe(401);
    }
  });
  it('accepts the configured credentials without allowing indexing or caching',async()=>{
    vi.stubEnv('PROPOSAL_PASSWORD','test-only-password');
    const response=await middleware(new Request('https://example.test/proposta',{headers:{authorization:`Basic ${btoa('cabo:test-only-password')}`}}));
    expect(response.headers.get('x-middleware-next')).toBe('1');
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
});
