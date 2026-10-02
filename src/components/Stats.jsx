import { statCards } from "../utils/constants";
import {
  getIndexPriceClass,
  getPnlClass,
  formatPnl,
} from "../utils/commonUtils";

const Stats = ({ summary, prevIndexPrice, status }) => {
  const renderValue = (key) => {
    if (key === "running") return status?.running ? "Running" : "Stopped";
    if (key === "unrealized_pnl") return formatPnl(summary?.unrealized_pnl);
    if (key === "realized_pnl")
      return formatPnl(
        summary?.realized_pnl ?? status?.strategy_state?.realized_pnl,
      );
    if (key === "combined_pnl")
      return formatPnl(
        summary?.combined_pnl ?? status?.strategy_state?.combined_pnl,
      );
    if (key === "trigger_pnl")
      return formatPnl(status?.strategy_state?.trigger_pnl);
    if (key === "profit_exit_threshold_usd")
      return formatPnl(summary?.profit_exit_threshold_usd);
    if (key === "loss_exit_threshold_usd")
      return formatPnl(summary?.loss_exit_threshold_usd);
    return summary[key] ?? "-";
  };
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <article
          key={card.key}
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            {card.label}
          </p>
          <p
            className={`mt-4 text-3xl font-semibold ${
              ["unrealized_pnl", "realized_pnl", "combined_pnl", "trigger_pnl"].includes(card.key)
                ? getPnlClass(
                    card.key === "unrealized_pnl"
                      ? summary?.unrealized_pnl
                      : card.key === "realized_pnl"
                        ? summary?.realized_pnl ?? status?.strategy_state?.realized_pnl
                        : card.key === "combined_pnl"
                          ? summary?.combined_pnl ?? status?.strategy_state?.combined_pnl
                          : status?.strategy_state?.trigger_pnl,
                  )
                : card.key === "index_price"
                  ? getIndexPriceClass(summary?.index_price, prevIndexPrice)
                  : "text-white"
            }`}
          >
            {renderValue(card.key)}
          </p>
        </article>
      ))}
    </section>
  );
};

export default Stats;
