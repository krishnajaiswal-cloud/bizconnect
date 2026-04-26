// Calculate feasibility score and metrics
export const calculateFeasibilityScore = ({ investment, revenue, customers }) => {
  // Normalize inputs
  const inv = parseFloat(investment) || 0;
  const rev = parseFloat(revenue) || 0;
  const cust = parseFloat(customers) || 0;

  // Calculate metrics
  const margin = rev > 0 ? ((rev - inv) / rev) * 100 : 0;
  const profit = rev - inv;
  const breakeven = rev > 0 ? inv / (rev / 30) : 0;

  // Determine score based on margin, profit, and breakeven
  let score = 'Low';
  let tip = 'Focus on reducing costs and increasing customer base to improve margins.';

  if (margin >= 40 && profit > 0 && breakeven <= 60) {
    score = 'High';
    tip = 'Excellent feasibility! Consider scaling up and expanding your customer network.';
  } else if (margin >= 20 && profit > 0 && breakeven <= 120) {
    score = 'Medium';
    tip = 'Good potential. Work on optimizing costs and increasing sales volume.';
  }

  return {
    score,
    margin: Math.max(0, margin),
    profit: Math.max(0, profit),
    breakeven: Math.max(0, breakeven),
    tip,
    feasibility: {
      highMargin: margin >= 30,
      profitMargin: profit > 0,
      quickBreakeven: breakeven <= 90,
      goodCustomerBase: cust >= 50,
    },
  };
};
