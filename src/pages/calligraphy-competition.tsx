import SectionHeading from '../customElements/SectionHeading'
import FoldableChallengeSection from '../customElements/FoldableChallengeSection'

const eyebrow = 'Calligraphy'
const title = '硬筆書法過往奬項'
const hardItems = [
    {
  "chineseName": "國際青少年學術菁英協會",
  "englishName": "IYAEA",
  "result": "冠軍",
  "resultDate": "11-09-2024",
  "style": "楷書"
}
,
{
  "chineseName": "",
  "englishName": "",
  "result": ["", "", "", ""],
  "resultDate": "",
  "style": ""
}
,
{
  "chineseName": "",
  "englishName": "",
  "result": ["", "", "", ""],
  "resultDate": "",
  "style": ""
}
,
{
  "chineseName": "",
  "englishName": "",
  "result": ["", "", "", ""],
  "resultDate": "",
  "style": ""
}
,
{
  "chineseName": "",
  "englishName": "",
  "result": ["", "", "", ""],
  "resultDate": "",
  "style": ""
}
,

    {chineseName: '香港18去校網兒童競技協會', englishName: 'HKSNCTA', result: ["荃灣區公開組冠軍", "元朗區公開組冠軍", "西貢區公開組冠軍", "18區校網\"硬筆書法\"明日之星"], resultDate: "15-07-2026", style: "行書"}
]
export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="hero-copy"> {heroProfile.description.map((text, index) => ( <p key={index}>{text}</p> ))} </div>
        <div className="hero-tags">
          {heroProfile.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <FoldableChallengeSection sections={challengeSections} />
    </div>
  )
}
