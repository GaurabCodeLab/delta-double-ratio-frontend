export const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";

export const statCards = [
  { label: "Bot Status", key: "running" },
  { label: "Index Price", key: "index_price" },
  { label: "Unrealized PnL", key: "unrealized_pnl" },
  { label: "Realized PnL", key: "realized_pnl" },
  { label: "Combined PnL", key: "combined_pnl" },
  { label: "Trigger PnL", key: "trigger_pnl" },
  { label: "Profit Threshold", key: "profit_exit_threshold_usd" },
  { label: "Loss Threshold", key: "loss_exit_threshold_usd" },
  { label: "Positions", key: "position_count" },
];
