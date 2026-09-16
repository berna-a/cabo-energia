import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "../lib/leadClient";
import { leadSchema, validPhone } from "../../shared/leadValidation";

afterEach(() => vi.unstubAllGlobals());
const lead = { nome:"Teste de validação",telemovel:"+238 000 0001",tipo:"residencial",origem:"test" };
describe("durable lead intake", () => {
  it("does not call email acceptance successful persistence", async () => {
    vi.stubGlobal("fetch",vi.fn().mockResolvedValue({ok:true,json:async()=>({ok:true,emailed:true})}));
    expect(await submitLead(lead)).toBe(false);
  });
  it("reuses request id on an uncertain retry, preserving simulator fields", async () => {
    const fetcher=vi.fn().mockRejectedValueOnce(new Error("network")).mockResolvedValue({ok:true,json:async()=>({ok:true,stored:true})});
    vi.stubGlobal("fetch",fetcher);
    const input={...lead,origem:"retry-test",camposExtra:[{chave:"Poupança estimada",valor:7200}]};
    expect(await submitLead(input)).toBe(false);
    expect(await submitLead(input)).toBe(true);
    const bodies=fetcher.mock.calls.map(c=>JSON.parse(c[1].body));
    expect(bodies[0].request_id).toBe(bodies[1].request_id);
    expect(bodies[1].fields).toEqual(input.camposExtra);
  });
  it("rejects invalid phones and unbounded payloads", () => {
    expect(validPhone("abcdefghi")).toBe(false);
    expect(validPhone("+++++++ ")).toBe(false);
    expect(validPhone("+238 995 41 81")).toBe(true);
    expect(leadSchema.safeParse({name:"A",phone:"123",client_type:"wrong",source:"x",request_id:crypto.randomUUID()}).success).toBe(false);
  });
});
