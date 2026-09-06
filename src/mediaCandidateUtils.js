const FANDOM_REDIRECT='/wiki/Special:Redirect/file/';
const FANDOM_FILEPATH='/wiki/Special:FilePath/';

function unique(values){return [...new Set(values.filter(Boolean))];}

function fandomFilePath(url){
  try{
    const parsed=new URL(url);
    if(parsed.hostname!=='pocketants.fandom.com') return null;
    const marker=parsed.pathname.indexOf(FANDOM_REDIRECT);
    if(marker===-1) return null;
    const file=parsed.pathname.slice(marker+FANDOM_REDIRECT.length);
    return `${parsed.origin}${FANDOM_FILEPATH}${file}${parsed.search||''}`;
  }catch{return null;}
}

function proxy(url){
  if(!url||url.includes('images.weserv.nl/?url=')) return null;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1600&fit=inside&output=webp&q=88`;
}

/**
 * Builds a resilient candidate list for remote screenshots.
 * Order intentionally prefers direct URLs first, then a cached image proxy.
 * Fandom Special:Redirect URLs also get the standard Special:FilePath route,
 * which is frequently more reliable for browser embedding.
 */
export function robustMediaCandidates(input=[]){
  const originals=unique(Array.isArray(input)?input:[input]);
  const direct=[];
  for(const value of originals){
    const filePath=fandomFilePath(value);
    if(filePath) direct.push(filePath);
    direct.push(value);
  }
  const normalized=unique(direct);
  return unique([
    ...normalized,
    ...normalized.map(proxy)
  ]);
}

export function mediaLoadTimeoutMs(){
  const connection=typeof navigator!=='undefined'?navigator.connection:null;
  if(connection?.saveData) return 5500;
  if(connection?.effectiveType==='2g'||connection?.effectiveType==='slow-2g') return 7000;
  return 9000;
}
