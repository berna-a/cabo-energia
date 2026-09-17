// @vitest-environment node
import { convexTest } from "convex-test";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import schema from "../../convex/schema";
import { api, internal } from "../../convex/_generated/api";

const modules=import.meta.glob("../../convex/**/*.ts");
const key="test-only-secret";
const input=()=>({name:"Teste local",phone:"+238 000 0000",client_type:"residencial",source:"test",fields:[{chave:"Poupança",valor:7200}],request_id:crypto.randomUUID(),ingest_key:key});
beforeEach(()=>vi.stubEnv("LEAD_INGEST_KEY",key));
afterEach(()=>vi.unstubAllEnvs());
describe("isolated Convex lead storage",()=>{
  it("persists once on duplicate request and schedules notification atomically",async()=>{
    const t=convexTest(schema,modules);const args=input();
    const one=await t.mutation(api.leads.submit,args);const two=await t.mutation(api.leads.submit,args);
    expect(one.id).toBe(two.id);
    expect(await t.run(ctx=>ctx.db.query("leads").collect())).toHaveLength(1);
    expect(await t.run(ctx=>ctx.db.system.query("_scheduled_functions").collect())).toHaveLength(2);
    const saved=await t.query(internal.leads.verify,{request_id:args.request_id});
    expect(saved?.fields).toEqual(args.fields);expect(saved?.notification_status).toBe("pending");
    expect(saved?.aos_sync_status).toBe("pending");
  });
  it("never mirrors synthetic production checks into the AOS CRM",async()=>{
    const t=convexTest(schema,modules);const args={...input(),name:"TESTE TÉCNICO ARDO — sync"};
    await t.mutation(api.leads.submit,args);
    expect(await t.run(ctx=>ctx.db.system.query("_scheduled_functions").collect())).toHaveLength(1);
    const saved=await t.query(internal.leads.verify,{request_id:args.request_id});
    expect(saved?.aos_sync_status).toBe("skipped_test");
  });
  it("rejects unauthorised calls and malformed input without storing",async()=>{
    const t=convexTest(schema,modules);
    await expect(t.mutation(api.leads.submit,{...input(),ingest_key:"wrong"})).rejects.toThrow("Unauthorized");
    await expect(t.mutation(api.leads.submit,{...input(),phone:"invalid"})).rejects.toThrow("Invalid lead");
    expect(await t.run(ctx=>ctx.db.query("leads").collect())).toHaveLength(0);
  });
  it("rate limits repeated new requests without pretending success",async()=>{
    const t=convexTest(schema,modules);
    for(let i=0;i<5;i++)await t.mutation(api.leads.submit,input());
    await expect(t.mutation(api.leads.submit,input())).rejects.toThrow("Rate limited");
  });
});
