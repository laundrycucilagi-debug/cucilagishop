import { getDiscountValue, getSellingPrice, getStockStatus } from "@/lib/format";
import { products, sales } from "@/lib/products";

export function getDashboardSummary() {
  const activeProducts = products.filter((product) => product.isActive);
  const emptyProducts = activeProducts.filter((product) => product.stock === 0);
  const today = "2026-06-19";
  const todaySales = sales.filter((sale) => sale.saleDate === today);
  const monthSales = sales.filter((sale) => sale.saleDate.startsWith("2026-06"));

  return {
    totalProducts: products.length,
    activeProducts: activeProducts.length,
    emptyProducts: emptyProducts.length,
    todaySales: todaySales.length,
    monthSales: monthSales.length,
    monthRevenue: monthSales.reduce((total, sale) => total + sale.total, 0),
  };
}

export function getReportSummary() {
  const totalTransactions = sales.length;
  const totalSold = sales.reduce((total, sale) => total + sale.quantity, 0);
  const totalRevenue = sales.reduce((total, sale) => total + sale.total, 0);
  const totalDiscount = sales.reduce((total, sale) => {
    const product = products.find((item) => item.id === sale.productId);
    return total + (product ? getDiscountValue(product) * sale.quantity : 0);
  }, 0);

  const productSales = products
    .map((product) => {
      const relatedSales = sales.filter((sale) => sale.productId === product.id);
      const quantity = relatedSales.reduce((total, sale) => total + sale.quantity, 0);

      return {
        product,
        quantity,
        total: quantity * getSellingPrice(product),
      };
    })
    .sort((a, b) => b.quantity - a.quantity);

  const stock = products.reduce(
    (summary, product) => {
      const status = getStockStatus(product.stock);
      summary[status] += 1;
      return summary;
    },
    { available: 0, limited: 0, empty: 0 },
  );

  return {
    totalTransactions,
    totalSold,
    totalRevenue,
    totalDiscount,
    productSales,
    stock,
  };
}
