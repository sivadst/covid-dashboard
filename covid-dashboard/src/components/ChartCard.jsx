export default function ChartCard({ title, subtitle, children, fullWidth = false, actions }) {
  return (
    <div className="card" style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
      <div className="card-header">
        <div>
          <div className="card-title">{title}</div>
          {subtitle && <div className="card-sub">{subtitle}</div>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
