export default function QuestionCard({ q, index, value, onChange }){
  return (
    <div style={{border:"1px solid #eee", padding:12, borderRadius:8, marginBottom:8}}>
      <div><b>Q{index+1}.</b> {q.text}</div>
      <div style={{display:"grid", gap:6, marginTop:8}}>
        {q.options.map((opt,i)=>(
          <label key={i} style={{display:"flex", gap:8, alignItems:"center"}}>
            <input type="radio" name={q.id} checked={value===i} onChange={()=>onChange(i)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}