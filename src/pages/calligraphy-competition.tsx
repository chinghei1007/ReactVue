import SectionHeading from '../customElements/SectionHeading'
import FoldableChallengeSection from '../customElements/FoldableChallengeSection'

const hardItems = [
  {
    "chineseName": "香港學界文藝界全港兒童中文硬筆書法大賽",
    "englishName": "HKASA",
    "result": "高中組冠軍",
    "resultDate": "21-06-2024",
    "style": ""
  },
  {
    "chineseName": "",
    "englishName": "",
    "result": ["", "", "", ""],
    "resultDate": "",
    "style": ""
  },
  {
    "chineseName": "國際青少年學術菁英協會",
    "englishName": "IYAEA",
    "result": "公開組冠軍",
    "resultDate": "11-09-2024",
    "style": "楷書"
  },
  {
    "chineseName": "青年兒童文藝交流協會 - 第九屆香港青年兒童書法比賽",
    "englishName": "HKCYACA",
    "result": "公開組亞軍",
    "resultDate": "26-09-2024",
    "style": "楷書"
  },
  {
    "chineseName": "第二節鐵畫銀鈎硬筆書法比賽",
    "englishName": "Art's Culture",
    "result": "公開組銀奬",
    "resultDate": "27-01-2025",
    "style": "行書"
  },
  {
    "chineseName": "第二屆飛龍盃",
    "englishName": "iCan Centre",
    "result": "公開組冠軍",
    "resultDate": "12-04-2024",
    "style": "行書"
  },
  {
    "chineseName": "第四屆飛龍盃",
    "englishName": "iCan Centre",
    "result": "公開組金奬",
    "resultDate": "30-05-2026",
    "style": "行書"
  },
  {
    "chineseName": "粵港澳大灣區比賽",
    "englishName": "GBAACA",
    "result": "公開組冠軍",
    "resultDate": "2-12-2025",
    "style": "楷書"
  },
  {
    "chineseName": "",
    "englishName": "",
    "result": ["", "", "", ""],
    "resultDate": "",
    "style": ""
  },
  {
    "chineseName": "",
    "englishName": "",
    "result": ["", "", "", ""],
    "resultDate": "",
    "style": ""
  },
  {chineseName: '香港18區校網兒童競技協會', englishName: 'HKSNCTA', result: ["荃灣區公開組冠軍", "元朗區公開組冠軍", "西貢區公開組冠軍", "18區校網\"硬筆書法\"明日之星"], resultDate: "15-07-2026", style: "行書"}
]

export default function Home() {
  // Filter out the empty placeholder objects you had in the array
  const validItems = hardItems.filter(item => item.chineseName !== "")

  return (
    <div className="home-page">
      {/* Auto-map through the different events */}
      {validItems.map((item, index) => (
        <section key={index} className="hero-panel">
          {/* eyebrow -> style, title -> chineseName */}
          <SectionHeading eyebrow={item.style} title={item.chineseName} />
          
          <div className="hero-copy">
            {/* Handle both string results and array results (like your last item) */}
            {Array.isArray(item.result) ? (
              item.result.map((r, i) => <p key={i}>{r}</p>)
            ) : (
              <p>{item.result}</p>
            )}
          </div>
          
          <div className="hero-tags">
            {/* tags -> resultDate (and englishName added as a bonus tag) */}
            <span>{item.resultDate}</span>
            <span>{item.englishName}</span>
          </div>
        </section>
      ))}

      {/* Note: FoldableChallengeSection is commented out because 
          'challengeSections' was not defined in your provided code */}
      {/* <FoldableChallengeSection sections={challengeSections} /> */}
    </div>
  )
}