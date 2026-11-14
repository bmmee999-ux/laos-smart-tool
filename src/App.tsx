import { useMemo, useState } from 'react'
import {
  ArrowLeftRight, Calculator, QrCode, ReceiptText, Banknote,
  Ruler, Languages, Search, ArrowLeft, Copy, RefreshCw
} from 'lucide-react'

type Lang = 'LA' | 'TH' | 'EN'
type ToolId = 'currency' | 'money' | 'qr' | 'invoice' | 'loan' | 'unit'

const copy = {
  EN: {
    tagline: 'SMART • SIMPLE • USEFUL', hero: 'Useful tools for everyday life',
    search: 'Search tools...', popular: 'Popular tools', back: 'Back to all tools',
    currency: 'Currency converter', money: 'Money calculator', qr: 'QR code generator',
    invoice: 'Invoice generator', loan: 'Loan calculator', unit: 'Unit converter',
    currencyDesc: 'Convert LAK, THB and USD', moneyDesc: 'Calculate income and expenses',
    qrDesc: 'Create a QR code from text or a link', invoiceDesc: 'Prepare a simple invoice',
    loanDesc: 'Estimate monthly loan payments', unitDesc: 'Convert common units',
    amount: 'Amount', from: 'From', to: 'To', convert: 'Convert', rateNote: 'Enter the exchange rate you want to use.',
    rate: 'Exchange rate (1 unit of source = ? target)', result: 'Result', income: 'Income', expenses: 'Expenses',
    calculate: 'Calculate', balance: 'Balance', text: 'Text or website URL', generate: 'Generate QR',
    qrHelp: 'QR preview is generated in your browser.', customer: 'Customer name', item: 'Description',
    price: 'Amount', makeInvoice: 'Create invoice preview', total: 'Total', principal: 'Loan amount',
    interest: 'Annual interest rate (%)', months: 'Term (months)', monthly: 'Estimated monthly payment',
    value: 'Value', convertUnit: 'Convert units', copy: 'Copy result', copied: 'Copied!',
    selectTool: 'Choose a tool to get started.', disclaimer: 'Calculations are estimates. Check important financial figures independently.'
  },
  TH: {
    tagline: 'ฉลาด • ง่าย • ใช้ได้จริง', hero: 'เครื่องมือที่มีประโยชน์ในชีวิตประจำวัน',
    search: 'ค้นหาเครื่องมือ...', popular: 'เครื่องมือยอดนิยม', back: 'กลับไปหน้าเครื่องมือ',
    currency: 'แปลงสกุลเงิน', money: 'คำนวณรายรับรายจ่าย', qr: 'สร้างคิวอาร์โค้ด',
    invoice: 'สร้างใบแจ้งหนี้', loan: 'คำนวณสินเชื่อ', unit: 'แปลงหน่วย',
    currencyDesc: 'แปลง LAK, THB และ USD', moneyDesc: 'คำนวณรายรับและรายจ่าย',
    qrDesc: 'สร้าง QR จากข้อความหรือลิงก์', invoiceDesc: 'ทำใบแจ้งหนี้อย่างง่าย',
    loanDesc: 'ประมาณค่างวดต่อเดือน', unitDesc: 'แปลงหน่วยที่ใช้บ่อย',
    amount: 'จำนวนเงิน', from: 'จาก', to: 'เป็น', convert: 'แปลงค่า', rateNote: 'กรอกอัตราแลกเปลี่ยนที่ต้องการใช้',
    rate: 'อัตราแลกเปลี่ยน (1 หน่วยต้นทาง = ? หน่วยปลายทาง)', result: 'ผลลัพธ์', income: 'รายรับ', expenses: 'รายจ่าย',
    calculate: 'คำนวณ', balance: 'ยอดคงเหลือ', text: 'ข้อความหรือลิงก์เว็บไซต์', generate: 'สร้าง QR',
    qrHelp: 'QR จะแสดงตัวอย่างในเบราว์เซอร์', customer: 'ชื่อลูกค้า', item: 'รายละเอียด',
    price: 'จำนวนเงิน', makeInvoice: 'สร้างตัวอย่างใบแจ้งหนี้', total: 'รวม', principal: 'ยอดเงินกู้',
    interest: 'ดอกเบี้ยต่อปี (%)', months: 'ระยะเวลา (เดือน)', monthly: 'ค่างวดต่อเดือนโดยประมาณ',
    value: 'ค่า', convertUnit: 'แปลงหน่วย', copy: 'คัดลอกผลลัพธ์', copied: 'คัดลอกแล้ว!',
    selectTool: 'เลือกเครื่องมือเพื่อเริ่มต้น', disclaimer: 'ผลคำนวณเป็นเพียงค่าประมาณ โปรดตรวจสอบตัวเลขทางการเงินที่สำคัญอีกครั้ง'
  },
  LA: {
    tagline: 'ສະຫຼາດ • ງ່າຍ • ໃຊ້ໄດ້ຈິງ', hero: 'ເຄື່ອງມືທີ່ເປັນປະໂຫຍດສຳລັບທຸກມື້',
    search: 'ຄົ້ນຫາເຄື່ອງມື...', popular: 'ເຄື່ອງມືຍອດນິຍົມ', back: 'ກັບໄປໜ້າເຄື່ອງມື',
    currency: 'ແປງສະກຸນເງິນ', money: 'ຄຳນວນລາຍຮັບລາຍຈ່າຍ', qr: 'ສ້າງ QR Code',
    invoice: 'ສ້າງໃບແຈ້ງໜີ້', loan: 'ຄຳນວນເງິນກູ້', unit: 'ແປງຫົວໜ່ວຍ',
    currencyDesc: 'ແປງ LAK, THB ແລະ USD', moneyDesc: 'ຄຳນວນລາຍຮັບ ແລະ ລາຍຈ່າຍ',
    qrDesc: 'ສ້າງ QR ຈາກຂໍ້ຄວາມ ຫຼື ລິ້ງ', invoiceDesc: 'ສ້າງໃບແຈ້ງໜີ້ແບບງ່າຍ',
    loanDesc: 'ຄຳນວນຄ່າງວດປະຈຳເດືອນ', unitDesc: 'ແປງຫົວໜ່ວຍທົ່ວໄປ',
    amount: 'ຈຳນວນເງິນ', from: 'ຈາກ', to: 'ເປັນ', convert: 'ແປງຄ່າ', rateNote: 'ປ້ອນອັດຕາແລກປ່ຽນທີ່ຕ້ອງການໃຊ້',
    rate: 'ອັດຕາແລກປ່ຽນ (1 ໜ່ວຍຕົ້ນທາງ = ? ໜ່ວຍປາຍທາງ)', result: 'ຜົນໄດ້ຮັບ', income: 'ລາຍຮັບ', expenses: 'ລາຍຈ່າຍ',
    calculate: 'ຄຳນວນ', balance: 'ຍອດຄົງເຫຼືອ', text: 'ຂໍ້ຄວາມ ຫຼື ລິ້ງເວັບ', generate: 'ສ້າງ QR',
    qrHelp: 'QR ຈະສະແດງຕົວຢ່າງໃນເບຣາວເຊີ', customer: 'ຊື່ລູກຄ້າ', item: 'ລາຍລະອຽດ',
    price: 'ຈຳນວນເງິນ', makeInvoice: 'ສ້າງຕົວຢ່າງໃບແຈ້ງໜີ້', total: 'ລວມ', principal: 'ຈຳນວນເງິນກູ້',
    interest: 'ດອກເບ້ຍຕໍ່ປີ (%)', months: 'ໄລຍະເວລາ (ເດືອນ)', monthly: 'ຄ່າງວດຕໍ່ເດືອນໂດຍປະມານ',
    value: 'ຄ່າ', convertUnit: 'ແປງຫົວໜ່ວຍ', copy: 'ຄັດລອກຜົນ', copied: 'ຄັດລອກແລ້ວ!',
    selectTool: 'ເລືອກເຄື່ອງມືເພື່ອເລີ່ມ', disclaimer: 'ຜົນຄຳນວນເປັນພຽງຄ່າປະມານ ກະລຸນາກວດສອບຕົວເລກທາງການເງິນທີ່ສຳຄັນອີກຄັ້ງ'
  }
}

