import { translateIdToMonth, normalizeKey, normalizeTransactionValue, maskTransactionValue } from '../helpers' ;

describe('When translate id to month text', () => {
    const month = translateIdToMonth('01');
  
    it('month returns janeiro', () => {
      expect(month).toBe('Janeiro');
    });
});

describe('When normalize string', () => {
    const str = normalizeKey(' çê');
  
    it('str returns ce', () => {
      expect(str).toBe('ce');
    });
});

describe('When normalize transaction value like R$ 1.000,00 or a million', () => {
    const str = normalizeTransactionValue('R$ 1.000,00');
    const strMillion = normalizeTransactionValue('R$ 1.000.000,00');
  
    it('str returns 1000.00', () => {
      expect(str).toBe('1000.00');
    });

    it('strMillion returns 10000.00', () => {
        expect(strMillion).toBe('1000000.00');
    });
});

describe('When mask unmasked transaction value', () => {
    const str = maskTransactionValue('10000,00');
    const strMillion = maskTransactionValue('1000000,00');
  
    it('str returns 10.000,00', () => {
      expect(str).toBe('10.000,00');
    });

    it('str returns 1.000.000,00', () => {
        expect(strMillion).toBe('1.000.000,00');
    });
});

