export const DATABASE_KINDS = Object.freeze([
  'creatures',
  'resources',
  'chambers',
  'mechanics',
  'guides',
  'tools',
  'farms',
  'strategies',
  'search'
]);

export const NATIVE_I18N_KINDS = Object.freeze([
  'resources',
  'chambers',
  'mechanics',
  'guides',
  'tools',
  'farms',
  'strategies',
  'search'
]);

const ROUTE_CLASS_STEMS = Object.freeze({
  creatures:'creature',resources:'resource',chambers:'chamber',mechanics:'mechanic',guides:'guide',tools:'tool',farms:'farm',strategies:'strategy',search:'search'
});

const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const databasePattern = DATABASE_KINDS.map(escapeRegExp).join('|');
const nativePattern = NATIVE_I18N_KINDS.map(escapeRegExp).join('|');
const DATABASE_ROUTE_RE = new RegExp(`^#\\/(?:${databasePattern})(?:\\/|$|\\?)`,'i');
const NATIVE_I18N_ROUTE_RE = new RegExp(`^#\\/(?:${nativePattern})(?:\\/|$|\\?)`,'i');
const CREATURE_ROUTE_RE = /^#\/creatures(?:\/|$|\?)/i;

export function currentHash(){
  if(typeof window==='undefined') return '#/';
  return window.location.hash || '#/';
}

export function isDedicatedDatabaseRoute(hash=currentHash()){
  return DATABASE_ROUTE_RE.test(hash || '#/');
}

export function isNativeI18nRoute(hash=currentHash()){
  return NATIVE_I18N_ROUTE_RE.test(hash || '#/');
}

export function isCreatureRoute(hash=currentHash()){
  return CREATURE_ROUTE_RE.test(hash || '#/');
}

export function databaseRouteClass(kind){
  return `${ROUTE_CLASS_STEMS[kind] || kind}-database-route`;
}

export function getDatabaseRoute(hash=currentHash()){
  const value=hash || '#/';
  for(const kind of DATABASE_KINDS){
    const match=value.match(new RegExp(`^#\\/${escapeRegExp(kind)}(?:\\/([^?/#]+))?\\/?(?:\\?|$)`,'i'));
    if(match){
      let id=null;
      if(match[1]){
        try{id=decodeURIComponent(match[1]);}catch{id=match[1];}
      }
      return {active:true,kind,id};
    }
  }
  return {active:false,kind:null,id:null};
}
