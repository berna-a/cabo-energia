import { describe, it, expect } from 'vitest';
import { CATALOG, estimateSavings, recommendKit } from '../lib/catalog';
import { generateProposal, type ProposalData } from '../lib/proposalPdf';

describe('commercial calculations',()=>{
  it('caps scenarios and rejects invalid inputs',()=>{
    for(const kit of CATALOG){
      const s=estimateSavings(kit,9000,32.2,.6);
      expect(s.low).toBeGreaterThanOrEqual(0);expect(s.high).toBeGreaterThanOrEqual(s.low);expect(s.high).toBeLessThanOrEqual(7200);
      expect(estimateSavings(kit,NaN,32.2,.6)).toEqual({low:0,high:0});
      expect(estimateSavings(kit,9000,0,.6)).toEqual({low:0,high:0});
    }
  });
  it('uses the shared catalogue for each segment',()=>{
    expect(recommendKit('casa',9000).id).toBe('tranquila');
    expect(recommendKit('casa',30000).id).toBe('plena');
    expect(recommendKit('negocio',70000).id).toBe('pleno');
    expect(new Set(CATALOG.map(k=>k.id)).size).toBe(5);
  });
});
describe('proposal PDF',()=>{
  it('paginates long notes and retains the ending without raster slicing',()=>{
    const data:ProposalData={name:'TESTE - Nome de cliente extenso para validação',address:'Praia, Santiago',phone:'+2380000000',email:'',property:'Residencial',roof:'Terraço',connection:'Monofásico',equipment:'Frigorífico e iluminação',bill:'9000',kitId:'tranquila',price:'',notes:('Observação técnica com detalhe. ').repeat(200)+'FIM DA NOTA',reference:'CE-QA-20260916',seller:'Kevin',sellerPhone:'+2389954181',terms:'Impostos e instalação a confirmar.',legalEntity:'',taxId:'',validity:'',photo:''};
    const pdf=generateProposal(data);expect(pdf.getNumberOfPages()).toBeGreaterThan(2);
    const output=pdf.output();expect(output).toContain('FIM DA NOTA');expect(output).toContain('CE-QA-20260916');expect(output).toContain('/Type /Page');
  });
});
