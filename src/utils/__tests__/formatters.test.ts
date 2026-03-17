import {
  formatCategoryName,
  formatPrice,
  formatRating,
  getStockColor,
  getStockStatus,
} from '../formatters';

describe('formatters', () => {
  describe('formatCategoryName', () => {
    it('should format category names correctly', () => {
      expect(formatCategoryName('smartphones')).toBe('Smartphones');
      expect(formatCategoryName('mens-shirts')).toBe('Mens Shirts');
      expect(formatCategoryName('womens-dresses')).toBe('Womens Dresses');
      expect(formatCategoryName('home-decoration')).toBe('Home Decoration');
    });

    it('should handle invalid inputs', () => {
      expect(formatCategoryName('')).toBe('Unknown Category');
      expect(formatCategoryName(null as any)).toBe('Unknown Category');
      expect(formatCategoryName(undefined as any)).toBe('Unknown Category');
    });
  });

  describe('formatPrice', () => {
    it('should format prices correctly', () => {
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(1000)).toBe('$1,000.00');
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should handle invalid inputs', () => {
      expect(formatPrice(NaN)).toBe('$0.00');
      expect(formatPrice(null as any)).toBe('$0.00');
      expect(formatPrice(undefined as any)).toBe('$0.00');
    });
  });

  describe('formatRating', () => {
    it('should format ratings correctly', () => {
      expect(formatRating(4.5)).toBe('4.5');
      expect(formatRating(3)).toBe('3.0');
      expect(formatRating(4.567)).toBe('4.6');
    });

    it('should handle invalid inputs', () => {
      expect(formatRating(NaN)).toBe('0.0');
      expect(formatRating(null as any)).toBe('0.0');
      expect(formatRating(undefined as any)).toBe('0.0');
    });
  });

  describe('getStockColor', () => {
    it('should return correct colors for stock levels', () => {
      expect(getStockColor(100)).toBe('green');
      expect(getStockColor(51)).toBe('green');
      expect(getStockColor(30)).toBe('orange');
      expect(getStockColor(21)).toBe('orange');
      expect(getStockColor(10)).toBe('red');
      expect(getStockColor(0)).toBe('red');
    });

    it('should handle invalid inputs', () => {
      expect(getStockColor(NaN)).toBe('red');
      expect(getStockColor(null as any)).toBe('red');
      expect(getStockColor(undefined as any)).toBe('red');
    });
  });

  describe('getStockStatus', () => {
    it('should return correct status for stock levels', () => {
      expect(getStockStatus(100)).toBe('In Stock');
      expect(getStockStatus(51)).toBe('In Stock');
      expect(getStockStatus(30)).toBe('Low Stock');
      expect(getStockStatus(21)).toBe('Low Stock');
      expect(getStockStatus(10)).toBe('Limited Stock');
      expect(getStockStatus(1)).toBe('Limited Stock');
      expect(getStockStatus(0)).toBe('Out of Stock');
    });

    it('should handle invalid inputs', () => {
      expect(getStockStatus(NaN)).toBe('Unknown');
      expect(getStockStatus(null as any)).toBe('Unknown');
      expect(getStockStatus(undefined as any)).toBe('Unknown');
    });
  });
});