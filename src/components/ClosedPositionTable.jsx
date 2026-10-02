import { getPnlClass, formatPnl } from "../utils/commonUtils";

const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const ClosedPositionTable = ({ summary }) => {
  const positions = summary?.closed_positions ?? [];

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/15">
      <div className="border-b border-slate-800 bg-slate-950/90 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Closed Positions</h2>
        <p className="mt-1 text-sm text-slate-400">
          Completed option legs and realized PnL details.
        </p>
      </div>
      <div className="overflow-x-auto p-6">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-3 py-3">Symbol</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Strike</th>
              <th className="px-3 py-3">Expiry</th>
              <th className="px-3 py-3">Side</th>
              <th className="px-3 py-3">Size</th>
              <th className="px-3 py-3">Entry</th>
              <th className="px-3 py-3">Closed Price</th>
              <th className="px-3 py-3">Closed Time</th>
              <th className="px-3 py-3">Realized PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {positions.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-slate-500">
                  No closed positions found.
                </td>
              </tr>
            ) : (
              positions.map((position) => (
                <tr
                  key={position.fill_id ?? `${position.product_id}-${position.closed_time}`}
                  className="hover:bg-slate-950/60"
                >
                  <td className="whitespace-nowrap px-3 py-4">{position.symbol ?? "—"}</td>
                  <td className="px-3 py-4">{position.type ?? position.option_type ?? "—"}</td>
                  <td className="px-3 py-4">{position.strike ?? "—"}</td>
                  <td className="whitespace-nowrap px-3 py-4">
                    {position.expiry ? String(position.expiry).split("T")[0] : "—"}
                  </td>
                  <td className="px-3 py-4">{position.side ?? "—"}</td>
                  <td className="px-3 py-4">{position.size ?? position.quantity ?? "—"}</td>
                  <td className="px-3 py-4">{position.entry ?? position.entry_price ?? "—"}</td>
                  <td className="px-3 py-4">
                    {position.closed_price ?? position.exit_price ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    {formatDateTime(position.closed_time ?? position.closed_at)}
                  </td>
                  <td className={`px-3 py-4 ${getPnlClass(position.realized_pnl)}`}>
                    {formatPnl(position.realized_pnl)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ClosedPositionTable;
