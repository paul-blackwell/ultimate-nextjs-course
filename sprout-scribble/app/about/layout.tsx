export default function AboutLayout({ children } : { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-24 bg-blue-900"></div>
      {children}
    </div>
  )
}
