import React from 'react';

function currentLanguage(){
  try{return document.documentElement.dataset.language==='en'?'en':'pt';}catch{return 'pt';}
}

export default class AppErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state={error:null};
  }

  static getDerivedStateFromError(error){
    return {error};
  }

  componentDidCatch(error,info){
    console.error('[Pocket Ants Wiki] render error',error,info);
  }

  render(){
    if(!this.state.error) return this.props.children;
    const en=currentLanguage()==='en';
    return <main className="site-main" role="alert" style={{minHeight:'70vh',display:'grid',placeItems:'center',padding:'24px'}}>
      <section style={{width:'min(560px,100%)',padding:'24px',border:'1px solid var(--border,rgba(127,127,127,.25))',borderRadius:'20px',background:'var(--panel,rgba(20,20,20,.75))'}}>
        <div style={{fontSize:'32px',marginBottom:'8px'}}>🐜</div>
        <h1 style={{margin:'0 0 10px'}}>{en?'Something failed on this page':'Algo falhou nesta página'}</h1>
        <p style={{margin:'0 0 18px',opacity:.78}}>{en?'The rest of the site is safe. Reload this page; if the problem persists, go back to the home page.':'O restante do site está seguro. Recarregue esta página; se continuar, volte para o início.'}</p>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
          <button type="button" onClick={()=>window.location.reload()} style={{minHeight:'44px',padding:'0 16px',borderRadius:'12px'}}>{en?'Reload':'Recarregar'}</button>
          <a href="#/" style={{minHeight:'44px',padding:'0 16px',borderRadius:'12px',display:'inline-flex',alignItems:'center'}}>{en?'Home':'Início'}</a>
        </div>
      </section>
    </main>;
  }
}
