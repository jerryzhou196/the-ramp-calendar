interface ReceiptItem {
  name: string
  price: string
}

interface ReceiptData {
  store: string
  date: string
  items: ReceiptItem[]
  subtotal: string
  tax: string
  total: string
}

export function ReceiptCard({ data }: { data: ReceiptData }) {
  return (
    <div className="w-[150px] select-none shadow-lg bg-white">
      {/* Zigzag top edge */}
      <div className="flex h-1.5 w-full overflow-hidden bg-transparent">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-[5px] shrink-0 rotate-180"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              backgroundColor: "#f3f4f6",
            }}
          />
        ))}
      </div>

      {/* Receipt body */}
      <div className="flex flex-col gap-1.5 bg-receipt px-2 py-2">
        {/* Store header */}
        <div className="flex flex-col items-center gap-0.5 text-center">
          <p className="font-mono text-[6px] font-bold uppercase tracking-wider text-black">
            {data.store}
          </p>
          <p className="font-mono text-[5px] text-black/60">
            {data.date}
          </p>
        </div>

        {/* Dashed separator */}
        <div className="border-t border-dashed border-receipt-foreground/20" />

        {/* Line items */}
        <div className="flex flex-col gap-0.5">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-1"
            >
              <span className="font-mono text-[5px] leading-tight text-black/80">
                {item.name}
              </span>
              <span className="shrink-0 font-mono text-[5px] text-black/80">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Dashed separator */}
        <div className="border-t border-dashed border-receipt-foreground/20" />

        {/* Subtotal + tax */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[5px] text-black/60">
              Subtotal
            </span>
            <span className="font-mono text-[5px] text-black/60">
              {data.subtotal}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[5px] text-black/60">
              Tax
            </span>
            <span className="font-mono text-[5px] text-black/60">
              {data.tax}
            </span>
          </div>
        </div>

        {/* Dashed separator */}
        <div className="border-t border-dashed border-receipt-foreground/20" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[6px] font-bold text-black">
            TOTAL
          </span>
          <span className="font-mono text-[6px] font-bold text-black">
            {data.total}
          </span>
        </div>

        {/* Barcode placeholder */}
        <div className="flex items-center justify-center gap-[1px] pt-0.5">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="bg-black/30"
              style={{
                width: i % 3 === 0 ? "1px" : "1px",
                height: i % 5 === 0 ? "9px" : i % 3 === 0 ? "7px" : "10px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Zigzag bottom edge */}
      <div className="flex h-1.5 w-full overflow-hidden bg-transparent">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-[5px] shrink-0"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              backgroundColor: "#f3f4f6",
            }}
          />
        ))}
      </div>
    </div>
  )
}
