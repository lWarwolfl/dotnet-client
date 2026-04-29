export default function ReactScan() {
  return process.env.NODE_ENV === 'development' ? (
    <script async crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
  ) : null
}
