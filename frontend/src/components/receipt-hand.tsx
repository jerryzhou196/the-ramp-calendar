"use client"

import { useEffect, useState } from "react"
import { ReceiptCard } from "./receipt-card"

const RECEIPTS = [
  {
    store: "Corner Cafe",
    date: "Jan 15, 2026 - 8:32 AM",
    items: [
      { name: "Americano (L)", price: "$4.50" },
      { name: "Croissant", price: "$3.75" },
      { name: "Avocado Toast", price: "$12.00" },
    ],
    subtotal: "$20.25",
    tax: "$1.78",
    total: "$22.03",
  },
  {
    store: "Metro Grocery",
    date: "Jan 18, 2026 - 5:14 PM",
    items: [
      { name: "Organic Milk", price: "$6.49" },
      { name: "Sourdough Bread", price: "$5.99" },
      { name: "Free Range Eggs", price: "$7.29" },
      { name: "Olive Oil 500ml", price: "$11.99" },
    ],
    subtotal: "$31.76",
    tax: "$2.54",
    total: "$34.30",
  },
  {
    store: "Books & Co",
    date: "Jan 22, 2026 - 2:45 PM",
    items: [
      { name: "Design Patterns", price: "$42.99" },
      { name: "Bookmark Set", price: "$8.50" },
    ],
    subtotal: "$51.49",
    tax: "$4.12",
    total: "$55.61",
  },
  {
    store: "Gas Station #47",
    date: "Jan 25, 2026 - 10:02 AM",
    items: [
      { name: "Unleaded 12.4gal", price: "$41.54" },
      { name: "Windshield Fluid", price: "$4.99" },
      { name: "Energy Bar", price: "$2.50" },
    ],
    subtotal: "$49.03",
    tax: "$3.43",
    total: "$52.46",
  },
  {
    store: "Hardware Plus",
    date: "Feb 01, 2026 - 11:18 AM",
    items: [
      { name: "LED Bulbs 4pk", price: "$14.99" },
      { name: "Duct Tape", price: "$6.49" },
      { name: "WD-40", price: "$5.79" },
    ],
    subtotal: "$27.27",
    tax: "$2.18",
    total: "$29.45",
  },
]

// Each card's final rotation and x-offset for the fan
const CARD_TRANSFORMS = [
  { rotate: -24, x: -120, delay: 0 },
  { rotate: -12, x: -55, delay: 0.06 },
  { rotate: 0, x: 0, delay: 0.12 },
  { rotate: 12, x: 55, delay: 0.18 },
  { rotate: 24, x: 120, delay: 0.24 },
]

export function ReceiptHand({ isMobile }: { isMobile: boolean }) {
  const [fanned, setFanned] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFanned(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex items-end justify-end w-1/2" style={{
      transform: isMobile ? ' scale(0.40)' : 'translate(-30%, 50%)',
      translate: isMobile ? '-30px -20px' : '0px 0px',
      transformOrigin: 'bottom right',
    }}>
      {RECEIPTS.map((receipt, i) => {
        const t = CARD_TRANSFORMS[i]
        return (
          <div
            key={i}
            className="absolute bottom-0 right-0"
            style={{
              transformOrigin: "50% 100%",
              transform: fanned
                ? `translateX(${t.x}px) rotate(${t.rotate}deg)`
                : "translateX(0px) rotate(0deg)",
              transition: `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${t.delay}s`,
              zIndex: i,
            }}
          >
            <ReceiptCard data={receipt} />
          </div>
        )
      })}
    </div>
  )
}