const toolList: { id: ToolId; icon: typeof Calculator; title: keyof typeof copy.EN; desc: keyof typeof copy.EN }[] = [
  { id: 'currency', icon: ArrowLeftRight, title: 'currency', desc: 'currencyDesc' },
  { id: 'money', icon: Calculator, title: 'money', desc: 'moneyDesc' },
  { id: 'qr', icon: QrCode, title: 'qr', desc: 'qrDesc' },
  { id: 'invoice', icon: ReceiptText, title: 'invoice', desc: 'invoiceDesc' },
  { id: 'loan', icon: Banknote, title: 'loan', desc: 'loanDesc' },
  { id: 'unit', icon: Ruler, title: 'unit', desc: 'unitDesc' },
]

function Field({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return <label className="field"><span>{label}</span><input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /></label>
}

export default function App() {
  const [lang, setLang] = useState<Lang>('LA')
  const [active, setActive] = useState<ToolId | null>(null)
  const [search, setSearch] = useState('')
  const [amount, setAmount] = useState('100000')
  const [from, setFrom] = useState('LAK')
  const [to, setTo] = useState('THB')
  const [rate, setRate] = useState('0.0015')
  const [income, setIncome] = useState('1000000')
  const [expenses, setExpenses] = useState('400000')
  const [qrText, setQrText] = useState('https://example.com')
  const [customer, setCustomer] = useState('')
  const [description, setDescription] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('0')
  const [principal, setPrincipal] = useState('10000000')
  const [interest, setInterest] = useState('12')
  const [months, setMonths] = useState('12')
  const [unitValue, setUnitValue] = useState('1')
  const [unitFrom, setUnitFrom] = useState('km')
  const [unitTo, setUnitTo] = useState('m')
  const [copied, setCopied] = useState(false)
  const t = copy[lang]
  const filtered = useMemo(() => toolList.filter(x => `${t[x.title]} ${t[x.desc]}`.toLowerCase().includes(search.toLowerCase())), [t, search])

  const converted = Number(amount || 0) * Number(rate || 0)
  const balance = Number(income || 0) - Number(expenses || 0)
  const p = Number(principal || 0), r = Number(interest || 0) / 1200, n = Math.max(1, Number(months || 1))
  const monthly = r === 0 ? p / n : p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  const unitFactors: Record<string, number> = { km: 1000, m: 1, cm: 0.01, kg: 1, g: 0.001, L: 1, mL: 0.001 }
  const unitResult = Number(unitValue || 0) * unitFactors[unitFrom] / unitFactors[unitTo]
  const format = (v: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(v)

  async function copyResult(value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600) }
    catch { setCopied(false); alert(value) }
  }

  function ToolPanel() {
    if (!active) return null
    const title = toolList.find(x => x.id === active)
    return <section className="panel">
      <button className="back" onClick={() => setActive(null)}><ArrowLeft size={16} /> {t.back}</button>
      <h2>{title ? t[title.title] : ''}</h2>
      {active === 'currency' && <>
        <p className="muted">{t.rateNote}</p>
        <Field label={t.amount} value={amount} onChange={setAmount} type="number" />
        <div className="two">
          <label className="field"><span>{t.from}</span><select value={from} onChange={e => setFrom(e.target.value)}>{['LAK','THB','USD'].map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="field"><span>{t.to}</span><select value={to} onChange={e => setTo(e.target.value)}>{['LAK','THB','USD'].map(x => <option key={x}>{x}</option>)}</select></label>
        </div>
        <Field label={t.rate} value={rate} onChange={setRate} type="number" />
        <div className="result"><span>{t.result}</span><strong>{format(converted)} {to}</strong><button onClick={() => copyResult(`${format(converted)} ${to}`)}><Copy size={16}/></button></div>
        <p className="hint">ตัวอย่างอัตราแลกเปลี่ยนเท่านั้น — กรุณาป้อนเรตล่าสุดจากแหล่งที่เชื่อถือได้ก่อนใช้งานจริง</p>
      </>}
      {active === 'money' && <>
        <Field label={t.income} value={income} onChange={setIncome} type="number" />
        <Field label={t.expenses} value={expenses} onChange={setExpenses} type="number" />
        <div className="result"><span>{t.balance}</span><strong>{format(balance)}</strong></div>
      </>}
      {active === 'qr' && <>
        <Field label={t.text} value={qrText} onChange={setQrText} />
        {qrText && <div className="qr-preview"><img alt="Generated QR code" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrText)}`} /></div>}
        <p className="muted">{t.qrHelp}</p>
      </>}
      {active === 'invoice' && <>
        <Field label={t.customer} value={customer} onChange={setCustomer} />
        <Field label={t.item} value={description} onChange={setDescription} />
        <Field label={t.price} value={invoiceAmount} onChange={setInvoiceAmount} type="number" />
        <div className="invoice-preview"><h3>LAO SMART TOOLS</h3><p>{t.customer}: {customer || '—'}</p><p>{t.item}: {description || '—'}</p><strong>{t.total}: {format(Number(invoiceAmount || 0))}</strong><button className="primary print" onClick={() => window.print()}>Print / Save PDF</button></div>
      </>}
      {active === 'loan' && <>
        <Field label={t.principal} value={principal} onChange={setPrincipal} type="number" />
        <Field label={t.interest} value={interest} onChange={setInterest} type="number" />
        <Field label={t.months} value={months} onChange={setMonths} type="number" />
        <div className="result"><span>{t.monthly}</span><strong>{format(monthly)}</strong></div>
      </>}
      {active === 'unit' && <>
        <Field label={t.value} value={unitValue} onChange={setUnitValue} type="number" />
        <div className="two">
          <label className="field"><span>{t.from}</span><select value={unitFrom} onChange={e => setUnitFrom(e.target.value)}>{Object.keys(unitFactors).map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="field"><span>{t.to}</span><select value={unitTo} onChange={e => setUnitTo(e.target.value)}>{Object.keys(unitFactors).map(x => <option key={x}>{x}</option>)}</select></label>
        </div>
        <div className="result"><span>{t.result}</span><strong>{format(unitResult)} {unitTo}</strong></div>
      </>}
      <p className="disclaimer">{t.disclaimer}</p>
    </section>
  }

  return <div className="app">
    <header className="topbar"><div className="brand">LAO <b>SMART TOOLS</b></div>
      <label className="language"><Languages size={17}/><select value={lang} onChange={e => setLang(e.target.value as Lang)}><option value="LA">ລາວ</option><option value="TH">ไทย</option><option value="EN">English</option></select></label>
    </header>
    <main className="main">
      <section className="hero"><span className="tag">{t.tagline}</span><h1>LAO SMART TOOLS</h1><p>{t.hero}</p>
        <div className="search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}/></div>
      </section>
      {!active && <section className="tools"><div className="section-head"><h2>{t.popular}</h2><span>{filtered.length} tools</span></div>
        <div className="tool-grid">{filtered.map(item => { const Icon = item.icon; return <button className="tool-card" key={item.id} onClick={() => setActive(item.id)}><span className="tool-icon"><Icon size={25}/></span><h3>{t[item.title]}</h3><p>{t[item.desc]}</p><span className="open-tool">Open tool →</span></button> })}</div>
        {filtered.length === 0 && <p className="muted">{t.selectTool}</p>}
      </section>}
      <ToolPanel />
      <footer>© 2026 LAO SMART TOOLS <span>• MVP preview</span></footer>
    </main>
  </div>
}
